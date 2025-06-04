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

// Function to render adoption listings
function renderAdoptionListings(animals) {
    const adoptionGrid = document.getElementById('adoptionGrid');
    if (!adoptionGrid) {
        console.error('Adoption grid element not found');
        return;
    }

    adoptionGrid.innerHTML = ''; // Clear existing content

    animals.forEach(animal => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300';
        card.setAttribute('data-aos', 'fade-up');

        card.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}" class="w-full h-64 object-cover">
            <div class="p-6">
                <h3 class="text-2xl font-bold text-primary-dark mb-2">${animal.name}</h3>
                <p class="text-gray-600 mb-4">${animal.description}</p>
                <div class="flex justify-between items-center">
                    <div class="text-sm text-gray-500">
                        <span class="block">${animal.species}</span>
                        <span class="block">${animal.age} years old</span>
                        <span class="block">${animal.gender}</span>
                    </div>
                    <button class="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full transition-colors duration-300">
                        Adopt Me
                    </button>
                </div>
            </div>
        `;

        adoptionGrid.appendChild(card);
    });
}

// Function to fetch and render adoption listings
async function loadAdoptionListings() {
    try {
        const response = await fetch('https://khushi25sharma.github.io/WebsiteForAnimals/data/adoption.json');
        if (!response.ok) {
            throw new Error('Failed to fetch adoption data');
        }
        const animals = await response.json();
        renderAdoptionListings(animals);
    } catch (error) {
        console.error('Error loading adoption listings:', error);
        const adoptionGrid = document.getElementById('adoptionGrid');
        if (adoptionGrid) {
            adoptionGrid.innerHTML = `
                <div class="text-center text-red-600">
                    <p>Failed to load adoption listings. Please try again later.</p>
                </div>
            `;
        }
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