console.log('Appointments page loaded');

// Mobile menu functionality
const menuButton = document.querySelector('.md\\:hidden');
const navLinks = document.querySelector('.hidden.md\\:flex');

menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
    navLinks.classList.toggle('flex');
    navLinks.classList.toggle('flex-col');
    navLinks.classList.toggle('absolute');
    navLinks.classList.toggle('top-full');
    navLinks.classList.toggle('left-0');
    navLinks.classList.toggle('right-0');
    navLinks.classList.toggle('bg-white');
    navLinks.classList.toggle('p-4');
    navLinks.classList.toggle('shadow-lg');
});

// Form handling
const appointmentForm = document.getElementById('appointmentForm');
const dateInput = document.querySelector('input[name="appointmentDate"]');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;

// Form validation and submission
appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const appointmentData = Object.fromEntries(formData.entries());
    
    // Validate date
    const selectedDate = new Date(appointmentData.appointmentDate);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    if (selectedDate < currentDate) {
        alert('Please select a future date for your appointment.');
        return;
    }
    
    // Validate time
    if (!appointmentData.appointmentTime) {
        alert('Please select a preferred time for your appointment.');
        return;
    }
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    successMessage.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span>Appointment booked successfully! We will contact you soon.</span>
        </div>
    `;
    document.body.appendChild(successMessage);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
    
    // Reset form
    this.reset();
    
    // Log appointment data (for development)
    console.log('Appointment booked:', appointmentData);
}); 