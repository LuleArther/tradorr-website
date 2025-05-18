// Authentication functionality
document.addEventListener('DOMContentLoaded', function() {
    // Login button functionality with enhanced animation
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add visual feedback
            this.classList.add('clicked');
            
            // Show a modal instead of an alert
            showModal('Login', `
                <form id="loginForm">
                    <div class="form-group">
                        <input type="email" placeholder="Email Address" required>
                    </div>
                    <div class="form-group">
                        <input type="password" placeholder="Password" required>
                    </div>
                    <button type="submit" class="btn btn-signup">Login</button>
                    <p class="modal-footer-text">Don't have an account? <a href="#" id="switchToSignup">Sign up</a></p>
                </form>
            `);
            
            // Remove visual feedback
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
            
            // Add event listener to the login form
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    // Simulate login process
                    showLoading();
                    setTimeout(() => {
                        hideLoading();
                        closeModal();
                        showToast('Login successful!');
                    }, 1500);
                });
            }
            
            // Switch to signup
            const switchToSignup = document.getElementById('switchToSignup');
            if (switchToSignup) {
                switchToSignup.addEventListener('click', function(e) {
                    e.preventDefault();
                    closeModal();
                    document.querySelector('.btn-signup').click();
                });
            }
        });
    }
    
    // Signup button functionality with enhanced animation
    const signupBtns = document.querySelectorAll('.btn-signup');
    signupBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add visual feedback
            this.classList.add('clicked');
            
            // Show a modal instead of an alert
            showModal('Create an Account', `
                <form id="signupForm">
                    <div class="form-group">
                        <input type="text" placeholder="Full Name" required>
                    </div>
                    <div class="form-group">
                        <input type="email" placeholder="Email Address" required>
                    </div>
                    <div class="form-group">
                        <input type="password" placeholder="Create Password" required>
                    </div>
                    <div class="form-group">
                        <select required>
                            <option value="" disabled selected>I am a...</option>
                            <option value="customer">Customer</option>
                            <option value="provider">Service Provider</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-signup">Sign Up</button>
                    <p class="modal-footer-text">Already have an account? <a href="#" id="switchToLogin">Login</a></p>
                </form>
            `);
            
            // Remove visual feedback
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
            
            // Add event listener to the signup form
            const signupForm = document.getElementById('signupForm');
            if (signupForm) {
                signupForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    // Simulate signup process
                    showLoading();
                    setTimeout(() => {
                        hideLoading();
                        closeModal();
                        showToast('Account created successfully!');
                    }, 1500);
                });
            }
            
            // Switch to login
            const switchToLogin = document.getElementById('switchToLogin');
            if (switchToLogin) {
                switchToLogin.addEventListener('click', function(e) {
                    e.preventDefault();
                    closeModal();
                    document.querySelector('.btn-login').click();
                });
            }
        });
    });
    
    // Signup prompt link with enhanced animation
    const signupPrompt = document.querySelector('.signup-prompt a');
    if (signupPrompt) {
        signupPrompt.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Trigger the main signup button
            const mainSignupBtn = document.querySelector('.btn-signup');
            if (mainSignupBtn) {
                mainSignupBtn.click();
            }
        });
    }
    
    // Helper function to show a modal
    function showModal(title, content) {
        // Remove any existing modal
        const existingModal = document.querySelector('.auth-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal elements
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        const modalContainer = document.createElement('div');
        modalContainer.className = 'auth-modal';
        
        modalContainer.innerHTML = `
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-content">
                ${content}
            </div>
        `;
        
        // Append to body
        modalOverlay.appendChild(modalContainer);
        document.body.appendChild(modalOverlay);
        
        // Add event listener to close button
        const closeBtn = modalContainer.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeModal);
        
        // Add event listener to overlay for closing
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        
        // Add CSS for the modal
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease-out;
            }
            
            .auth-modal {
                background-color: white;
                border-radius: 15px;
                width: 90%;
                max-width: 400px;
                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
                animation: fadeInUp 0.4s ease-out;
                overflow: hidden;
            }
            
            .modal-header {
                background-color: var(--primary-color);
                color: white;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h3 {
                margin: 0;
                font-size: 20px;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .modal-close:hover {
                transform: rotate(90deg);
            }
            
            .modal-content {
                padding: 30px;
                color: var(--primary-color);
            }
            
            .modal-content .form-group {
                margin-bottom: 20px;
            }
            
            .modal-content input, .modal-content select {
                width: 100%;
                padding: 14px 20px;
                border: 1px solid #ccc;
                border-radius: 50px;
                font-size: 16px;
                color: var(--primary-color);
                transition: all 0.3s;
            }
            
            .modal-content input:focus, .modal-content select:focus {
                outline: none;
                border-color: var(--accent-color);
                box-shadow: 0 0 0 3px rgba(120, 232, 145, 0.3);
            }
            
            .modal-content .btn {
                width: 100%;
                margin-top: 10px;
            }
            
            .modal-footer-text {
                text-align: center;
                margin-top: 20px;
                font-size: 14px;
            }
            
            .modal-footer-text a {
                color: var(--accent-color);
                font-weight: 600;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Loading animation */
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
            }
            
            .loading-spinner {
                width: 50px;
                height: 50px;
                border: 5px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: var(--accent-color);
                animation: spin 1s ease-in-out infinite;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            /* Toast notification */
            .toast {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background-color: var(--primary-color);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                z-index: 1001;
                animation: slideIn 0.3s ease-out, fadeOut 0.3s ease-out 2.7s forwards;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        
        document.head.appendChild(modalStyle);
        
        // Animate the appearance
        setTimeout(() => {
            modalOverlay.style.opacity = '1';
            modalContainer.style.transform = 'translateY(0)';
        }, 10);
    }
    
    // Helper function to close the modal
    function closeModal() {
        const modalOverlay = document.querySelector('.modal-overlay');
        if (modalOverlay) {
            modalOverlay.style.opacity = '0';
            setTimeout(() => {
                modalOverlay.remove();
            }, 300);
        }
    }
    
    // Helper function to show loading spinner
    function showLoading() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(loadingOverlay);
    }
    
    // Helper function to hide loading spinner
    function hideLoading() {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.remove();
        }
    }
    
    // Helper function to show toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
});