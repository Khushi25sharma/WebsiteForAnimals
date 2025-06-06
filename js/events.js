// Function to fetch and render upcoming events
async function renderUpcomingEvents() {
    console.log('Attempting to render upcoming events...');
    try {
        console.log('Fetching data from data/events.json...');
        const response = await fetch('data/events.json');
        if (!response.ok) {
            console.error('HTTP error! status:', response.status);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Fetch successful. Parsing JSON...');
        const events = await response.json();
        console.log('JSON parsed successfully:', events);

        const eventsGrid = document.getElementById('eventsGrid');
        if (!eventsGrid) {
            console.error('Error: eventsGrid element not found!');
            return;
        }
        console.log('eventsGrid element found.');

        if (events.length === 0) {
            eventsGrid.innerHTML = `
                <div class="col-span-full text-center text-gray-600">
                    No upcoming events found at this time.
                </div>
            `;
            console.log('No events found in data/events.json.');
            return;
        }

        eventsGrid.innerHTML = ''; // Clear loading message
        console.log('Rendering events...');

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
                    <a href="event-detail.html?id=${event.id}" class="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full transition-colors duration-300">
                        Learn More
                    </a>
                </div>
            `;

            eventsGrid.appendChild(card);
            console.log(`Rendered event: ${event.title}`);
        });

        console.log('Finished rendering events.');
    } catch (error) {
        console.error('Error rendering upcoming events:', error);
        const eventsGrid = document.getElementById('eventsGrid');
        if (eventsGrid) {
            eventsGrid.innerHTML = `
                <div class="col-span-full text-center text-red-500">
                    Failed to load upcoming events. Please try again later.<br>Error: ${error.message}
                </div>
            `;
        } else {
            console.error('Could not display error message because eventsGrid element was not found.');
        }
    }
}

// Initialize AOS and render events when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded in events.js');
    // Check if AOS is defined before initializing
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
        console.log('AOS initialized.');
    } else {
        console.warn('AOS library not loaded. Skipping AOS initialization.');
    }
    renderUpcomingEvents();
});

console.log('events.js script loaded'); 