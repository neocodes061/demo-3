document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const course = document.getElementById('course').value;
            const phone = document.getElementById('phone').value;

            // WhatsApp Message Formatting
            const businessNumber = "919876543210"; 
            const message = `Hello BrightPath NEET Academy, I would like to book a counseling session.%0A%0A*Name:* ${name}%0A*Course:* ${course}%0A*Phone:* ${phone}`;

            // Redirect to WhatsApp
            window.open(`https://wa.me/${businessNumber}?text=${message}`, '_blank');
            
            // Optional: Show success message on page
            contactForm.innerHTML = "<h3>Inquiry Sent! Redirecting to WhatsApp...</h3>";
        });
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
});