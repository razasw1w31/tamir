// DOM Elements
const accessibilityBtn = document.getElementById('accessibility-btn');
const accessibilityMenu = document.getElementById('accessibility-menu');
const registrationForm = document.getElementById('registrationForm');
const webinarDateInput = document.getElementById('webinar-date');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// ===== SCROLL ANIMATIONS =====

// Intersection Observer for scroll animations
const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const delay = element.dataset.delay || 0;
            
            setTimeout(() => {
                element.classList.add('animate');
            }, parseInt(delay));
            
            // Stop observing once animated
            scrollAnimationObserver.unobserve(element);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Initialize scroll animations
function initializeScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animation');
    scrollElements.forEach(element => {
        scrollAnimationObserver.observe(element);
    });
}

// Performance-optimized scroll animation trigger
function handleScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animation:not(.animate)');
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    scrollElements.forEach(element => {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const elementBottom = elementTop + elementHeight;
        
        // Trigger animation when element is 80% visible
        const triggerPoint = elementTop - windowHeight * 0.8;
        
        if (scrollTop > triggerPoint) {
            const delay = element.dataset.delay || 0;
            
            setTimeout(() => {
                element.classList.add('animate');
            }, parseInt(delay));
        }
    });
}

// Stagger animation for form elements
function animateFormElements() {
    const formElements = document.querySelectorAll('.form-grid .input-wrapper');
    formElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 100}ms`;
    });
}

// Enhanced scroll listener with animation performance
let scrollAnimationTicking = false;
function requestScrollAnimationTick() {
    if (!scrollAnimationTicking) {
        requestAnimationFrame(handleScrollAnimations);
        scrollAnimationTicking = true;
    }
}

// Reset scroll animation ticker
function resetScrollAnimationTick() {
    scrollAnimationTicking = false;
}

// Navbar Functionality
let lastScrollY = window.scrollY;

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Add animation delay to nav links
    if (navMenu.classList.contains('active')) {
        navLinks.forEach((link, index) => {
            link.style.animation = `slideInRight 0.3s ease ${index * 0.1}s both`;
        });
    }
});

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Enhanced Navbar Scroll Effects with Animation
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add scrolled class for styling
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    
    lastScrollY = currentScrollY;
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
    
    // Trigger scroll animations (performance optimized)
    requestScrollAnimationTick();
});

// Scroll animation frame reset
window.addEventListener('scroll', resetScrollAnimationTick, { passive: true });

// Update active navigation link
function updateActiveNavLink() {
    const sections = ['hero', 'details', 'register', 'about'];
    let current = '';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Accessibility Widget Toggle
accessibilityBtn.addEventListener('click', () => {
    accessibilityMenu.classList.toggle('show');
    
    // Add animation to accessibility buttons
    if (accessibilityMenu.classList.contains('show')) {
        const buttons = accessibilityMenu.querySelectorAll('button');
        buttons.forEach((btn, index) => {
            btn.style.animation = `slideInDown 0.3s ease ${index * 0.1}s both`;
        });
    }
});

// Close accessibility menu when clicking outside
document.addEventListener('click', (e) => {
    if (!accessibilityBtn.contains(e.target) && !accessibilityMenu.contains(e.target)) {
        accessibilityMenu.classList.remove('show');
    }
});

// Initialize Accessibility Button Event Listeners
function initializeAccessibilityButtons() {
    // Font size controls
    const fontSmallerBtn = document.getElementById('font-smaller');
    const fontLargerBtn = document.getElementById('font-larger');
    const fontResetBtn = document.getElementById('font-reset');
    const fontLevelDisplay = document.getElementById('font-level');
    
    // Color and contrast controls
    const highContrastBtn = document.getElementById('high-contrast');
    const darkModeBtn = document.getElementById('dark-mode');
    const invertColorsBtn = document.getElementById('invert-colors');
    
    // Navigation and focus controls
    const focusOutlineBtn = document.getElementById('focus-outline');
    const pauseAnimationsBtn = document.getElementById('pause-animations');
    const keyboardNavigationBtn = document.getElementById('keyboard-navigation');
    
    // Reset and close buttons
    const resetAllBtn = document.getElementById('reset-all');
    const accessibilityCloseBtn = document.getElementById('accessibility-close');
    const accessibilityStatus = document.getElementById('accessibility-status');
    
    // Font size functionality
    if (fontSmallerBtn) {
        fontSmallerBtn.addEventListener('click', () => {
            decreaseFontSize();
            updateFontLevel();
            updateAccessibilityStatus();
        });
    }
    
    if (fontLargerBtn) {
        fontLargerBtn.addEventListener('click', () => {
            increaseFontSize();
            updateFontLevel();
            updateAccessibilityStatus();
        });
    }
    
    if (fontResetBtn) {
        fontResetBtn.addEventListener('click', () => {
            resetFontSize();
            updateFontLevel();
            updateAccessibilityStatus();
        });
    }
    
    // Color and contrast functionality
    if (highContrastBtn) {
        highContrastBtn.addEventListener('click', () => {
            toggleHighContrast();
            updateToggleState(highContrastBtn);
            updateAccessibilityStatus();
        });
    }
    
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            toggleDarkMode();
            updateToggleState(darkModeBtn);
            updateAccessibilityStatus();
        });
    }
    
    if (invertColorsBtn) {
        invertColorsBtn.addEventListener('click', () => {
            toggleInvertColors();
            updateToggleState(invertColorsBtn);
            updateAccessibilityStatus();
        });
    }
    
    // Navigation and focus functionality
    if (focusOutlineBtn) {
        focusOutlineBtn.addEventListener('click', () => {
            toggleFocusOutline();
            updateToggleState(focusOutlineBtn);
            updateAccessibilityStatus();
        });
    }
    
    if (pauseAnimationsBtn) {
        pauseAnimationsBtn.addEventListener('click', () => {
            togglePauseAnimations();
            updateToggleState(pauseAnimationsBtn);
            updateAccessibilityStatus();
        });
    }
    
    if (keyboardNavigationBtn) {
        keyboardNavigationBtn.addEventListener('click', () => {
            toggleKeyboardNavigation();
            updateToggleState(keyboardNavigationBtn);
            updateAccessibilityStatus();
        });
    }
    
    // Reset functionality
    if (resetAllBtn) {
        resetAllBtn.addEventListener('click', () => {
            resetAccessibility();
            updateAllStates();
        });
    }
    
    // Close button functionality
    if (accessibilityCloseBtn) {
        accessibilityCloseBtn.addEventListener('click', () => {
            accessibilityMenu.classList.remove('show');
        });
    }
    
    // Helper functions
    function updateFontLevel() {
        if (fontLevelDisplay) {
            let level = 'גודל רגיל';
            if (document.body.classList.contains('large-font')) {
                level = 'גודל גדול';
            } else if (document.body.classList.contains('extra-large-font')) {
                level = 'גודל גדול מאוד';
            }
            fontLevelDisplay.textContent = level;
        }
    }
    
    function updateToggleState(button) {
        const toggleIndicator = button.querySelector('.toggle-indicator');
        if (toggleIndicator) {
            const isActive = button.classList.contains('active');
            toggleIndicator.textContent = isActive ? 'פעיל' : 'כבוי';
        }
    }
    
    function updateAccessibilityStatus() {
        if (accessibilityStatus) {
            const activeFeatures = [];
            if (document.body.classList.contains('large-font')) activeFeatures.push('טקסט גדול');
            if (document.body.classList.contains('extra-large-font')) activeFeatures.push('טקסט גדול מאוד');
            if (document.body.classList.contains('high-contrast')) activeFeatures.push('ניגודיות גבוהה');
            if (document.body.classList.contains('dark-mode')) activeFeatures.push('מצב לילה');
            if (document.body.classList.contains('invert-colors')) activeFeatures.push('היפוך צבעים');
            if (document.body.classList.contains('enhanced-focus')) activeFeatures.push('מסגרת פוקוס');
            if (document.body.classList.contains('no-animations')) activeFeatures.push('ללא אנימציות');
            
            const statusText = activeFeatures.length > 0 ? 
                `התאמות נוכחיות: ${activeFeatures.join(', ')}` : 
                'התאמות נוכחיות: ללא';
            
            accessibilityStatus.querySelector('.status-text').textContent = statusText;
        }
    }
    
    function updateAllStates() {
        updateFontLevel();
        // Update all toggle states
        [highContrastBtn, darkModeBtn, invertColorsBtn, focusOutlineBtn, pauseAnimationsBtn, keyboardNavigationBtn].forEach(btn => {
            if (btn) {
                btn.classList.remove('active');
                updateToggleState(btn);
            }
        });
        updateAccessibilityStatus();
    }
    
    // Initialize states on load
    updateFontLevel();
    updateAccessibilityStatus();
}

// Accessibility Functions
function increaseFontSize() {
    document.body.classList.remove('large-font', 'extra-large-font');
    if (document.body.classList.contains('large-font')) {
        document.body.classList.remove('large-font');
        document.body.classList.add('extra-large-font');
    } else {
        document.body.classList.add('large-font');
    }
}

function decreaseFontSize() {
    if (document.body.classList.contains('extra-large-font')) {
        document.body.classList.remove('extra-large-font');
        document.body.classList.add('large-font');
    } else if (document.body.classList.contains('large-font')) {
        document.body.classList.remove('large-font');
    }
}

function resetFontSize() {
    document.body.classList.remove('large-font', 'extra-large-font');
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    const btn = document.getElementById('high-contrast');
    if (btn) {
        btn.classList.toggle('active');
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('dark-mode');
    if (btn) {
        btn.classList.toggle('active');
    }
}

function toggleInvertColors() {
    document.body.classList.toggle('invert-colors');
    const btn = document.getElementById('invert-colors');
    if (btn) {
        btn.classList.toggle('active');
    }
}

function toggleFocusOutline() {
    document.body.classList.toggle('enhanced-focus');
    const btn = document.getElementById('focus-outline');
    if (btn) {
        btn.classList.toggle('active');
    }
}

function togglePauseAnimations() {
    document.body.classList.toggle('no-animations');
    const btn = document.getElementById('pause-animations');
    if (btn) {
        btn.classList.toggle('active');
    }
}

function toggleKeyboardNavigation() {
    // This is always enabled by default, so just update the visual state
    const btn = document.getElementById('keyboard-navigation');
    if (btn) {
        // Always keep this as active since keyboard navigation should always be available
        btn.classList.add('active');
    }
}

function resetAccessibility() {
    // Remove all accessibility classes
    document.body.classList.remove(
        'large-font', 
        'extra-large-font', 
        'high-contrast', 
        'dark-mode', 
        'invert-colors', 
        'enhanced-focus', 
        'no-animations'
    );
    
    // Reset font size
    document.body.style.fontSize = '';
    
    // Show confirmation message
    showToastMessage('הגדרות הנגישות אופסו בהצלחה');
}

// Date Picker Functionality
webinarDateInput.addEventListener('change', (e) => {
    const selectedDate = new Date(e.target.value);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    // Hebrew day names mapping
    const hebrewDays = {
        'Sunday': 'יום א\'',
        'Monday': 'יום ב\'',
        'Tuesday': 'יום ג\'',
        'Wednesday': 'יום ד\'',
        'Thursday': 'יום ה\'',
        'Friday': 'יום ו\'',
        'Saturday': 'שבת'
    };
    
    const englishDay = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    const hebrewDay = hebrewDays[englishDay];
    
    const timeDisplay = document.querySelector('.time-display');
    timeDisplay.textContent = `${hebrewDay} בשעה 19:00`;
});

// Form Validation and Submission
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(registrationForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const whatsapp = formData.get('whatsapp').trim();
    
    // Validation
    if (!validateForm(name, email, whatsapp)) {
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> נרשם...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showSuccessMessage();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        registrationForm.reset();
    }, 2000);
});

function validateForm(name, email, whatsapp) {
    const errors = [];
    
    if (name.length < 2) {
        errors.push('השם חייב להכיל לפחות 2 תווים');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('כתובת אימייל לא תקינה');
    }
    
    const phoneRegex = /^[0-9\-\+\s\(\)]{10,}$/;
    if (!phoneRegex.test(whatsapp)) {
        errors.push('מספר טלפון לא תקין');
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors.join('\n'));
        return false;
    }
    
    return true;
}

function showSuccessMessage() {
    const message = createMessage('ההרשמה בוצעה בהצלחה! נשלח אליך פרטי הזום בקרוב.', 'success');
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 5000);
}

function showErrorMessage(text) {
    const message = createMessage(text, 'error');
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 5000);
}

function createMessage(text, type) {
    const message = document.createElement('div');
    message.className = `message message-${type}`;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        max-width: 400px;
        font-weight: 600;
        white-space: pre-line;
        animation: slideIn 0.3s ease;
    `;
    message.textContent = text;
    return message;
}

// Smooth Scrolling for Anchor Links
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

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.details-card, .contact-form, .about-content, .promise-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(-30px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideInDown {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .message {
        animation: slideIn 0.3s ease;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    .magnetic {
        transition: transform 0.3s ease;
    }
    
    .parallax {
        transform: translateZ(0);
        will-change: transform;
    }
`;
document.head.appendChild(style);

// Keyboard Navigation for Accessibility
document.addEventListener('keydown', (e) => {
    // ESC key closes accessibility menu
    if (e.key === 'Escape' && accessibilityMenu.classList.contains('show')) {
        accessibilityMenu.classList.remove('show');
        accessibilityBtn.focus();
    }
    
    // Enter key on accessibility button
    if (e.key === 'Enter' && document.activeElement === accessibilityBtn) {
        accessibilityMenu.classList.toggle('show');
    }
});

// Add focus management for accessibility menu
accessibilityMenu.addEventListener('keydown', (e) => {
    const menuButtons = accessibilityMenu.querySelectorAll('button');
    const currentIndex = Array.from(menuButtons).indexOf(document.activeElement);
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % menuButtons.length;
        menuButtons[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = currentIndex === 0 ? menuButtons.length - 1 : currentIndex - 1;
        menuButtons[prevIndex].focus();
    }
});

// Form Input Enhancements
document.querySelectorAll('.form-group input').forEach(input => {
    // Add floating label effect
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.classList.remove('focused');
        }
    });
    
    // Real-time validation
    input.addEventListener('input', () => {
        input.classList.remove('error');
        const errorMsg = input.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
});

// Add form field validation styles
const formStyle = document.createElement('style');
formStyle.textContent = `
    .form-group.focused label {
        color: var(--primary-color);
        transform: translateY(-5px);
        font-size: 0.9rem;
    }
    
    .form-group input.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .error-message {
        color: #ef4444;
        font-size: 0.85rem;
        margin-top: 5px;
        display: block;
    }
    
    .form-group {
        position: relative;
    }
    
    .form-group label {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(formStyle);

// Prevent form submission on Enter key in input fields (except submit button)
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const inputs = Array.from(document.querySelectorAll('.form-group input'));
            const currentIndex = inputs.indexOf(input);
            const nextInput = inputs[currentIndex + 1];
            
            if (nextInput) {
                nextInput.focus();
            } else {
                document.querySelector('.submit-btn').focus();
            }
        }
    });
});

// Add loading state management
let isLoading = false;

function setLoading(loading) {
    isLoading = loading;
    const submitBtn = document.querySelector('.submit-btn');
    
    if (loading) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
    } else {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

// Add scroll-to-top functionality
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Show scroll-to-top button after scrolling
window.addEventListener('scroll', () => {
    const scrollBtn = document.getElementById('scroll-to-top');
    if (window.pageYOffset > 300) {
        if (!scrollBtn) {
            createScrollToTopButton();
        }
    } else if (scrollBtn) {
        scrollBtn.remove();
    }
});

function createScrollToTopButton() {
    const btn = document.createElement('button');
    btn.id = 'scroll-to-top';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--gradient-primary);
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        box-shadow: var(--shadow);
        z-index: 999;
        transition: all 0.3s ease;
        animation: fadeInUp 0.3s ease;
    `;
    
    btn.addEventListener('click', scrollToTop);
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.1)';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(btn);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial date if needed
    if (!webinarDateInput.value) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        webinarDateInput.value = tomorrow.toISOString().split('T')[0];
    }
    
    // Add ARIA labels for better accessibility
    document.querySelectorAll('.form-group input').forEach(input => {
        const label = input.parentElement.querySelector('label');
        if (label) {
            input.setAttribute('aria-label', label.textContent);
        }
    });
    
    // Preload images for better performance
    const img = new Image();
    img.src = 'Tamir face.jpeg';
    
    console.log('Tamir Armani Real Estate Webinar Site Loaded Successfully!');
});

// Add performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});

// Service Worker Registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you want to add PWA functionality
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Ripple Effect for Buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = diameter + 'px';
    circle.style.left = event.clientX - button.offsetLeft - radius + 'px';
    circle.style.top = event.clientY - button.offsetTop - radius + 'px';
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple effect to all buttons
document.querySelectorAll('button, .cta-button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Magnetic Effect for Interactive Elements
const magneticElements = document.querySelectorAll('.submit-btn, .cta-button, .nav-link');
magneticElements.forEach(element => {
    element.classList.add('magnetic');
    
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Parallax for hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Advanced Form Animations
document.querySelectorAll('.form-group input').forEach(input => {
    // Add focus ring animation
    input.addEventListener('focus', () => {
        input.style.animation = 'focusRing 0.3s ease';
    });
    
    // Add shake animation for validation errors
    input.addEventListener('invalid', () => {
        input.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    });
});

// Hero title loads normally without animation

// Webinar Details Display Logic (no admin UI)
(function () {
  const dateDisplay = document.getElementById('display-date');
  const timeDisplay = document.getElementById('display-time');
  const platformDisplay = document.querySelector('.platform-card .detail-value');

  function loadWebinarDetails() {
    const saved = JSON.parse(localStorage.getItem('webinarDetails') || '{}');
    if (saved.date) dateDisplay.textContent = saved.date;
    if (saved.time) timeDisplay.textContent = saved.time;
    if (saved.platform) platformDisplay.textContent = saved.platform;
  }

  loadWebinarDetails();
})();

// Advanced Intersection Observer with Different Animation Types
const advancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const animationType = entry.target.dataset.animation || 'fadeInUp';
            entry.target.style.animation = `${animationType} 0.8s ease forwards`;
            
            // Add stagger animation for child elements
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
                child.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
                child.style.opacity = '0';
                child.style.transform = 'translateY(30px)';
            });
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Smooth Scrollbar Animation
function animateScrollbar() {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    // Update CSS custom property for scroll progress
    document.documentElement.style.setProperty('--scroll-progress', `${scrollPercentage}%`);
    
    // Add scroll progress indicator
    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: var(--scroll-progress);
            height: 4px;
            background: var(--gradient-primary);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = `${scrollPercentage}%`;
}

window.addEventListener('scroll', animateScrollbar);

// Add more CSS animations
const advancedStyle = document.createElement('style');
advancedStyle.textContent = `
    @keyframes focusRing {
        0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
        70% { box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
        100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes fadeOut {
        to { opacity: 0; transform: scale(0); }
    }
`;
document.head.appendChild(advancedStyle);

// Lecture CTA Button Functionality
function initializeLectureCTA() {
    // No custom logic needed - the anchor link works automatically
    // The smooth scrolling is handled by the existing anchor link handler
    console.log('Lecture CTA initialized as anchor link');
}

// Toast Message Function
function showToastMessage(message) {
    // Remove any existing toast
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="toastGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <circle cx="12" cy="12" r="10" fill="url(#toastGradient)"/>
                    <path d="M9 12l2 2 4-4" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <span class="toast-text">${message}</span>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
        border: 1px solid rgba(59, 130, 246, 0.2);
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
        padding: 20px;
        min-width: 320px;
        max-width: 400px;
        backdrop-filter: blur(10px);
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        direction: rtl;
    `;
    
    // Style toast content
    const toastContent = toast.querySelector('.toast-content');
    toastContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 15px;
    `;
    
    // Style toast icon
    const toastIcon = toast.querySelector('.toast-icon');
    toastIcon.style.cssText = `
        width: 24px;
        height: 24px;
        flex-shrink: 0;
    `;
    
    // Style toast text
    const toastText = toast.querySelector('.toast-text');
    toastText.style.cssText = `
        flex: 1;
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-color);
        line-height: 1.4;
    `;
    
    // Style close button
    const toastClose = toast.querySelector('.toast-close');
    toastClose.style.cssText = `
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #6b7280;
        padding: 0;
        margin: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
    `;
    
    // Add hover effect to close button
    toastClose.addEventListener('mouseenter', () => {
        toastClose.style.background = 'rgba(239, 68, 68, 0.1)';
        toastClose.style.color = '#ef4444';
    });
    
    toastClose.addEventListener('mouseleave', () => {
        toastClose.style.background = 'none';
        toastClose.style.color = '#6b7280';
    });
    
    // Add to document
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast && toast.parentNode) {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast && toast.parentNode) {
                    toast.remove();
                }
            }, 400);
        }
    }, 5000);
}

// Add spinning animation
const spinStyle = document.createElement('style');
spinStyle.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(spinStyle);

// Initialize lecture CTA when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeLectureCTA);

// Initialize accessibility buttons when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAccessibilityButtons);

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Immediately animate hero section on page load
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        // Remove hero from scroll animation system
        heroSection.classList.remove('scroll-animation');
        // Animate immediately
        heroSection.classList.add('animate');
    }
    
    // Initialize scroll animations for all other elements
    initializeScrollAnimations();
    animateFormElements();
    
    // Add a slight delay to ensure all elements are rendered, then trigger scroll animations
    setTimeout(() => {
        handleScrollAnimations();
    }, 100);
}); 