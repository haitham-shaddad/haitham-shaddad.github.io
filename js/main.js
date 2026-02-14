// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('hamburger');

    if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
        mobileMenu.classList.add('active');
        hamburger.innerHTML = '<i class="fas fa-times"></i>';
    }
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const mobileMenu = document.getElementById('mobile-menu');
            const hamburger = document.getElementById('hamburger');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                if (hamburger) {
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Scroll Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Active Navigation Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    let started = false;

    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                started = true;
                stats.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    const increment = target / 50;
                    let current = 0;

                    const updateCount = () => {
                        if (current < target) {
                            current += increment;
                            stat.textContent = Math.ceil(current) + (stat.getAttribute('data-suffix') || '');
                            setTimeout(updateCount, 30);
                        } else {
                            stat.textContent = target + (stat.getAttribute('data-suffix') || '');
                        }
                    };
                    updateCount();
                });
            }
        });
    });

    stats.forEach(stat => statsObserver.observe(stat));
});

// Smooth scroll to anchor
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
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

// Form Validation (for contact page)
function validateForm(event) {
    event.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;

    // Reset errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());

    // Validate name
    if (name && name.value.trim() === '') {
        showError(name, 'Name is required');
        isValid = false;
    }

    // Validate email
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        }
    }

    // Validate message
    if (message && message.value.trim() === '') {
        showError(message, 'Message is required');
        isValid = false;
    }

    if (isValid) {
        // In a real application, you would send the form data to a server
        alert('Thank you for your message! We will get back to you soon.');
        event.target.reset();
    }

    return false;
}

function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error-message text-red-600 text-sm mt-1';
    error.textContent = message;
    input.parentElement.appendChild(error);
    input.classList.add('border-red-500');
}
