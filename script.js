// Advanced Professional Portfolio JavaScript

// Slide content data
const slideContent = [
    {
        title: 'I\'m an <span class="highlight">IT Student</span>',
        description: 'I\'m Mark Vincent P. Plaza, an Information Technology student at Polytechnic University of the Philippines - STC. Passionate about programming, web development, and creating innovative solutions through technology.'
    },
    {
        title: 'I\'m a <span class="highlight">Programmer</span>',
        description: 'Skilled in Java, Python, HTML/CSS, and JavaScript. I love solving complex problems through code and building applications that make a difference. Always eager to learn new technologies and frameworks.'
    },
    {
        title: 'I\'m a <span class="highlight">Future Developer</span>',
        description: 'Aspiring to become a full-stack developer and contribute to the tech industry. Currently working on personal projects and continuously improving my skills through hands-on experience and academic learning.'
    }
];

let currentSlide = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeThemeToggle();
    initializeNavigation();
    initializeAnimations();
    initializeScrollEffects();
    initializeInteractiveElements();
    initializeTypingAnimation();
    initializeParallaxEffects();
    initializeSlideSystem();
    
    console.log('%c🚀 Advanced Portfolio Loaded!', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
    console.log('%cDeveloped by Mark Vincent P. Plaza', 'color: #ff6b6b; font-size: 14px;');
});

// Particle system removed for a more professional static background

// Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add transition effect
        body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Navigation
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for skill bars
                if (entry.target.classList.contains('skill-progress')) {
                    animateSkillBar(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .skill-progress');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function animateSkillBar(skillBar) {
    const width = skillBar.getAttribute('data-width');
    skillBar.style.width = '0%';
    
    setTimeout(() => {
        skillBar.style.width = width;
    }, 500);
}

// Scroll Effects
function initializeScrollEffects() {
    // Removed hero parallax translate effect for minimal motion
    
    // Scroll to top button
    createScrollToTopButton();
}

function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3);
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 12px 40px rgba(0, 212, 255, 0.5)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 8px 32px rgba(0, 212, 255, 0.3)';
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    // Portfolio item hover effects
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Social icon animations
    const socialIcons = document.querySelectorAll('.social-icon, .social-link');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Button animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Typing Animation
function initializeTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Parallax Effects
function initializeParallaxEffects() {
    // Removed mouse parallax tied to particles
}

// Slide System
function initializeSlideSystem() {
    // Initialize with first slide
    updateSlideContent();
    updatePageIndicator();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            previousSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
}

// Pagination Functions
function previousSlide() {
    currentSlide = currentSlide > 0 ? currentSlide - 1 : slideContent.length - 1;
    updateSlideContent();
    updatePageIndicator();
    animateSlideTransition();
}

function nextSlide() {
    currentSlide = currentSlide < slideContent.length - 1 ? currentSlide + 1 : 0;
    updateSlideContent();
    updatePageIndicator();
    animateSlideTransition();
}

function updateSlideContent() {
    const titleElement = document.getElementById('slide-title');
    const descriptionElement = document.getElementById('slide-description');
    
    if (titleElement && descriptionElement) {
        titleElement.innerHTML = slideContent[currentSlide].title;
        descriptionElement.textContent = slideContent[currentSlide].description;
    }
}

function updatePageIndicator() {
    const indicator = document.querySelector('.page-indicator');
    if (indicator) {
        indicator.textContent = `${currentSlide + 1}/${slideContent.length}`;
    }
}

function animateSlideTransition() {
    const heroContent = document.querySelector('.hero-content');
    const titleElement = document.getElementById('slide-title');
    const descriptionElement = document.getElementById('slide-description');
    
    // Fade out
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateX(50px)';
    
    setTimeout(() => {
        // Update content
        if (titleElement && descriptionElement) {
            titleElement.innerHTML = slideContent[currentSlide].title;
            descriptionElement.textContent = slideContent[currentSlide].description;
        }
        
        // Fade in with new content
        heroContent.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateX(0)';
        
        // Reset transition after animation
        setTimeout(() => {
            heroContent.style.transition = '';
        }, 500);
    }, 250);
}

// Performance Optimization
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    
    // Update navbar
    const navbar = document.getElementById('navbar');
    if (scrolled > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update scroll to top button
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollBtn) {
        if (scrolled > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Loading Animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Particle initialization removed
});

// Mobile Menu Enhancement
function initializeMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

// Initialize mobile menu
initializeMobileMenu();

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
});

// Console Welcome Message
console.log('%c🎨 Advanced Portfolio Features:', 'color: #4ecdc4; font-size: 16px; font-weight: bold;');
console.log('%c• Particle Background System', 'color: #00d4ff; font-size: 14px;');
console.log('%c• Theme Toggle (Dark/Light)', 'color: #ff6b6b; font-size: 14px;');
console.log('%c• Advanced Animations', 'color: #4ecdc4; font-size: 14px;');
console.log('%c• Parallax Effects', 'color: #00d4ff; font-size: 14px;');
console.log('%c• Glassmorphism Design', 'color: #ff6b6b; font-size: 14px;');
console.log('%c• Interactive Elements', 'color: #4ecdc4; font-size: 14px;');
console.log('%c• Performance Optimized', 'color: #00d4ff; font-size: 14px;');