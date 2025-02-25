const achievements = {
    "AI for Discovery": {
        role: "Innovator in AI Solutions",
        details: "Pioneering AI that accelerates human discovery across domains",
        highlights: [
            "Launched Azure OpenAI Service for U.S. Federal Clouds, enabling secure AI adoption",
            "Led Premonition, an AI-powered biothreat detection system, honored with Fast Company’s World Changing Idea Award",
            "Orchestrated $500M+ in pharmaceutical deals via AI innovations in life sciences"
        ]
    },
    "Collaborative Leadership": {
        role: "Cross-Functional Strategist",
        details: "Building bridges between research, engineering, and real-world impact",
        highlights: [
            "Directed global teams to bring Azure OpenAI and Premonition to market",
            "Teach Organizational Behavior at UC Irvine, fostering collaboration and innovation",
            "Mentored Techstars London startups, accelerating their growth"
        ]
    },
    "Entrepreneurial Impact": {
        role: "Startup Visionary",
        details: "Driving 0-1 innovation with a focus on social good",
        highlights: [
            "Co-founded Tathaastu, an AI healthcare startup, recognized by MIT’s Global Entrepreneurship Bootcamp",
            "Scaled Appslure globally, achieving double-digit revenue growth",
            "Advised DeepTech ventures as LP at RPV and Loyal VC"
        ]
    },
    "Ethical AI": {
        role: "Responsible AI Advocate",
        details: "Ensuring AI is trustworthy and human-centric",
        highlights: [
            "Led Microsoft’s Responsible AI framework implementation",
            "Developed ethical guidelines for federal AI deployments",
            "Balanced innovation with safety in high-stakes environments"
        ]
    },
    "Lifelong Learning": {
        role: "Curious Technologist",
        details: "Continuously evolving through education and exploration",
        highlights: [
            "Earned an MBA from INSEAD, focusing on strategy and leadership",
            "Returned to BITS Pilani for Computer Science (CGPA 9.49), 18 years after my first degree",
            "Published AI research impacting biology, featured in Nature"
        ]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const skillsContainer = document.querySelector('.skills-showcase');
    const skillsList = skillsContainer.querySelector('.skills-list');
    
    // Create and display skills
    Object.keys(achievements).forEach((skill, index) => {
        const skillSpan = document.createElement('span');
        skillSpan.className = 'skill-item';
        skillSpan.textContent = skill;
        
        // Show first skill by default with a slight delay for animation
        if (index === 0) {
            setTimeout(() => {
                skillSpan.classList.add('selected');
                updateSkillDetails(achievements[skill], true);
            }, 100);
        }
        skillsList.appendChild(skillSpan);

        // Handle interactions
        const handleSkillSelect = () => {
            document.querySelectorAll('.skill-item').forEach(s => s.classList.remove('selected'));
            skillSpan.classList.add('selected');
            updateSkillDetails(achievements[skill]);
        };

        skillSpan.addEventListener('mouseenter', handleSkillSelect);
        skillSpan.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleSkillSelect();
        });
    });
});

function updateSkillDetails(achievement, isInitial = false) {
    const skillDetails = document.querySelector('.skill-details');
    
    // Add fade out effect
    if (!isInitial) {
        skillDetails.style.opacity = '0';
    }
    
    setTimeout(() => {
        skillDetails.innerHTML = `
            <h3>${achievement.role}</h3>
            <p>${achievement.details}</p>
            <ul>
                ${achievement.highlights.map(highlight => `
                    <li>${highlight}</li>
                `).join('')}
            </ul>
        `;
        // Fade in
        skillDetails.style.opacity = '1';
    }, isInitial ? 0 : 300);
}