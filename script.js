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
    initializeThemeToggle();
    initializeNavigation();
    initializeAnimations();
    initializeScrollEffects();
    initializeSlideSystem();
});

function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    const preferredTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark';
    const initialTheme = savedTheme || preferredTheme;

    body.setAttribute('data-theme', initialTheme);
    updateThemeIcon(initialTheme);

    if (!themeToggle) {
        return;
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (!icon) {
        return;
    }
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    const getNavOffset = () => {
        const height = navbar ? navbar.offsetHeight : 80;
        return height + 16;
    };
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const scrollToTarget = () => {
                    const targetY = targetSection.getBoundingClientRect().top + window.pageYOffset - getNavOffset();
                    window.scrollTo({
                        top: targetY,
                        behavior: 'smooth'
                    });
                };

                const isMenuOpen = navbarCollapse && navbarCollapse.classList.contains('show');
                if (isMenuOpen && navbarToggler) {
                    navbarToggler.click();
                    setTimeout(scrollToTarget, 250);
                } else {
                    scrollToTarget();
                }
                
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - getNavOffset() - 40)) {
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

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.classList.contains('skill-progress')) {
                    animateSkillBar(entry.target);
                }
            }
        });
    }, observerOptions);
    
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

function initializeScrollEffects() {
    createScrollToTopButton();
}

function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.type = 'button';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    
    document.body.appendChild(scrollBtn);
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initializeSlideSystem() {
    updateSlideContent();
    updatePageIndicator();
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            previousSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
}

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
    
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateX(50px)';
    
    setTimeout(() => {
        if (titleElement && descriptionElement) {
            titleElement.innerHTML = slideContent[currentSlide].title;
            descriptionElement.textContent = slideContent[currentSlide].description;
        }
        
        heroContent.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateX(0)';
        
        setTimeout(() => {
            heroContent.style.transition = '';
        }, 500);
    }, 250);
}

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

const optimizedScrollHandler = debounce(function() {
    const scrolled = window.pageYOffset;
    
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.classList.toggle('scrolled', scrolled > 100);
    }

    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollBtn) {
        scrollBtn.classList.toggle('is-visible', scrolled > 500);
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
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
});

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

initializeMobileMenu();

window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
});