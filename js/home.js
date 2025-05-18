document.addEventListener('DOMContentLoaded', function() {
    // Animated typing effect for hero heading
    function animateHeading() {
        const heading = document.querySelector('.animated-heading');
        if (!heading) return;
        
        heading.style.opacity = '1';
    }
    
    // Animate floating icons
    function animateFloatingIcons() {
        const icons = document.querySelectorAll('.service-icon');
        
        icons.forEach((icon, index) => {
            // Set random animation delay
            const delay = Math.random() * 2;
            icon.style.animationDelay = `${delay}s`;
            
            // Add click effect
            icon.addEventListener('click', function() {
                this.style.transform = 'scale(1.2)';
                
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
                
                // Navigate to services page
                setTimeout(() => {
                    window.location.href = 'services.html';
                }, 500);
            });
        });
    }
    
    // Category dropdown functionality
    function setupCategoryDropdown() {
        const categorySelect = document.querySelector('.category-select');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        const dropdownItems = document.querySelectorAll('.dropdown-menu a');
        
        if (!categorySelect || !dropdownMenu) return;
        
        // Toggle dropdown on click
        categorySelect.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            dropdownMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!categorySelect.contains(e.target)) {
                dropdownMenu.classList.remove('active');
                categorySelect.classList.remove('active');
            }
        });
        
        // Select category
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get category name
                const category = this.getAttribute('data-category');
                
                if (category) {
                    // Update button text
                    categorySelect.querySelector('span').textContent = this.textContent;
                    
                    // Close dropdown
                    dropdownMenu.classList.remove('active');
                    categorySelect.classList.remove('active');
                    
                    // Navigate to services page after delay
                    setTimeout(() => {
                        window.location.href = `services.html?category=${category}`;
                    }, 300);
                } else {
                    // Just navigate to services page
                    window.location.href = this.getAttribute('href');
                }
            });
        });
    }
    
    // Stats counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = Math.ceil(target / (duration / 30)); // Update every 30ms
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current > target) {
                    current = target;
                }
                counter.textContent = current.toLocaleString();
                
                if (current < target) {
                    requestAnimationFrame(updateCounter);
                }
            };
            
            // Start counting when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    // Testimonial slider
    function setupTestimonialSlider() {
        const testimonialTrack = document.querySelector('.testimonial-track');
        const prevButton = document.querySelector('.testimonial-control.prev');
        const nextButton = document.querySelector('.testimonial-control.next');
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        
        if (!testimonialTrack || !prevButton || !nextButton) return;
        
        let currentIndex = 0;
        let slideWidth = 0;
        let maxIndex = 0;
        
        // Calculate slide width and max index
        function updateDimensions() {
            if (window.innerWidth >= 992) {
                slideWidth = testimonialTrack.offsetWidth / 3;
                maxIndex = Math.ceil(document.querySelectorAll('.testimonial-card').length / 3) - 1;
            } else if (window.innerWidth >= 768) {
                slideWidth = testimonialTrack.offsetWidth / 2;
                maxIndex = Math.ceil(document.querySelectorAll('.testimonial-card').length / 2) - 1;
            } else {
                slideWidth = testimonialTrack.offsetWidth;
                maxIndex = document.querySelectorAll('.testimonial-card').length - 1;
            }
            
            // Update slider position
            updateSlider();
        }
        
        // Update slider position
        function updateSlider() {
            testimonialTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            // Disable/enable buttons
            prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
            nextButton.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
        }
        
        // Previous slide
        prevButton.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
        
        // Next slide
        nextButton.addEventListener('click', function() {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                updateSlider();
            });
        });
        
        // Initialize slider
        updateDimensions();
        
        // Update dimensions on window resize
        window.addEventListener('resize', updateDimensions);
        
        // Auto-advance slider
        setInterval(() => {
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        }, 5000);
    }
    
    // Initialize animations and functionality
    animateHeading();
    animateFloatingIcons();
    setupCategoryDropdown();
    setupTestimonialSlider();
    
    // Initialize stats counters when scrolled into view
    window.addEventListener('scroll', function() {
        const statsSection = document.querySelector('.stats-section');
        
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animateCounters();
                window.removeEventListener('scroll', this);
            }
        }
    });
    
    // Add scroll animations
    const revealElements = document.querySelectorAll('.section-header, .service-card, .step-card, .stat-card');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Add revealed class for CSS animations
    revealElements.forEach(element => {
        element.classList.add('reveal-element');
    });
    
    // Check on scroll and page load
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    
    // Add CSS for reveal animations
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .reveal-element {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .reveal-element.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    
    document.head.appendChild(styleElement);
});