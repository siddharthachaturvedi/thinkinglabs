// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeScrollEffects();
    initializeInteractions();
    initializePerformance();
    initializeAccessibility();
});

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                
                // Handle specific animations
                if (element.classList.contains('pillar-card')) {
                    animatePillarCard(element);
                } else if (element.classList.contains('timeline-item')) {
                    animateTimelineItem(element);
                } else if (element.classList.contains('showcase-item')) {
                    animateShowcaseItem(element);
                }
                
                animationObserver.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(`
        .pillar-card,
        .timeline-item,
        .showcase-item,
        .contact-card,
        .section-header
    `);
    
    animatableElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        animationObserver.observe(element);
    });
}

function animatePillarCard(card) {
    const icon = card.querySelector('.card-icon');
    const title = card.querySelector('.card-title');
    const description = card.querySelector('.card-description');
    const metrics = card.querySelector('.card-metrics');
    
    const elements = [icon, title, description, metrics];
    
    elements.forEach((element, index) => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}

function animateTimelineItem(item) {
    const marker = item.querySelector('.timeline-marker');
    const content = item.querySelector('.timeline-content');
    
    if (marker) {
        setTimeout(() => {
            marker.style.transform = 'translateX(-50%) scale(1.1)';
            setTimeout(() => {
                marker.style.transform = 'translateX(-50%) scale(1)';
            }, 200);
        }, 100);
    }
    
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        content.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 200);
    }
}

function animateShowcaseItem(item) {
    const visual = item.querySelector('.showcase-visual');
    const content = item.querySelector('.showcase-content');
    
    if (visual) {
        setTimeout(() => {
            visual.style.transform = 'scale(1.05)';
            setTimeout(() => {
                visual.style.transform = 'scale(1)';
            }, 300);
        }, 100);
    }
    
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        content.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 200);
    }
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Active section highlighting
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const navLink = document.querySelector(`a[href="#${entry.target.id}"]`);
            if (navLink) {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => sectionObserver.observe(section));
    
    // Navigation background on scroll
    const nav = document.querySelector('.main-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(0, 0, 0, 0.95)';
                nav.style.borderBottomColor = 'rgba(0, 255, 136, 0.2)';
            } else {
                nav.style.background = 'rgba(0, 0, 0, 0.8)';
                nav.style.borderBottomColor = 'rgba(0, 255, 136, 0.1)';
            }
        });
    }
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Parallax effect for background elements
    const particles = document.querySelectorAll('.particle');
    const gridLines = document.querySelectorAll('.grid-line');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        
        particles.forEach((particle, index) => {
            const speed = 0.5 + (index * 0.1);
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        gridLines.forEach((line, index) => {
            const speed = 0.2 + (index * 0.05);
            line.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 16));
}

// ===== INTERACTIONS =====
function initializeInteractions() {
    // Card hover effects
    const cards = document.querySelectorAll('.pillar-card, .contact-card, .showcase-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            createHoverEffect(card);
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.background = `
                radial-gradient(circle at ${x}% ${y}%, rgba(0, 255, 136, 0.1) 0%, transparent 50%),
                rgba(255, 255, 255, 0.03)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = 'rgba(255, 255, 255, 0.03)';
        });
    });
    
    // Button click effects
    const buttons = document.querySelectorAll('.btn, .contact-card');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createClickRipple(e, button);
        });
    });
    
    // Profile image interaction
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mousemove', (e) => {
            const rect = profileImage.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            profileImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        });
        
        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'translate(0, 0) scale(1)';
        });
    }
}

function createHoverEffect(element) {
    const effect = document.createElement('div');
    
    effect.style.cssText = `
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(135deg, #00ff88, #00cc66);
        border-radius: 22px;
        opacity: 0;
        filter: blur(10px);
        pointer-events: none;
        z-index: -1;
        transition: opacity 0.3s ease;
    `;
    
    element.style.position = 'relative';
    element.appendChild(effect);
    
    setTimeout(() => {
        effect.style.opacity = '0.2';
    }, 10);
    
    element.addEventListener('mouseleave', () => {
        effect.style.opacity = '0';
        setTimeout(() => {
            if (effect.parentNode) {
                effect.remove();
            }
        }, 300);
    }, { once: true });
}

function createClickRipple(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(0, 255, 136, 0.4) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        pointer-events: none;
        z-index: 10;
        animation: rippleEffect 0.6s ease-out forwards;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        ripple.remove();
        style.remove();
    }, 600);
}

// ===== PERFORMANCE =====
function initializePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img');
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
    
    // Optimize animations based on device capabilities
    const isHighPerformance = window.devicePixelRatio <= 2 && 
                             window.innerWidth >= 1024 && 
                             !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!isHighPerformance) {
        document.body.classList.add('reduced-animations');
        
        // Disable complex animations on lower-end devices
        const complexAnimations = document.querySelectorAll(`
            .particle,
            .grid-line,
            .connection-path,
            .icon-pulse
        `);
        
        complexAnimations.forEach(element => {
            element.style.animation = 'none';
        });
    }
    
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateAnimationPositions();
        }, 250);
    });
}

function updateAnimationPositions() {
    // Update particle positions based on new viewport size
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        particle.style.setProperty('--x', `${x}%`);
        particle.style.setProperty('--y', `${y}%`);
    });
}

// ===== ACCESSIBILITY =====
function initializeAccessibility() {
    // Keyboard navigation
    const interactiveElements = document.querySelectorAll(`
        .nav-link,
        .btn,
        .contact-card,
        .pillar-card
    `);
    
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
        
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #00ff88';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    // Graceful degradation - disable animations if errors occur
    document.body.classList.add('safe-mode');
});

// ===== UTILITIES =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export for potential external use
window.SIDCSystem = {
    createHoverEffect,
    createClickRipple,
    debounce,
    throttle
};