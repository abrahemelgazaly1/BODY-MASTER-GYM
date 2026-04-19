// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Hero Slider
let currentSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');

function showSlide(index) {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroSlides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
}

// Auto slide every 5 seconds
if (heroSlides.length > 1) {
    setInterval(nextSlide, 5000);
}

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when in viewport
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            });
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    observer.observe(statsSection);
}

// Pricing Modal
const subscribeButtons = document.querySelectorAll('.subscribe-btn');
const subscriptionModal = new bootstrap.Modal(document.getElementById('subscriptionModal'));
const selectedPlanSpan = document.getElementById('selectedPlan');
const planInput = document.getElementById('planInput');

subscribeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const plan = this.getAttribute('data-plan');
        selectedPlanSpan.textContent = plan;
        planInput.value = plan;
        subscriptionModal.show();
    });
});

// Subscription Form Submit
const subscriptionForm = document.getElementById('subscriptionForm');
subscriptionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const plan = document.getElementById('planInput').value;
    
    // Create WhatsApp message
    const message = `Hello Body Master Gym!%0A%0AI would like to subscribe to: ${plan}%0A%0AName: ${name}%0AEmail: ${email}%0APhone: +971${phone}%0A%0APlease confirm my subscription.`;
    
    // Open WhatsApp
    window.open(`https://wa.me/971501209529?text=${message}`, '_blank');
    
    // Close modal
    subscriptionModal.hide();
    
    // Reset form
    subscriptionForm.reset();
    
    // Show success message
    alert('Your subscription request has been sent via WhatsApp!');
});

// Gallery Lightbox Effect
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }, 300);
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });
    });
});

// Feature Card Accordion Toggle
function toggleFeature(element) {
    const card = element.parentElement;
    const allCards = document.querySelectorAll('.feature-card-accordion');
    
    // Close all other cards
    allCards.forEach(c => {
        if (c !== card && c.classList.contains('active')) {
            c.classList.remove('active');
        }
    });
    
    // Toggle current card
    card.classList.toggle('active');
}

// Add lightbox styles dynamically
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox.active {
        opacity: 1;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        border-radius: 10px;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        font-size: 40px;
        color: white;
        cursor: pointer;
        transition: color 0.3s ease;
    }
    
    .lightbox-close:hover {
        color: #ff0000;
    }
`;
document.head.appendChild(lightboxStyles);

// Testimonials Slider
let currentTestimonial = 0;
const testimonialItems = document.querySelectorAll('.testimonial-item');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');

function showTestimonial(index) {
    testimonialItems.forEach(item => item.classList.remove('active'));
    testimonialItems[index].classList.add('active');
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
    showTestimonial(currentTestimonial);
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);
    
    // Auto slide
    setInterval(nextTestimonial, 5000);
}

// Contact Form Submit
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = this.querySelector('input[placeholder="Your Name"]').value;
        const email = this.querySelector('input[placeholder="Your Email"]').value;
        const phone = this.querySelector('input[placeholder="50 123 4567"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea').value;
        
        // Create WhatsApp message
        const whatsappMessage = `Hello Body Master Gym!%0A%0AContact Form Submission:%0A%0AName: ${name}%0AEmail: ${email}%0APhone: +971${phone}%0ASubject: ${subject}%0AMessage: ${message}`;
        
        // Open WhatsApp
        window.open(`https://wa.me/971501209529?text=${whatsappMessage}`, '_blank');
        
        // Reset form
        this.reset();
        
        // Show success message
        alert('Your message has been sent via WhatsApp!');
    });
}

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

// Parallax Effect for Hero Section (Removed - using CSS animation instead)
// The hero images now use CSS keyframe animation for smooth movement

// Add hover effect to pricing cards
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (this.classList.contains('popular') || this.classList.contains('best-value')) {
            this.style.transform = 'scale(1.05)';
        } else {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Phone number validation
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});

// Loading Animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add entrance animations to elements
const animateOnScroll = document.querySelectorAll('[data-aos]');
const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, {
    threshold: 0.1
});

animateOnScroll.forEach(element => {
    animateObserver.observe(element);
});

console.log('Body Master Gym Website Loaded Successfully! 💪');
