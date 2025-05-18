document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const serviceSearch = document.getElementById('serviceSearch');
    const locationSearch = document.getElementById('locationSearch');
    const clearSearch = document.querySelector('.clear-search');
    const searchBtn = document.querySelector('.search-btn');
    const useMyLocation = document.querySelector('.use-my-location');
    const popularSearches = document.querySelectorAll('.popular-searches a');
    
    // Show/hide clear button based on search input
    if (serviceSearch) {
        serviceSearch.addEventListener('input', function() {
            clearSearch.style.display = this.value ? 'block' : 'none';
        });
        
        // Clear search field
        clearSearch.addEventListener('click', function() {
            serviceSearch.value = '';
            this.style.display = 'none';
            serviceSearch.focus();
        });
    }
    
    // Use my location button
    if (useMyLocation) {
        useMyLocation.addEventListener('click', function() {
            // For demo purposes, just fill in "Kampala"
            locationSearch.value = 'Kampala, Uganda';
            
            // Animate the button
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.style.color = 'var(--accent-color)';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-crosshairs"></i>';
                this.style.color = '';
            }, 2000);
        });
    }
    
    // Popular searches
    popularSearches.forEach(search => {
        search.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get category name
            const category = this.getAttribute('data-category');
            
            // Fill search input
            if (serviceSearch) {
                serviceSearch.value = category.charAt(0).toUpperCase() + category.slice(1);
                clearSearch.style.display = 'block';
            }
            
            // Scroll to categories section
            const categoriesSection = document.querySelector('.service-categories');
            if (categoriesSection) {
                categoriesSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Highlight the corresponding category card
            const categoryCard = document.querySelector(`.category-card[data-category="${category}"]`);
            if (categoryCard) {
                // Remove highlight from all cards
                document.querySelectorAll('.category-card').forEach(card => {
                    card.classList.remove('highlight');
                });
                
                // Add highlight to selected card
                categoryCard.classList.add('highlight');
                
                // Scroll the card into view
                setTimeout(() => {
                    categoryCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 500);
            }
        });
    });
    
    // Search button action
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const service = serviceSearch ? serviceSearch.value.trim() : '';
            const location = locationSearch ? locationSearch.value.trim() : '';
            
            if (!service && !location) {
                // Show error message
                showToast('Please enter a service or location');
                return;
            }
            
            // Animate button
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            // Simulate search delay
            setTimeout(() => {
                // Restore button
                this.innerHTML = '<span>Search</span> <i class="fas fa-arrow-right"></i>';
                
                // Scroll to categories section
                const categoriesSection = document.querySelector('.service-categories');
                if (categoriesSection) {
                    categoriesSection.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Filter categories based on search
                filterCategories(service.toLowerCase());
            }, 1500);
        });
    }
    
    // Filter categories based on search
    function filterCategories(searchTerm) {
        const categoryCards = document.querySelectorAll('.category-card');
        let foundMatch = false;
        
        categoryCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDesc = card.querySelector('p').textContent.toLowerCase();
            
            const matches = cardCategory.includes(searchTerm) || 
                            cardTitle.includes(searchTerm) || 
                            cardDesc.includes(searchTerm);
            
            if (matches) {
                card.style.display = 'block';
                card.classList.add('highlight');
                foundMatch = true;
                
                // Scroll the first match into view
                if (!foundMatch) {
                    setTimeout(() => {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 500);
                }
            } else {
                card.style.display = 'none';
                card.classList.remove('highlight');
            }
        });
        
        // Show message if no matches found
        const noResultsMessage = document.querySelector('.no-results-message');
        
        if (!foundMatch) {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.className = 'no-results-message';
                message.innerHTML = `
                    <div class="no-results-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3>No services found</h3>
                    <p>Try a different search term or browse our categories</p>
                    <button class="reset-btn">View All Categories</button>
                `;
                
                // Insert message after categories grid
                const categoriesGrid = document.querySelector('.categories-grid');
                if (categoriesGrid) {
                    categoriesGrid.after(message);
                    
                    // Add event listener to reset button
                    const resetBtn = message.querySelector('.reset-btn');
                    resetBtn.addEventListener('click', resetCategories);
                }
            }
        } else {
            // Remove no results message if it exists
            if (noResultsMessage) {
                noResultsMessage.remove();
            }
        }
    }
    
    // Reset categories
    function resetCategories() {
        const categoryCards = document.querySelectorAll('.category-card');
        
        categoryCards.forEach(card => {
            card.style.display = 'block';
            card.classList.remove('highlight');
        });
        
        // Remove no results message
        const noResultsMessage = document.querySelector('.no-results-message');
        if (noResultsMessage) {
            noResultsMessage.remove();
        }
        
        // Clear search input
        if (serviceSearch) {
            serviceSearch.value = '';
            clearSearch.style.display = 'none';
        }
        
        if (locationSearch) {
            locationSearch.value = '';
        }
    }
    
    // Featured services carousel
    const carouselTrack = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    
    if (carouselTrack && prevButton && nextButton) {
        let currentIndex = 0;
        let slideWidth = 0;
        let maxIndex = 0;
        
        // Calculate slide width and max index
        function updateCarouselDimensions() {
            if (window.innerWidth >= 1200) {
                slideWidth = carouselTrack.offsetWidth / 3;
                maxIndex = Math.ceil(document.querySelectorAll('.featured-card').length / 3) - 1;
            } else if (window.innerWidth >= 768) {
                slideWidth = carouselTrack.offsetWidth / 2;
                maxIndex = Math.ceil(document.querySelectorAll('.featured-card').length / 2) - 1;
            } else {
                slideWidth = carouselTrack.offsetWidth;
                maxIndex = document.querySelectorAll('.featured-card').length - 1;
            }
            
            // Update carousel position
            updateCarousel();
        }
        
        // Update carousel position
        function updateCarousel() {
            carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            
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
                updateCarousel();
            }
        });
        
        // Next slide
        nextButton.addEventListener('click', function() {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                updateCarousel();
            });
        });
        
        // Initialize carousel
        updateCarouselDimensions();
        
        // Update carousel on window resize
        window.addEventListener('resize', updateCarouselDimensions);
        
        // Auto-advance carousel
        setInterval(() => {
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 5000);
    }
    
    // Testimonial slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialPrev = document.querySelector('.testimonial-control.prev');
    const testimonialNext = document.querySelector('.testimonial-control.next');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (testimonialTrack && testimonialPrev && testimonialNext) {
        let currentIndex = 0;
        let slideWidth = 0;
        let maxIndex = 0;
        
        // Calculate slide width and max index
        function updateTestimonialDimensions() {
            if (window.innerWidth >= 1200) {
                slideWidth = testimonialTrack.offsetWidth / 3;
                maxIndex = Math.ceil(document.querySelectorAll('.testimonial-card').length / 3) - 1;
            } else if (window.innerWidth >= 768) {
                slideWidth = testimonialTrack.offsetWidth / 2;
                maxIndex = Math.ceil(document.querySelectorAll('.testimonial-card').length / 2) - 1;
            } else {
                slideWidth = testimonialTrack.offsetWidth;
                maxIndex = document.querySelectorAll('.testimonial-card').length - 1;
            }
            
            // Update testimonial position
            updateTestimonial();
        }
        
        // Update testimonial position
        function updateTestimonial() {
            testimonialTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            
            // Update dots
            testimonialDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            // Disable/enable buttons
            testimonialPrev.style.opacity = currentIndex === 0 ? '0.5' : '1';
            testimonialNext.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
        }
        
        // Previous slide
        testimonialPrev.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateTestimonial();
            }
        });
        
        // Next slide
        testimonialNext.addEventListener('click', function() {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateTestimonial();
            }
        });
        
        // Dot navigation
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                updateTestimonial();
            });
        });
        
        // Initialize testimonial slider
        updateTestimonialDimensions();
        
        // Update testimonial slider on window resize
        window.addEventListener('resize', updateTestimonialDimensions);
        
        // Auto-advance testimonial slider
        setInterval(() => {
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateTestimonial();
        }, 6000);
    }
    
    // How It Works steps animation
    const connectionLines = document.querySelectorAll('.connection-line');
    
    function animateHowItWorks() {
        connectionLines.forEach((line, index) => {
            setTimeout(() => {
                line.classList.add('active');
            }, 500 * (index + 1));
        });
    }
    
// Activate on scroll
function checkScroll() {
    const howItWorks = document.querySelector('.how-it-works');
    
    if (howItWorks) {
        const rect = howItWorks.getBoundingClientRect();
        
        if (rect.top < window.innerHeight * 0.8) {
            animateHowItWorks();
            window.removeEventListener('scroll', checkScroll);
        }
    }
}

// Check on scroll and on page load
window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Category card hover effects
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add hover effect
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        
        // Animate icon
        const icon = this.querySelector('.category-icon');
        if (icon) {
            icon.style.backgroundColor = 'var(--accent-color)';
            icon.style.color = 'white';
            icon.style.transform = 'rotate(10deg)';
            icon.style.borderRadius = '50%';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        // Remove hover effect
        this.style.transform = '';
        this.style.boxShadow = '';
        
        // Reset icon
        const icon = this.querySelector('.category-icon');
        if (icon) {
            icon.style.backgroundColor = '';
            icon.style.color = '';
            icon.style.transform = '';
            icon.style.borderRadius = '';
        }
    });
});

// Book Now button effects
const bookButtons = document.querySelectorAll('.btn-book');

bookButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add pulse effect
        this.classList.add('pulse');
        
        // Change text to "Booking..."
        const originalText = this.textContent;
        this.textContent = 'Booking...';
        
        // Simulate booking process
        setTimeout(() => {
            // Change text to "Booked!"
            this.textContent = 'Booked!';
            this.style.backgroundColor = 'var(--accent-color)';
            this.style.color = 'var(--primary-color)';
            
            // Show toast notification
            showToast('Service booked successfully!');
            
            // Reset button after delay
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
                this.style.color = '';
                this.classList.remove('pulse');
            }, 2000);
        }, 1500);
    });
});

// Join as Provider button effect
const joinButton = document.querySelector('.btn-join');

if (joinButton) {
    joinButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add pulse effect
        this.classList.add('pulse');
        
        // Change text
        const originalText = this.textContent;
        this.textContent = 'Redirecting...';
        
        // Simulate redirect
        setTimeout(() => {
            // Show toast notification
            showToast('Provider registration coming soon!');
            
            // Reset button
            this.textContent = originalText;
            this.classList.remove('pulse');
        }, 1500);
    });
}

// Toast notification function
function showToast(message) {
    // Remove any existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <div class="toast-content">
            <p>${message}</p>
        </div>
    `;
    
    // Add toast to body
    document.body.appendChild(toast);
    
    // Animate toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove toast after delay
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Add CSS for toast notification
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    .toast-notification {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        padding: 15px 20px;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 9999;
    }
    
    .toast-notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .toast-icon {
        width: 30px;
        height: 30px;
        background-color: var(--accent-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        margin-right: 15px;
    }
    
    .toast-content p {
        font-size: 14px;
        color: #333;
        margin: 0;
    }
    
    .category-card.highlight {
        animation: highlight 2s ease;
        position: relative;
        z-index: 3;
    }
    
    @keyframes highlight {
        0%, 100% {
            transform: translateY(0);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
        }
        50% {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            border: 2px solid var(--accent-color);
        }
    }
    
    .pulse {
        animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }
    
    .no-results-message {
        text-align: center;
        padding: 50px 0;
        animation: fadeIn 0.5s ease;
    }
    
    .no-results-icon {
        width: 80px;
        height: 80px;
        background-color: rgba(120, 232, 145, 0.15);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        color: var(--primary-color);
        margin: 0 auto 20px;
    }
    
    .no-results-message h3 {
        font-size: 24px;
        color: var(--primary-color);
        margin-bottom: 10px;
    }
    
    .no-results-message p {
        font-size: 16px;
        color: #666;
        margin-bottom: 20px;
    }
    
    .reset-btn {
        display: inline-block;
        padding: 12px 25px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .reset-btn:hover {
        background-color: var(--accent-color);
        color: var(--primary-color);
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
`;

document.head.appendChild(toastStyle);
});