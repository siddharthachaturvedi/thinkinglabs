document.addEventListener('DOMContentLoaded', function () {
    // Chat functionality
    function startChat() {
        const introContainer = document.getElementById('introduction-container');
        const chatContainer = document.getElementById('chat-container');
        introContainer.classList.add('hidden');
        chatContainer.classList.remove('hidden');
        document.getElementById('send-button').disabled = true;
    }

    async function sendMessage(retryCount = 0) {
        const input = document.getElementById('input-text').value;
        const chatWindow = document.getElementById('chat-window');
        const selectedModel = document.getElementById('model-select').value;

        // Add user's message
        const userDiv = document.createElement('div');
        userDiv.className = 'message user-message';
        userDiv.textContent = input;
        chatWindow.appendChild(userDiv);

        // Clear input and disable Send button
        const sendButton = document.getElementById('send-button');
        document.getElementById('input-text').value = '';
        sendButton.disabled = true;
        sendButton.classList.remove('enabled');
        sendButton.style.cursor = 'not-allowed';

        // Adding thinking animation with model info
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'message thinking-message';
        const modelName = document.getElementById('model-select').options[document.getElementById('model-select').selectedIndex].text;
        thinkingDiv.innerHTML = `<div class="model-info">Using ${modelName}</div><span class="thinking-dot"></span><span class="thinking-dot"></span><span class="thinking-dot"></span>`;
        chatWindow.appendChild(thinkingDiv);

        try {
            // Use relative URL that will work both locally and when deployed
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    content: input,
                    model: selectedModel
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                
                if (response.status === 429 && retryCount < 2) {
                    // Remove thinking animation temporarily
                    chatWindow.removeChild(thinkingDiv);
                    
                    // Add waiting message
                    const waitingDiv = document.createElement('div');
                    waitingDiv.className = 'message system-message';
                    waitingDiv.textContent = 'Rate limit reached. Retrying in 2 seconds...';
                    chatWindow.appendChild(waitingDiv);
                    
                    // Wait and retry
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    chatWindow.removeChild(waitingDiv);
                    return sendMessage(retryCount + 1);
                }
                
                throw new Error(errorData.error || 'An error occurred');
            }

            // Remove thinking animation and add response message
            chatWindow.removeChild(thinkingDiv);
            const result = await response.json();
            const responseDiv = document.createElement('div');
            responseDiv.className = 'message response-message';
            responseDiv.innerHTML = result.message.replace(/\n/g, '<br>');
            chatWindow.appendChild(responseDiv);
        } catch (error) {
            chatWindow.removeChild(thinkingDiv);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'message error-message';
            errorDiv.textContent = `Error: ${error.message}`;
            chatWindow.appendChild(errorDiv);
        }

        // Scroll to bottom
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Event listeners
    const inputText = document.getElementById('input-text');
    if (inputText) {
        inputText.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    const sendButton = document.getElementById('send-button');
    if (sendButton) {
        sendButton.addEventListener('click', function () {
            if (!this.disabled) sendMessage();
        });
    }

    if (inputText) {
        inputText.addEventListener('input', function () {
            const sendButton = document.getElementById('send-button');
            if (sendButton) {
                const isEmpty = this.value.trim() === '';
                sendButton.disabled = isEmpty;
                sendButton.classList.toggle('enabled', !isEmpty);
                sendButton.style.cursor = isEmpty ? 'not-allowed' : 'pointer';
            }
        });
    }

    // Make startChat function globally available
    window.startChat = startChat;
});