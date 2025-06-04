console.log('Shop page loaded');
document.querySelectorAll('.card-hover button').forEach(btn => {
  btn.addEventListener('click', () => alert('Added to cart (demo only)!'));
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

// Function to fetch and render shop items
async function renderShopItems() {
    try {
        const response = await fetch('data/shop.json');
        if (!response.ok) {
            throw new Error('Failed to fetch shop data');
        }
        const products = await response.json();
        const shopGrid = document.getElementById('shopGrid');

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300';
            card.setAttribute('data-aos', 'fade-up');

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
                <div class="p-6">
                    <h3 class="text-2xl font-bold text-primary-dark mb-2">${product.name}</h3>
                    <p class="text-gray-600 mb-4">${product.description}</p>
                    <div class="flex justify-between items-center">
                        <div class="text-sm text-gray-500">
                            <span class="block">${product.category}</span>
                            <span class="block">$${product.price}</span>
                            <span class="block ${product.availability ? 'text-green-500' : 'text-red-500'}">
                                ${product.availability ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>
                        <button class="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full transition-colors duration-300 ${!product.availability ? 'opacity-50 cursor-not-allowed' : ''}" ${!product.availability ? 'disabled' : ''}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;

            shopGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error rendering shop items:', error);
        const shopGrid = document.getElementById('shopGrid');
        shopGrid.innerHTML = `
            <div class="col-span-full text-center text-red-500">
                Failed to load shop items. Please try again later.
            </div>
        `;
    }
}

// Initialize AOS and render items when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true
    });
    renderShopItems();
}); 