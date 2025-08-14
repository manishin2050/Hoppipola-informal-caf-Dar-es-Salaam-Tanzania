// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
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

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('.lazy-load').forEach(img => {
    imageObserver.observe(img);
});

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const date = formData.get('date');
    const time = formData.get('time');
    const guests = formData.get('guests');
    const message = formData.get('message');
    
    // Create WhatsApp message
    const whatsappMessage = `Hi! I'd like to book a table at Hoppipola Café.
    
Details:
Name: ${name}
Email: ${email}
Phone: ${phone}
Date: ${date}
Time: ${time}
Number of Guests: ${guests}
${message ? `Special Requests: ${message}` : ''}

Please confirm my booking. Thank you!`;
    
    // Open WhatsApp with the message
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/255123456789?text=${encodedMessage}`;
    
    // Show success message
    showNotification('Redirecting to WhatsApp for booking confirmation...', 'success');
    
    // Redirect to WhatsApp after a short delay
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 1500);
    
    // Reset form
    contactForm.reset();
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Form validation
function validateForm() {
    const requiredFields = contactForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            field.style.borderColor = '#e2e8f0';
        }
    });
    
    return isValid;
}

// Add real-time validation
contactForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '#e2e8f0';
        }
    });
    
    field.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(239, 68, 68)' && this.value.trim()) {
            this.style.borderColor = '#e2e8f0';
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-background');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add floating animation to cards
const cards = document.querySelectorAll('.about-card, .menu-item, .review-card');
cards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add stagger animation delay
document.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
});

// WhatsApp float button animation
const whatsappFloat = document.querySelector('.whatsapp-float a');
if (whatsappFloat) {
    whatsappFloat.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Open WhatsApp
        setTimeout(() => {
            window.open(this.href, '_blank');
        }, 200);
    });
}

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 80);
        }
    }, 2000);
});

// Add dynamic date picker (prevent past dates)
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Add hover effect to navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add loading state to form submit button
contactForm.addEventListener('submit', function() {
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 3000);
});

let lastScrollTop = 0;
let scrollTimeout;

window.addEventListener('scroll', function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop + 5 && currentScroll > 1000) {
            // scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else if (currentScroll < lastScrollTop - 100) {
            // scrolling up
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, 10); // adjust delay to taste
});



// Add counter animation for stats (if needed)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Initialize performance optimization
document.addEventListener('DOMContentLoaded', function() {
    // Preload critical images
    const criticalImages = [
        'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Add error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg'; // Fallback image
        this.alt = 'Hoppipola Café - Sports and Dining';
    });
});