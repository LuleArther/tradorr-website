document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const parallaxBg = document.querySelector('.parallax-bg');
        if (parallaxBg) {
            const scrollPosition = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
    
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal-element');
    
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on initial load
    
    // Map marker interactions
    const mapMarkers = document.querySelectorAll('.map-marker');
    
    mapMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            this.querySelector('.marker-info').style.opacity = '1';
            this.querySelector('.marker-info').style.visibility = 'visible';
        });
        
        marker.addEventListener('mouseleave', function() {
            this.querySelector('.marker-info').style.opacity = '0';
            this.querySelector('.marker-info').style.visibility = 'hidden';
        });
    });
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function animateTimeline() {
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('active');
            }, 300 * index);
        });
    }
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.faq-toggle i');
            
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            }
        });
    });
    
    // Team member hover effects
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.querySelector('.member-social').style.bottom = '0';
        });
        
        member.addEventListener('mouseleave', function() {
            this.querySelector('.member-social').style.bottom = '-50px';
        });
    });
    
    // Check if the timeline is in viewport, then animate
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function checkTimeline() {
        const timeline = document.querySelector('.story-timeline');
        if (timeline && isInViewport(timeline)) {
            animateTimeline();
            window.removeEventListener('scroll', checkTimeline);
        }
    }
    
    window.addEventListener('scroll', checkTimeline);
    checkTimeline(); // Check on initial load
});