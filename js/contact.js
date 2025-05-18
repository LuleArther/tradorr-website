document.addEventListener('DOMContentLoaded', function() {
    // Floating label effects for form inputs
    const formInputs = document.querySelectorAll('.floating-label input, .floating-label textarea');
    
    formInputs.forEach(input => {
        // Check if input has value on page load
        if (input.value !== '') {
            input.parentElement.classList.add('active');
        }
        
        // Add active class on focus
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('active');
        });
        
        // Remove active class if input is empty
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('active');
            }
        });
    });
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const parent = this.parentElement;
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.faq-toggle i');
            
            // Toggle current FAQ item
            if (parent.classList.contains('active')) {
                parent.classList.remove('active');
                answer.style.maxHeight = null;
                icon.className = 'fas fa-plus';
            } else {
                // Close other open FAQ items
                document.querySelectorAll('.faq-item.active').forEach(item => {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = null;
                    item.querySelector('.faq-toggle i').className = 'fas fa-plus';
                });
                
                // Open current FAQ item
                parent.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.className = 'fas fa-minus';
            }
        });
    });
    
    // Live chat widget functionality
    const chatButton = document.getElementById('chatButton');
    const chatWidget = document.getElementById('chatWidget');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.querySelector('.send-message');
    const chatBody = document.querySelector('.chat-body');
    const typingIndicator = document.querySelector('.typing-indicator');
    
    // Chat triggers (button and links)
    chatButton.addEventListener('click', toggleChat);
    
    const chatTriggers = document.querySelectorAll('.chat-trigger');
    chatTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            openChat();
        });
    });
    
    // Close chat
    closeChat.addEventListener('click', toggleChat);
    
    // Send message function
    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (message !== '') {
            // Add user message
            addMessage('user', message);
            chatInput.value = '';
            
            // Show typing indicator
            typingIndicator.style.display = 'flex';
            
            // Simulate bot response after delay
            setTimeout(() => {
                typingIndicator.style.display = 'none';
                
                // Add bot response
                addMessage('bot', 'Thank you for your message. Our team will get back to you shortly. Is there anything else I can help you with?');
                
                // Scroll to bottom
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 2000);
        }
    }
    
    // Add message to chat
    function addMessage(type, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}`;
        
        let avatarSrc = '';
        if (type === 'bot') {
            avatarSrc = 'assets/images/Tradorr logo no background.png';
        } else {
            avatarSrc = 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80';
        }
        
        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="${avatarSrc}" alt="Avatar">
            </div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${timeString}</span>
            </div>
        `;
        
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    // Send message on button click
    sendMessage.addEventListener('click', sendChatMessage);
    
    // Send message on Enter key
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendChatMessage();
        }
    });
    
    // Toggle chat widget
    function toggleChat() {
        if (chatWidget.style.display === 'flex') {
            chatWidget.style.opacity = '0';
            setTimeout(() => {
                chatWidget.style.display = 'none';
                chatButton.style.display = 'flex';
            }, 300);
        } else {
            openChat();
        }
    }
    
    function openChat() {
        chatButton.style.display = 'none';
        chatWidget.style.display = 'flex';
        setTimeout(() => {
            chatWidget.style.opacity = '1';
        }, 10);
        
        // Focus on input
        chatInput.focus();
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="btn-text">Sending...</span> <span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span>';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Remove active class from inputs
                formInputs.forEach(input => {
                    input.parentElement.classList.remove('active');
                });
                
                // Reset submit button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success modal
                showSuccessModal();
            }, 2000);
        });
    }
    
    // Show success modal
    function showSuccessModal() {
        successModal.classList.add('show');
    }
    
    // Hide success modal
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', function() {
            successModal.classList.remove('show');
        });
    }
    
    // Close modal when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('show');
        }
    });
    
    // Map marker animation
    const mapMarker = document.querySelector('.map-marker');
    if (mapMarker) {
        mapMarker.addEventListener('click', function() {
            this.style.transform = 'scale(1.3)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    }
    
    // Scroll animation for options cards
    const optionCards = document.querySelectorAll('.option-card');
    
    function checkCardsScroll() {
        optionCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.85) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100 * index);
            }
        });
    }
    
    // Initialize card animations
    optionCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transitionDelay = `${0.1 * index}s`;
    });
    
    // Check on scroll and on page load
    window.addEventListener('scroll', checkCardsScroll);
    window.addEventListener('load', checkCardsScroll);
});