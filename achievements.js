const capabilities = {
    "Convergent Intelligence": {
        role: "Architect of AI-Human Synergy",
        details: "Orchestrating the intersection where artificial intelligence amplifies human discovery",
        highlights: [
            "Designing systems that enhance rather than replace human cognitive capabilities",
            "Creating frameworks for ethical AI deployment in critical environments",
            "Bridging theoretical research with practical, world-changing applications"
        ]
    },
    "Emergent Systems": {
        role: "Builder of Adaptive Solutions",
        details: "Crafting resilient systems that evolve with changing global challenges",
        highlights: [
            "Developing early warning systems for complex global threats",
            "Creating scalable architectures for enterprise-grade AI deployment",
            "Establishing cross-functional collaboration frameworks for innovation"
        ]
    },
    "Purposeful Innovation": {
        role: "Catalyst for Social Impact",
        details: "Channeling technological advancement toward humanity's greatest needs",
        highlights: [
            "Focusing innovation on climate adaptation, health security, and knowledge preservation",
            "Building bridges between academic research and commercial application",
            "Demonstrating technology's potential for equitable global access"
        ]
    },
    "Ethical Foundations": {
        role: "Guardian of Responsible Progress",
        details: "Ensuring that advancement serves humanity's highest aspirations",
        highlights: [
            "Implementing responsible AI frameworks in high-stakes environments",
            "Balancing innovation velocity with ethical considerations",
            "Creating trust through transparent and accountable AI systems"
        ]
    },
    "Continuous Evolution": {
        role: "Student of Infinite Possibility",
        details: "Embracing perpetual learning as the foundation of meaningful progress",
        highlights: [
            "Pursuing knowledge across disciplines to inform holistic solutions",
            "Adapting methodologies based on emerging challenges and opportunities",
            "Contributing to the global knowledge base through research and application"
        ]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure DOM is fully loaded
    setTimeout(() => {
        initializeSkillsShowcase();
    }, 100);
});

function initializeSkillsShowcase() {
    const skillsContainer = document.querySelector('.skills-showcase');
    
    // Check if skills container exists
    if (!skillsContainer) {
        console.error('Skills showcase container not found');
        return;
    }
    
    const skillsList = skillsContainer.querySelector('.skills-list');
    
    if (!skillsList) {
        console.error('Skills list container not found');
        return;
    }
    
    // Create and display capabilities
    Object.keys(capabilities).forEach((capability, index) => {
        const capabilitySpan = document.createElement('span');
        capabilitySpan.className = 'skill-item';
        capabilitySpan.textContent = capability;
        
        // Show first capability by default with a slight delay for animation
        if (index === 0) {
            setTimeout(() => {
                capabilitySpan.classList.add('selected');
                updateCapabilityDetails(capabilities[capability], true);
            }, 200);
        }
        skillsList.appendChild(capabilitySpan);

        // Handle interactions
        const handleCapabilitySelect = () => {
            document.querySelectorAll('.skill-item').forEach(s => s.classList.remove('selected'));
            capabilitySpan.classList.add('selected');
            updateCapabilityDetails(capabilities[capability]);
        };

        capabilitySpan.addEventListener('mouseenter', handleCapabilitySelect);
        capabilitySpan.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleCapabilitySelect();
        });
    });
}

function updateCapabilityDetails(capability, isInitial = false) {
    const skillDetails = document.querySelector('.skill-details');
    
    if (!skillDetails) {
        console.error('Skill details container not found');
        return;
    }
    
    // Add fade out effect
    if (!isInitial) {
        skillDetails.style.opacity = '0';
    }
    
    setTimeout(() => {
        skillDetails.innerHTML = `
            <h3>${capability.role}</h3>
            <p>${capability.details}</p>
            <ul>
                ${capability.highlights.map(highlight => `
                    <li>${highlight}</li>
                `).join('')}
            </ul>
        `;
        // Fade in
        skillDetails.style.opacity = '1';
    }, isInitial ? 0 : 200);
}