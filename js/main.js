// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('.md\\:hidden');
const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-6 z-50';
mobileMenu.innerHTML = `
    <div class="flex justify-between items-center mb-8">
        <span class="text-2xl font-display font-bold text-primary-dark">Menu</span>
        <button class="close-menu text-gray-700">
            <i class="fas fa-times text-2xl"></i>
        </button>
    </div>
    <nav class="flex flex-col space-y-4">
        <a href="#about" class="text-gray-700 hover:text-primary-dark transition">About</a>
        <a href="#adoption" class="text-gray-700 hover:text-primary-dark transition">Adoption</a>
        <a href="#appointments" class="text-gray-700 hover:text-primary-dark transition">Appointments</a>
        <a href="#shop" class="text-gray-700 hover:text-primary-dark transition">Shop</a>
        <a href="#contact" class="text-gray-700 hover:text-primary-dark transition">Contact</a>
    </nav>
`;
document.body.appendChild(mobileMenu);

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

mobileMenu.querySelector('.close-menu').addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
        }
    });
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Form Validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        let isValid = true;
        form.querySelectorAll('input[required], select[required], textarea[required]').forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('border-red-500');
            } else {
                field.classList.remove('border-red-500');
            }
        });

        if (isValid) {
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<div class="spinner"></div>';
            submitButton.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                form.reset();
                // Show success message
                alert('Form submitted successfully!');
            }, 1500);
        }
    });
});

// Video Background Fallback
const videoBackground = document.querySelector('video');
if (videoBackground) {
    videoBackground.addEventListener('error', () => {
        videoBackground.parentElement.classList.add('video-background');
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// Emergency Contact Bar
const emergencyBar = document.querySelector('.bg-red-600');
if (emergencyBar) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll) {
            emergencyBar.style.transform = 'translateY(-100%)';
        } else {
            emergencyBar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });
}

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
}); 