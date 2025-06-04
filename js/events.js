// Function to fetch and render upcoming events
async function renderUpcomingEvents() {
    try {
        const response = await fetch('data/events.json');
        if (!response.ok) {
            throw new Error('Failed to fetch events data');
        }
        const events = await response.json();
        const eventsGrid = document.getElementById('eventsGrid');

        events.forEach(event => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300';
            card.setAttribute('data-aos', 'fade-up');

            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            card.innerHTML = `
                <div class="p-6">
                    <h3 class="text-2xl font-bold text-primary-dark mb-2">${event.title}</h3>
                    <div class="text-gray-600 mb-4">
                        <p class="mb-2"><i class="fas fa-calendar-alt mr-2"></i>${formattedDate}</p>
                        <p class="mb-2"><i class="fas fa-map-marker-alt mr-2"></i>${event.location}</p>
                        <p class="mb-4">${event.description}</p>
                    </div>
                    <a href="${event.link}" class="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full transition-colors duration-300">
                        Learn More
                    </a>
                </div>
            `;

            eventsGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error rendering upcoming events:', error);
        const eventsGrid = document.getElementById('eventsGrid');
        eventsGrid.innerHTML = `
            <div class="col-span-full text-center text-red-500">
                Failed to load upcoming events. Please try again later.
            </div>
        `;
    }
}

// Initialize AOS and render events when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true
    });
    renderUpcomingEvents();
}); 