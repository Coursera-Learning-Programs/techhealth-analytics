// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Scroll Animation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Animation on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .product-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Product Carousel
const productGrid = document.querySelector('.product-grid');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const products = document.querySelectorAll('.product-card');

// Create dots
const dotsContainer = document.querySelector('.carousel-dots');
const totalSlides = Math.ceil(products.length / 3);

for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
}

let currentSlide = 0;

function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function slideProducts(direction) {
    const productWidth = products[0].offsetWidth + 32; // Width + gap
    currentSlide = direction === 'next' 
        ? Math.min(currentSlide + 1, totalSlides - 1)
        : Math.max(currentSlide - 1, 0);
    
    productGrid.scrollTo({
        left: currentSlide * productWidth * 3,
        behavior: 'smooth'
    });
    
    updateDots();
}

prevButton?.addEventListener('click', () => slideProducts('prev'));
nextButton?.addEventListener('click', () => slideProducts('next'));

// Optional: Auto-scroll
let autoScrollInterval;

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        if (currentSlide >= totalSlides - 1) {
            currentSlide = -1;
        }
        slideProducts('next');
    }, 5000);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

startAutoScroll();

productGrid.addEventListener('mouseenter', stopAutoScroll);
productGrid.addEventListener('mouseleave', startAutoScroll);