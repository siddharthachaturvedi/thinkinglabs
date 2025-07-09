// ===== COSMIC INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeCosmicSystems();
    initializeThemeToggle();
    initializeNavigationSystem();
    initializeScrollAnimations();
    initializeHeroAnimations();
    initializeInteractiveElements();
    initializePerformanceOptimizations();
});

// ===== COSMIC SYSTEMS =====
function initializeCosmicSystems() {
    createQuantumParticles();
    initializeNeuralMesh();
    setupAuroraEffects();
}

function createQuantumParticles() {
    const quantumField = document.querySelector('.quantum-field');
    if (!quantumField) return;
    
    // Add more dynamic particles
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'quantum-particle';
        particle.style.setProperty('--delay', `${Math.random() * 5}s`);
        particle.style.setProperty('--duration', `${8 + Math.random() * 8}s`);
        particle.style.setProperty('--x', `${Math.random() * 100}%`);
        particle.style.setProperty('--y', `${Math.random() * 100}%`);
        quantumField.appendChild(particle);
    }
}

function initializeNeuralMesh() {
    const meshSvg = document.querySelector('.mesh-svg');
    if (!meshSvg) return;
    
    // Create dynamic mesh connections
    const paths = meshSvg.querySelectorAll('.mesh-path');
    paths.forEach((path, index) => {
        path.style.animationDelay = `${index * 0.5}s`;
        path.style.animationDuration = `${8 + index * 2}s`;
    });
}

function setupAuroraEffects() {
    const auroraLayer = document.querySelector('.aurora-layer');
    if (!auroraLayer) return;
    
    // Add mouse interaction to aurora
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        auroraLayer.style.background = `
            radial-gradient(ellipse at ${x}% ${y}%, rgba(139, 38, 53, 0.08) 0%, transparent 70%),
            radial-gradient(ellipse at ${100-x}% ${100-y}%, rgba(74, 93, 35, 0.08) 0%, transparent 70%)
        `;
    });
}

// ===== CELESTIAL THEME TOGGLE =====
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('cosmic-theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Cosmic transition effect
        document.body.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('cosmic-theme', newTheme);
        
        // Add cosmic ripple effect
        createCosmicRipple(themeToggle);
        
        // Reset transition
        setTimeout(() => {
            document.body.style.transition = '';
        }, 800);
    });
}

function createCosmicRipple(element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${rect.left + rect.width/2 - size/2}px;
        top: ${rect.top + rect.height/2 - size/2}px;
        background: radial-gradient(circle, var(--oxblood) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        opacity: 0.6;
        pointer-events: none;
        z-index: 9999;
        animation: cosmicRipple 1s ease-out forwards;
    `;
    
    document.body.appendChild(ripple);
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cosmicRipple {
            to {
                transform: scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        ripple.remove();
        style.remove();
    }, 1000);
}

// ===== NAVIGATION SYSTEM =====
function initializeNavigationSystem() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scroll with cosmic effects
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Add cosmic navigation effect
                createNavigationPortal(link);
                
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
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
}

function createNavigationPortal(element) {
    const portal = document.createElement('div');
    const rect = element.getBoundingClientRect();
    
    portal.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        left: ${rect.left + rect.width/2}px;
        top: ${rect.top + rect.height/2}px;
        background: var(--gradient-cosmic);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: portalExpand 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(portal);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes portalExpand {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(50); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        portal.remove();
        style.remove();
    }, 600);
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add cosmic reveal animation
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                
                // Handle specific element types
                if (element.classList.contains('matrix-card')) {
                    animateMatrixCard(element);
                } else if (element.classList.contains('timeline-moment')) {
                    animateTimelineMoment(element);
                } else if (element.classList.contains('metric-constellation')) {
                    animateMetricConstellation(element);
                }
                
                animationObserver.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(`
        .matrix-card,
        .timeline-moment,
        .metric-constellation,
        .connection-portal,
        .dimension-header,
        .timeline-header,
        .nexus-invitation
    `);
    
    animatableElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(60px)';
        element.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
        animationObserver.observe(element);
    });
}

function animateMatrixCard(card) {
    const icon = card.querySelector('.constellation-icon');
    const title = card.querySelector('.constellation-title');
    const essence = card.querySelector('.constellation-essence');
    const signature = card.querySelector('.constellation-signature');
    
    if (icon) {
        setTimeout(() => {
            icon.style.transform = 'scale(1.1) rotate(10deg)';
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        }, 200);
    }
    
    [title, essence, signature].forEach((element, index) => {
        if (element) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 300 + index * 100);
        }
    });
}

function animateTimelineMoment(moment) {
    const portal = moment.querySelector('.moment-portal');
    const content = moment.querySelector('.moment-content');
    
    if (portal) {
        setTimeout(() => {
            portal.style.transform = 'translateX(-50%) scale(1.2)';
            setTimeout(() => {
                portal.style.transform = 'translateX(-50%) scale(1)';
            }, 300);
        }, 100);
    }
    
    if (content) {
        setTimeout(() => {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 200);
    }
}

function animateMetricConstellation(metric) {
    const value = metric.querySelector('.metric-value');
    const label = metric.querySelector('.metric-label');
    
    if (value && value.dataset.count) {
        animateCounter(value, parseInt(value.dataset.count));
    }
    
    if (label) {
        setTimeout(() => {
            label.style.opacity = '1';
            label.style.transform = 'translateY(0)';
        }, 500);
    }
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

// ===== HERO ANIMATIONS =====
function initializeHeroAnimations() {
    // Animate ASCII hologram
    const asciiHologram = document.querySelector('.ascii-hologram');
    if (asciiHologram) {
        setTimeout(() => {
            asciiHologram.style.opacity = '1';
            asciiHologram.style.transform = 'translateY(0) scale(1)';
        }, 500);
    }
    
    // Animate title letters with stagger
    const letters = document.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        letter.style.animationDelay = `${0.5 + index * 0.05}s`;
    });
    
    // Animate profile constellation
    const profileConstellation = document.querySelector('.profile-constellation');
    if (profileConstellation) {
        setTimeout(() => {
            profileConstellation.style.opacity = '1';
            profileConstellation.style.transform = 'translateY(0)';
        }, 2000);
    }
    
    // Animate scroll indicator
    const quantumScroll = document.querySelector('.quantum-scroll');
    if (quantumScroll) {
        setTimeout(() => {
            quantumScroll.style.opacity = '1';
            quantumScroll.style.transform = 'translateX(-50%) translateY(0)';
        }, 3000);
    }
}

// ===== INTERACTIVE ELEMENTS =====
function initializeInteractiveElements() {
    // Matrix card interactions
    const matrixCards = document.querySelectorAll('.matrix-card');
    matrixCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            createCardAura(card);
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            const nebula = card.querySelector('.card-nebula');
            if (nebula) {
                nebula.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(139, 38, 53, 0.2) 0%, rgba(74, 93, 35, 0.1) 50%, transparent 100%)`;
            }
        });
    });
    
    // Connection portal interactions
    const connectionPortals = document.querySelectorAll('.connection-portal');
    connectionPortals.forEach(portal => {
        portal.addEventListener('mouseenter', () => {
            createPortalEffect(portal);
        });
        
        portal.addEventListener('click', (e) => {
            createClickRipple(e, portal);
        });
    });
    
    // Avatar cosmic interaction
    const avatarContainer = document.querySelector('.avatar-container');
    if (avatarContainer) {
        avatarContainer.addEventListener('mousemove', (e) => {
            const rect = avatarContainer.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            avatarContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        avatarContainer.addEventListener('mouseleave', () => {
            avatarContainer.style.transform = 'translate(0, 0)';
        });
    }
}

function createCardAura(card) {
    const aura = document.createElement('div');
    aura.style.cssText = `
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        background: var(--gradient-cosmic);
        border-radius: 25px;
        opacity: 0;
        filter: blur(20px);
        pointer-events: none;
        z-index: -1;
        transition: opacity 0.3s ease;
    `;
    
    card.style.position = 'relative';
    card.appendChild(aura);
    
    setTimeout(() => {
        aura.style.opacity = '0.3';
    }, 10);
    
    card.addEventListener('mouseleave', () => {
        aura.style.opacity = '0';
        setTimeout(() => {
            if (aura.parentNode) {
                aura.remove();
            }
        }, 300);
    }, { once: true });
}

function createPortalEffect(portal) {
    const effect = document.createElement('div');
    const rect = portal.getBoundingClientRect();
    
    effect.style.cssText = `
        position: fixed;
        width: 100px;
        height: 100px;
        left: ${rect.left + rect.width/2 - 50}px;
        top: ${rect.top + rect.height/2 - 50}px;
        background: radial-gradient(circle, var(--oxblood) 0%, transparent 70%);
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        z-index: 9998;
        animation: portalEffect 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(effect);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes portalEffect {
            0% { transform: scale(0); opacity: 0.6; }
            100% { transform: scale(2); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        effect.remove();
        style.remove();
    }, 600);
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
        background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        pointer-events: none;
        z-index: 10;
        animation: clickRipple 0.6s ease-out forwards;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes clickRipple {
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

// ===== PERFORMANCE OPTIMIZATIONS =====
function initializePerformanceOptimizations() {
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
            .quantum-particle,
            .mesh-path,
            .aurora-layer,
            .hologram-scanlines
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
            // Recalculate positions and sizes
            updateCosmicPositions();
        }, 250);
    });
    
    // Intersection observer for performance
    const performanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            if (entry.isIntersecting) {
                element.classList.add('in-viewport');
            } else {
                element.classList.remove('in-viewport');
            }
        });
    });
    
    // Observe performance-sensitive elements
    const performanceElements = document.querySelectorAll(`
        .quantum-field,
        .neural-mesh,
        .aurora-layer,
        .neural-sphere
    `);
    
    performanceElements.forEach(element => {
        performanceObserver.observe(element);
    });
}

function updateCosmicPositions() {
    // Update particle positions based on new viewport size
    const particles = document.querySelectorAll('.quantum-particle');
    particles.forEach(particle => {
        particle.style.setProperty('--x', `${Math.random() * 100}%`);
        particle.style.setProperty('--y', `${Math.random() * 100}%`);
    });
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initializeAccessibility() {
    // Keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll(`
        .matrix-card,
        .connection-portal,
        .theme-toggle,
        .nav-link
    `);
    
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
        
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--oxblood)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
    
    // Announce theme changes to screen readers
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.style.position = 'absolute';
            announcement.style.left = '-10000px';
            announcement.textContent = `Theme changed to ${currentTheme} mode`;
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                announcement.remove();
            }, 1000);
        });
    }
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initializeAccessibility);

// ===== COSMIC ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Cosmic error detected:', e.error);
    // Graceful degradation - disable animations if errors occur
    document.body.classList.add('safe-mode');
});

// ===== COSMIC UTILITIES =====
function createCosmicElement(type, styles, parent) {
    const element = document.createElement(type);
    Object.assign(element.style, styles);
    if (parent) parent.appendChild(element);
    return element;
}

function getCosmicTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
}

function isReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Export for potential external use
window.CosmicSystem = {
    createCosmicElement,
    getCosmicTheme,
    isReducedMotion,
    createCosmicRipple,
    animateCounter
};