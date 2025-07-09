document.addEventListener('DOMContentLoaded', function () {
    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Disconnect observer for this element to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Add initial animation classes to elements that should animate
    const heroStatement = document.querySelector('.hero-statement');
    const valueProposition = document.querySelector('.value-proposition');
    const impactStories = document.querySelector('.impact-stories');
    
    if (heroStatement) heroStatement.classList.add('animate-on-scroll');

    // Add subtle parallax effect to ASCII art
    const asciiArt = document.querySelector('.ascii-art');
    if (asciiArt) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            asciiArt.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add mysterious typing effect to the main heading
    const mainHeading = document.querySelector('h1');
    if (mainHeading) {
        const originalText = mainHeading.textContent;
        mainHeading.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                mainHeading.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }

    // Add hover effect to profile image for mystery
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', () => {
            profileImage.style.filter = 'grayscale(100%) contrast(120%)';
        });
        
        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.filter = 'none';
        });
    }

    // Add subtle glow effect to contact links
    const contactLinks = document.querySelectorAll('.contact-info a');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.textShadow = '0 0 8px rgba(139, 38, 53, 0.5)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.textShadow = 'none';
        });
    });
});