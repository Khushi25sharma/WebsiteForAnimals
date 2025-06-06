// Function to fetch and render volunteer vets
async function renderVolunteerVets() {
    try {
        const response = await fetch('data/vets.json');
        if (!response.ok) {
            throw new Error('Failed to fetch vets data');
        }
        const vets = await response.json();
        const vetsGrid = document.getElementById('vetsGrid');
        
        // Create a document fragment to hold all cards
        const fragment = document.createDocumentFragment();
        
        vets.forEach((vet, index) => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', `${index * 100}`); // Stagger the animations

            // Add specific styling for the second image
            const imageClass = index === 1 ? 'w-full h-64 object-cover object-[center_30%]' : 'w-full h-64 object-cover';

            card.innerHTML = `
                <img src="${vet.photo}" alt="${vet.name}" class="${imageClass}">
                <div class="p-6">
                    <h3 class="text-2xl font-bold text-primary-dark mb-2">${vet.name}</h3>
                    <p class="text-gray-600 mb-4">${vet.role}</p>
                    <div class="flex justify-between items-center">
                        <div class="text-sm text-gray-500">
                            <span class="block"><i class="fas fa-envelope mr-2"></i>${vet.contact}</span>
                            <span class="block ${vet.availabilityStatus === 'Available' ? 'text-green-500' : 'text-red-500'}">
                                <i class="fas fa-circle mr-2"></i>${vet.availabilityStatus}
                            </span>
                        </div>
                        <button class="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full transition-colors duration-300 ${vet.availabilityStatus !== 'Available' ? 'opacity-50 cursor-not-allowed' : ''}" ${vet.availabilityStatus !== 'Available' ? 'disabled' : ''}>
                            Contact
                        </button>
                    </div>
                </div>
            `;

            fragment.appendChild(card);
        });

        // Add all cards at once
        vetsGrid.appendChild(fragment);
    } catch (error) {
        console.error('Error rendering volunteer vets:', error);
        const vetsGrid = document.getElementById('vetsGrid');
        vetsGrid.innerHTML = `
            <div class="col-span-full text-center text-red-500">
                Failed to load volunteer vets. Please try again later.
            </div>
        `;
    }
}

// Initialize AOS and render vets when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100 // Start animation slightly before element comes into view
    });
    renderVolunteerVets();
}); 