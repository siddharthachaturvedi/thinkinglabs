// Sophisticated interactions and animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initializeScrollAnimations();
    initializeParallaxEffects();
    initializeTypingEffect();
    initializeHoverEffects();
    initializePerformanceOptimizations();
});

// Enhanced scroll-triggered animations with stagger effects
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add base animation class
                element.classList.add('animate-in');
                
                // Handle staggered animations for grid items
                if (element.classList.contains('philosophy-grid')) {
                    animateGridItems(element.querySelectorAll('.philosophy-card'), 150);
                } else if (element.classList.contains('impact-timeline')) {
                    animateGridItems(element.querySelectorAll('.impact-item'), 200);
                } else if (element.classList.contains('capabilities-showcase')) {
                    animateGridItems(element.querySelectorAll('.capability-item'), 100);
                }
                
                // Disconnect observer for performance
                staggerObserver.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all animatable sections
    const animatableElements = document.querySelectorAll(`
        .philosophy-section,
        .impact-section,
        .vision-section,
        .philosophy-grid,
        .impact-timeline,
        .capabilities-showcase
    `);
    
    animatableElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
        
        staggerObserver.observe(element);
    });
}

// Animate grid items with stagger effect
function animateGridItems(items, delay) {
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * delay);
    });
}

// Subtle parallax effects for enhanced depth
function initializeParallaxEffects() {
    const parallaxElements = [
        { selector: '.ascii-art', speed: 0.3 },
        { selector: '.hero-header::before', speed: 0.2 },
        { selector: '.profile-glow', speed: 0.4 }
    ];
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(({ selector, speed }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Only enable parallax on devices that can handle it smoothly
    if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    }
}

// Sophisticated typing effect for the main title
function initializeTypingEffect() {
    const nameTitle = document.querySelector('.name-title');
    if (!nameTitle) return;
    
    const originalText = nameTitle.textContent;
    const words = originalText.split(' ');
    
    // Only apply typing effect on larger screens
    if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        nameTitle.textContent = '';
        nameTitle.style.opacity = '1';
        
        let wordIndex = 0;
        let charIndex = 0;
        let currentWord = '';
        
        function typeWriter() {
            if (wordIndex < words.length) {
                if (charIndex < words[wordIndex].length) {
                    currentWord += words[wordIndex].charAt(charIndex);
                    nameTitle.textContent = words.slice(0, wordIndex).join(' ') + 
                                          (wordIndex > 0 ? ' ' : '') + currentWord;
                    charIndex++;
                    setTimeout(typeWriter, 80);
                } else {
                    wordIndex++;
                    charIndex = 0;
                    currentWord = '';
                    setTimeout(typeWriter, 200);
                }
            }
        }
        
        // Start typing effect after initial page load
        setTimeout(typeWriter, 1500);
    }
}

// Enhanced hover effects and micro-interactions
function initializeHoverEffects() {
    // Profile image magnetic effect
    const profileContainer = document.querySelector('.profile-image-container');
    if (profileContainer) {
        profileContainer.addEventListener('mousemove', (e) => {
            const rect = profileContainer.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            profileContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        profileContainer.addEventListener('mouseleave', () => {
            profileContainer.style.transform = 'translate(0, 0)';
        });
    }
    
    // Contact links ripple effect
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation keyframes
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Performance optimizations
function initializePerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.6s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate any size-dependent animations
            if (window.innerWidth <= 768) {
                // Disable complex animations on mobile
                document.body.classList.add('mobile-optimized');
            } else {
                document.body.classList.remove('mobile-optimized');
            }
        }, 250);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add CSS class for completed animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .mobile-optimized * {
        animation-duration: 0.3s !important;
        transition-duration: 0.3s !important;
    }
    
    .philosophy-card,
    .impact-item,
    .capability-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);