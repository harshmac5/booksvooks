document.addEventListener('DOMContentLoaded', function() {
    // Toggle Password Visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            // Toggle the password field type
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle the eye icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    // Form Validation
    const authForm = document.querySelector('.auth-form');
    if (authForm) {
        authForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            
            // Simple email validation
            if (emailInput && !isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else if (emailInput) {
                removeError(emailInput);
            }
            
            // Password validation
            if (passwordInput && passwordInput.value.length < 6) {
                showError(passwordInput, 'Password must be at least 6 characters');
                isValid = false;
            } else if (passwordInput) {
                removeError(passwordInput);
            }
            
            // Additional validation for signup form
            const confirmPasswordInput = document.getElementById('confirm-password');
            if (confirmPasswordInput && passwordInput && confirmPasswordInput.value !== passwordInput.value) {
                showError(confirmPasswordInput, 'Passwords do not match');
                isValid = false;
            } else if (confirmPasswordInput) {
                removeError(confirmPasswordInput);
            }
            
            if (isValid) {
                // In a real application, this would submit the form to the server
                // For now, we'll just show a success message and redirect
                showNotification('Login successful! Redirecting...', 'success');
                
                // Simulate redirect after 2 seconds
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }
        });
    }
    
    // Tab Switching (for signup page)
    const authTabs = document.querySelectorAll('.auth-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (authTabs.length > 0 && tabContents.length > 0) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs and contents
                authTabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Helper Functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('p');
            errorElement.classList.add('error-message');
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.classList.add('error');
    }
    
    function removeError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.classList.remove('error');
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.classList.add('notification', `notification-${type}