document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // Validation patterns
        const patterns = {
            name: /^[a-z\s]{2,}$/i,
            phone: /^(\+91|91)?[6-9]\d{9}$/
        };

        // Real-time validation for name
        const nameInput = document.getElementById('name');
        if (nameInput) {
            nameInput.addEventListener('input', validateName);
            nameInput.addEventListener('blur', validateName);
        }

        // Real-time validation for phone
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9+]/g, ''); // Allow only numbers and +
                validatePhone();
            });
            phoneInput.addEventListener('blur', validatePhone);
        }

        // Form submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate all fields
            if (!validateName() || !validatePhone()) {
                return;
            }

            // Get form values
            const name = document.getElementById('name').value.trim();
            const course = document.getElementById('course').value;
            const phone = document.getElementById('phone').value.trim();

            // Format phone number to +91 format
            const formattedPhone = formatPhoneNumber(phone);

            // WhatsApp Message Formatting
            const businessNumber = "918456193640"; 
            const message = `Hello BrightPath NEET Academy, I would like to book a counseling session.%0A%0A*Student Name:* ${encodeURIComponent(name)}%0A*Course Interest:* ${encodeURIComponent(course)}%0A*Contact Number:* ${formattedPhone}`;

            // Redirect to WhatsApp
            window.open(`https://wa.me/${businessNumber}?text=${message}`, '_blank');
            
            // Show success message
            showSuccessMessage();
            
            // Reset form after 1 second
            setTimeout(() => {
                contactForm.reset();
                clearValidationStates();
            }, 1000);
        });

        // Validation Functions
        function validateName() {
            const name = nameInput.value.trim();
            const errorContainer = nameInput.nextElementSibling;
            
            if (!name) {
                showError(nameInput, errorContainer, '👤 Please enter your full name');
                return false;
            }
            
            if (name.length < 2) {
                showError(nameInput, errorContainer, '👤 Name must be at least 2 characters');
                return false;
            }
            
            if (!patterns.name.test(name)) {
                showError(nameInput, errorContainer, '👤 Name should only contain letters and spaces');
                return false;
            }

            clearError(nameInput, errorContainer);
            return true;
        }

        function validatePhone() {
            const phone = phoneInput.value.replace(/[-\s]/g, '');
            const errorContainer = phoneInput.nextElementSibling;
            
            if (!phone) {
                showError(phoneInput, errorContainer, '📱 Please enter your phone number');
                return false;
            }

            // Remove leading zeros and country code if present
            const cleanPhone = phone.replace(/^(\+91|91)?/, '');
            
            if (cleanPhone.length !== 10) {
                showError(phoneInput, errorContainer, '📱 Phone number must be 10 digits');
                return false;
            }
            
            if (!patterns.phone.test(phone)) {
                showError(phoneInput, errorContainer, '📱 Please enter a valid Indian phone number (+91)');
                return false;
            }

            clearError(phoneInput, errorContainer);
            return true;
        }

        function formatPhoneNumber(phone) {
            let formatted = phone.replace(/[^0-9]/g, '');
            
            // Remove if already has country code
            if (formatted.startsWith('91')) {
                formatted = formatted.substring(2);
            }
            
            // Add +91 prefix
            return '+91' + formatted;
        }

        function showError(input, container, message) {
            input.classList.add('error');
            if (container && container.classList.contains('error-message')) {
                container.innerHTML = message;
                container.style.display = 'block';
            } else {
                // Create error message if doesn't exist
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.innerHTML = message;
                input.parentNode.insertBefore(errorDiv, input.nextSibling);
            }
        }

        function clearError(input, container) {
            input.classList.remove('error');
            if (container && container.classList.contains('error-message')) {
                container.style.display = 'none';
            }
        }

        function clearValidationStates() {
            nameInput.classList.remove('error');
            phoneInput.classList.remove('error');
            const errors = contactForm.querySelectorAll('.error-message');
            errors.forEach(err => {
                err.style.display = 'none';
            });
        }

        function showSuccessMessage() {
            const originalHTML = contactForm.innerHTML;
            contactForm.innerHTML = '<div style="text-align:center; padding: 30px;"><h3 style="color: var(--success); margin-bottom: 10px;">✅ Inquiry Sent Successfully!</h3><p style="color: var(--text-light); margin-bottom: 15px;">Redirecting to WhatsApp...</p></div>';
            setTimeout(() => {
                contactForm.innerHTML = originalHTML;
                attachEventListeners();
            }, 3000);
        }

        function attachEventListeners() {
            const nameInputNew = document.getElementById('name');
            const phoneInputNew = document.getElementById('phone');
            if (nameInputNew) {
                nameInputNew.addEventListener('input', validateName);
                nameInputNew.addEventListener('blur', validateName);
            }
            if (phoneInputNew) {
                phoneInputNew.addEventListener('input', function() {
                    this.value = this.value.replace(/[^0-9+]/g, '');
                    validatePhone();
                });
                phoneInputNew.addEventListener('blur', validatePhone);
            }
        }
    }

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('is-active');
            navLinks.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isActive);
        });

        // Close menu when a link is clicked (good for single-page nav)
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                hamburger.classList.remove('is-active');
                navLinks.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close mobile menu when resizing to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('is-active');
                navLinks.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });

        // Close when clicking outside the nav container
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                hamburger.classList.remove('is-active');
                navLinks.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});