require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');
const app = express();

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: process.env.CLAUDE_API_KEY,
});

// Health check endpoint for Azure
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// More conservative rate limiter settings
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 3, // Reduce to 3 requests per minute to stay within Azure's S0 tier limits
    message: { error: 'Too many requests, please try again later.' }
});

// CORS configuration with allowed origins from .env
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Apply rate limiting to chat endpoint
app.use('/api/chat', limiter);

// Add request logging middleware
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(
            JSON.stringify({
                timestamp: new Date().toISOString(),
                method: req.method,
                path: req.path,
                status: res.statusCode,
                duration: `${duration}ms`,
                userAgent: req.get('user-agent')
            })
        );
    });
    next();
});

// Helper function to extract retry time from Azure's error message
const getRetryAfterTime = (errorBody) => {
    try {
        const match = errorBody.match(/retry after (\d+) seconds/);
        return match ? parseInt(match[1]) : 5;
    } catch (e) {
        return 5; // Default retry time
    }
};

// Endpoint to handle model communications
app.post('/api/chat', async (req, res) => {
    const { content, model } = req.body;
    
    try {
        let result;

        if (model === 'claude') {
            // Use Claude API with correct system prompt handling
            const msg = await anthropic.messages.create({
                model: process.env.CLAUDE_MODEL,
                max_tokens: 1024,
                system: process.env.SYSTEM_PROMPT,  // System prompt as top-level parameter
                messages: [
                    { role: "user", content }
                ],
            });
            result = { message: msg.content[0].text };
        } else {
            // Use Azure OpenAI API
            const apiKey = process.env.AZURE_OPENAI_API_KEY;
            const baseEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
            const deployment = process.env.GPT4O_DEPLOYMENT;
            
            const response = await fetch(
                `${baseEndpoint}/openai/deployments/${deployment}/chat/completions?api-version=2024-08-01-preview`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': apiKey
                    },
                    body: JSON.stringify({
                        messages: [
                            { role: "system", content: process.env.SYSTEM_PROMPT },
                            { role: "user", content }
                        ],
                        temperature: 0.7,
                        max_tokens: 800
                    })
                }
            );

            if (!response.ok) {
                const errorBody = await response.text();
                console.error('Azure OpenAI Error:', {
                    status: response.status,
                    statusText: response.statusText,
                    body: errorBody
                });
                throw new Error(`Azure OpenAI API error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            result = { message: data.choices[0].message.content };
        }

        res.json(result);
    } catch (error) {
        console.error('Error details:', error);
        
        const statusCode = error.message.includes('429') ? 429 : 500;
        const errorMessage = statusCode === 429 
            ? 'Rate limit reached. Please wait a moment and try again.'
            : 'An error occurred while processing your request. Please try again later.';
            
        res.status(statusCode).json({ error: errorMessage });
    }
});

// Serve index.html for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;

// Add production environment checks
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Open http://localhost:${PORT} in your browser to access the chat interface`);
    }
});