console.log('Adoption page loaded');
document.querySelectorAll('.card-hover button').forEach(btn => {
  btn.addEventListener('click', () => alert('Contact us to learn more about this pet!'));
});

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

// Function to fetch and render adoption listings
async function loadAdoptionListings() {
    try {
        const response = await fetch('data/adoption.json');
        if (!response.ok) {
            throw new Error('Failed to fetch adoption data');
        }
        const animals = await response.json();
        renderAdoptionListings(animals);
    } catch (error) {
        console.error('Error loading adoption listings:', error);
        document.getElementById('adoption-listings').innerHTML = `
            <div class="text-center text-red-600">
                <p>Failed to load adoption listings. Please try again later.</p>
            </div>
        `;
    }
}

// Initialize AOS and render listings when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true
    });
    loadAdoptionListings();
}); 