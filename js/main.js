// When the document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Dropdown functionality
    const categorySelect = document.querySelector('.category-select');
    
    if (categorySelect) {
        categorySelect.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would show a dropdown
            // For now, just add a visual effect
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 500);
        });
    }
    
    // Animated service icons
    const serviceIcons = document.querySelectorAll('.icon-circle');
    if (serviceIcons.length > 0) {
        serviceIcons.forEach(icon => {
            // Add interaction effects
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) translateY(-5px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
            
            // Add click effect to navigate to services page
            icon.addEventListener('click', function() {
                window.location.href = 'services.html';
            });
        });
    }
    
    // Add scroll animations
    window.addEventListener('scroll', revealOnScroll);
    
    function revealOnScroll() {
        const elements = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    }
    
    // Add reveal class to elements that should animate on scroll
    const animateElements = document.querySelectorAll('.category-card, .about-content, .contact-container, .category-grid');
    animateElements.forEach(el => {
        el.classList.add('reveal');
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add page transitions
    const transitionLinks = document.querySelectorAll('a:not([href^="#"])');
    transitionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to internal links
            if (this.hostname === window.location.hostname) {
                const currentPage = document.querySelector('main') || document.body;
                
                // Add transition effect
                currentPage.style.opacity = '0';
                currentPage.style.transition = 'opacity 0.3s ease';
            }
        });
    });
});

// Add fade-in effect on page load
window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
    
    // Initialize animations for elements that should appear on load
    const fadeElements = document.querySelectorAll('.hero-content, .service-provider-image, .review-card, .service-search');
    fadeElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 * index);
    });
});