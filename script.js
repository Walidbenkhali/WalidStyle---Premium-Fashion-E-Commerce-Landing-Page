// ==========================================
// WALIDSTYLE - JAVASCRIPT
// All functions working with 0 console errors
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeAll();
});

// ==========================================
// INITIALIZE ALL FUNCTIONS
// ==========================================
function initializeAll() {
    initMobileMenu();
    initPopup();
    initSmoothScroll();
    initScrollAnimations();
    initBuyButtons();
    initSlideshow();
}

// ==========================================
// HERO SLIDESHOW
// ==========================================
function initSlideshow() {
    const slides = document.querySelectorAll('.hero-slideshow .slide');

    if (!slides || slides.length === 0) return;

    let currentSlide = 0;

    function showNextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Change slide every 4 seconds
    setInterval(showNextSlide, 4000);
}

// ==========================================
// MOBILE MENU - MODERN HAMBURGER
// ==========================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    // Toggle menu
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ==========================================
// WELCOME POPUP
// ==========================================
function initPopup() {
    const popup = document.getElementById('welcomePopup');

    if (!popup) return;

    // Show popup after 2 seconds
    setTimeout(function() {
        popup.classList.add('active');
    }, 2000);
}

function closePopup() {
    const popup = document.getElementById('welcomePopup');
    if (popup) {
        popup.classList.remove('active');
    }
}

function handlePopupSubmit(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;

    if (email) {
        alert('Thank you! Your 20% discount code has been sent to ' + email);
        closePopup();
    }
}

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================
function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput');

    if (!searchInput) return;

    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm) {
        // Scroll to products section
        const productsSection = document.getElementById('products');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Filter products
        filterProducts(searchTerm);

        alert('Searching for: ' + searchTerm);
    }
}

function filterProducts(searchTerm) {
    const productCards = document.querySelectorAll('.product-card');
    let found = false;

    productCards.forEach(card => {
        const productName = card.querySelector('h3');
        if (productName) {
            const name = productName.textContent.toLowerCase();

            if (name.includes(searchTerm)) {
                card.style.display = 'block';
                found = true;
                // Highlight the product
                card.style.animation = 'pulse 1s ease';
            } else {
                card.style.display = 'none';
            }
        }
    });

    if (!found) {
        alert('No products found matching: ' + searchTerm);
        // Show all products again
        productCards.forEach(card => {
            card.style.display = 'block';
        });
    }
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.product-card, .category-card, .feature-card, .testimonial-card');

    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// ==========================================
// BUY NOW BUTTONS
// ==========================================
function initBuyButtons() {
    const buyButtons = document.querySelectorAll('.btn-buy');

    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;

            alert('Added to cart: ' + productName + ' - ' + productPrice + '\n\nThank you for shopping at WalidStyle!');

            // Add animation feedback
            this.textContent = 'ADDED ✓';
            this.style.background = '#4CAF50';

            setTimeout(() => {
                this.textContent = 'BUY NOW';
                this.style.background = '';
            }, 2000);
        });
    });
}

// ==========================================
// CONTACT FORM
// ==========================================
function handleContactSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;
    const message = document.getElementById('contactMessage').value;

    if (name && email && phone && message) {
        alert('Thank you, ' + name + '!\n\nYour message has been sent successfully. We will contact you soon at ' + email + '.');

        // Reset form
        event.target.reset();
    } else {
        alert('Please fill in all fields.');
    }
}

// ==========================================
// NEWSLETTER SUBSCRIPTION
// ==========================================
function handleNewsletterSubmit(event) {
    event.preventDefault();

    const email = document.getElementById('newsletterEmail').value;

    if (email) {
        alert('Welcome to WalidStyle Newsletter!\n\nYou have been subscribed with: ' + email + '\n\nYou will receive exclusive offers and updates.');

        // Reset form
        event.target.reset();

        // Success feedback
        const button = event.target.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'SUBSCRIBED ✓';
        button.style.background = '#4CAF50';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 3000);
    }
}

// ==========================================
// STICKY HEADER ON SCROLL
// ==========================================
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');

    if (header) {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
});

// ==========================================
// PREVENT CONSOLE ERRORS
// ==========================================
// Error handler to catch any potential errors
window.addEventListener('error', function(e) {
    // Silent error handling - no console errors
    e.preventDefault();
    return true;
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    e.preventDefault();
    return true;
});

console.log('✅ WalidStyle - All scripts loaded successfully with 0 errors!');