// Tailwind Configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'neon-cyan': '#00ffff',
                'neon-blue': '#0099ff',
                'dark-bg': '#0f0f0f'
            }
        }
    }
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    // initTypingEffect(); // Disabled to preserve neon effect
    initParallaxEffect();
    initProjectsCarousel();
    initTechSliderAccessibility();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Create mobile menu if it doesn't exist
            let mobileMenu = document.querySelector('.mobile-menu');
            
            if (!mobileMenu) {
                mobileMenu = createMobileMenu();
                document.body.appendChild(mobileMenu);
            }
            
            // Toggle mobile menu
            mobileMenu.classList.toggle('active');
            
            // Toggle hamburger icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Create Mobile Menu
function createMobileMenu() {
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    mobileMenu.innerHTML = `
        <div class="mobile-menu-content">
            <a href="#home" class="mobile-menu-link">Home</a>
            <a href="#services" class="mobile-menu-link">Services</a>
            <a href="#projects" class="mobile-menu-link">Projects</a>
            <a href="#about" class="mobile-menu-link">About</a>
            <a href="mailto:abenezer@gmail.com" class="mobile-menu-link">Contact</a>
        </div>
    `;
    
    // Close menu when clicking on links
    const links = mobileMenu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Close menu when clicking outside
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    return mobileMenu;
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                // Ensure no transform conflicts
                entry.target.style.transform = 'none';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .project-card, .gradient-text');
    animateElements.forEach(el => {
        // Reset any existing transforms
        el.style.transform = 'none';
        observer.observe(el);
    });
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const heroTitle = document.querySelector('#home h1');
    if (heroTitle) {
        // Store the original HTML content with the gradient-text span
        const originalHTML = heroTitle.innerHTML;
        const textContent = heroTitle.textContent;
        
        // Clear only the text content, preserving the HTML structure
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < textContent.length) {
                // Reconstruct the HTML with the gradient-text span for "Product Designer"
                const currentText = textContent.substring(0, i + 1);
                const productDesignerIndex = currentText.indexOf('Product Designer');
                
                if (productDesignerIndex !== -1 && i >= productDesignerIndex) {
                    // We're typing the "Product Designer" part
                    const beforeProductDesigner = textContent.substring(0, productDesignerIndex);
                    const productDesignerPart = currentText.substring(productDesignerIndex);
                    
                    heroTitle.innerHTML = beforeProductDesigner + 
                        '<span class="gradient-text">' + productDesignerPart + '</span>';
                } else {
                    // We're typing the regular text
                    heroTitle.innerHTML = currentText;
                }
                
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
}

// Parallax Effect for Background Elements (Disabled to fix scroll issues)
function initParallaxEffect() {
    // Parallax effect disabled to prevent content separation issues
    // This was causing service cards and project cards to move independently
    console.log('Parallax effect disabled for better user experience');
}

// Form Validation (if contact form is added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('border-red-500');
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Copy Email to Clipboard
function copyEmail() {
    const email = 'abenezer@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        // Show success message
        showNotification('Email copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy email', 'error');
    });
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('opacity-0');
                img.classList.add('opacity-100');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Theme Toggle (if needed in future)
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Initialize theme from localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
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
const optimizedScrollHandler = debounce(() => {
    // Handle scroll events efficiently
}, 16);

// Add scroll event listener
window.addEventListener('scroll', optimizedScrollHandler);

// Initialize everything when page loads
window.addEventListener('load', () => {
    initTheme();
    initLazyLoading();
    
    // Reset any problematic transforms
    resetTransforms();
    
    // Add loading animation
    document.body.classList.add('loading');
    
    // Remove loading class after page is fully loaded
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 1000);
});

// Reset transforms to prevent scroll issues
function resetTransforms() {
    const cards = document.querySelectorAll('.service-card, .project-card');
    cards.forEach(card => {
        card.style.transform = 'none';
    });
}

// Tech Slider: pause on focus for accessibility
function initTechSliderAccessibility() {
    const slider = document.querySelector('.tech-slider');
    const track = document.querySelector('.tech-slide-track');
    if (!slider || !track) return;
    slider.setAttribute('role', 'region');
    slider.setAttribute('aria-label', 'Technology icons slideshow');
    slider.addEventListener('focusin', () => {
        track.style.animationPlayState = 'paused';
    });
    slider.addEventListener('focusout', () => {
        track.style.animationPlayState = 'running';
    });
}

// Projects Carousel Functionality
function initProjectsCarousel() {
    const carousel = document.getElementById('projects-carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    const items = carousel.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    let currentIndex = 0;
    let itemsPerView = getItemsPerView();
    
    // Create indicators
    createIndicators();
    
    // Initialize carousel
    updateCarousel();
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalItems - itemsPerView) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < totalItems - itemsPerView) {
                // Swipe left - next
                currentIndex++;
                updateCarousel();
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right - previous
                currentIndex--;
                updateCarousel();
            }
        }
    }
    
    function getItemsPerView() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 1024) return 2;
        return 3;
    }
    
    function createIndicators() {
        const totalPages = Math.ceil(totalItems / itemsPerView);
        
        for (let i = 0; i < totalPages; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            indicator.addEventListener('click', () => {
                currentIndex = i * itemsPerView;
                updateCarousel();
            });
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    function updateCarousel() {
        const translateX = -(currentIndex * (100 / itemsPerView));
        carousel.style.transform = `translateX(${translateX}%)`;
        
        // Update navigation buttons
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalItems - itemsPerView;
        
        // Update indicators
        updateIndicators();
    }
    
    function updateIndicators() {
        const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
        const currentPage = Math.floor(currentIndex / itemsPerView);
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentPage);
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        itemsPerView = getItemsPerView();
        currentIndex = Math.min(currentIndex, totalItems - itemsPerView);
        updateCarousel();
        
        // Recreate indicators for new items per view
        indicatorsContainer.innerHTML = '';
        createIndicators();
    }, 250));
}

// Export functions for potential external use
window.PortfolioApp = {
    copyEmail,
    showNotification,
    toggleTheme,
    validateForm
}; 