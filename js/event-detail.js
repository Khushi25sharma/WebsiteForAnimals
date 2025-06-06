document.addEventListener('DOMContentLoaded', async () => {
    console.log('Event detail page loaded.');

    // Function to get event ID from URL
    const getEventIdFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    };

    const eventId = getEventIdFromUrl();
    console.log('Event ID from URL:', eventId);

    const eventDetailTitle = document.getElementById('eventDetailTitle');
    const eventDetailDateLocation = document.getElementById('eventDetailDateLocation');
    const eventDetailContent = document.getElementById('eventDetailContent');

    const fullDescriptionSection = document.getElementById('fullDescriptionSection');
    const fullDescriptionText = document.getElementById('fullDescriptionText');

    const scheduleSection = document.getElementById('scheduleSection');
    const scheduleList = document.getElementById('scheduleList');

    const speakersSection = document.getElementById('speakersSection');
    const speakersList = document.getElementById('speakersList');

    const mediaSection = document.getElementById('mediaSection');
    const mediaGallery = document.getElementById('mediaGallery');

    const registrationSection = document.getElementById('registrationSection');
    const registrationDetails = document.getElementById('registrationDetails');

    const contactSection = document.getElementById('contactSection');
    const contactDetails = document.getElementById('contactDetails');


    if (!eventId) {
        console.error('No event ID found in URL.');
        eventDetailTitle.textContent = 'Event Not Found';
        eventDetailContent.innerHTML = '<p class="text-center text-red-500">No event specified.</p>';
        eventDetailDateLocation.textContent = '';
        return;
    }

    try {
        console.log('Fetching data from data/events.json...');
        const response = await fetch('data/events.json');
        if (!response.ok) {
            console.error('HTTP error! status:', response.status);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const events = await response.json();
        console.log('Events data fetched:', events);

        const event = events.find(e => e.id === eventId);

        if (!event) {
            console.error(`Event with ID ${eventId} not found.`);
            eventDetailTitle.textContent = 'Event Not Found';
            eventDetailContent.innerHTML = '<p class="text-center text-red-500">The requested event could not be found.</p>';
            eventDetailDateLocation.textContent = '';
            return;
        }

        console.log('Event found:', event);

        // Format date
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Populate basic details
        eventDetailTitle.textContent = event.title;
        eventDetailDateLocation.innerHTML = `
            <p class="mb-1"><i class="fas fa-calendar-alt mr-2"></i>${formattedDate}</p>
            <p><i class="fas fa-map-marker-alt mr-2"></i>${event.location}</p>
        `;
        eventDetailContent.innerHTML = ''; // Clear initial loading message

        // Populate Full Description
        if (event.fullDescription) {
            fullDescriptionText.textContent = event.fullDescription;
            fullDescriptionSection.classList.remove('hidden');
        } else {
             fullDescriptionSection.classList.add('hidden');
        }

        // Populate Schedule
        if (event.schedule && event.schedule.length > 0) {
            scheduleList.innerHTML = event.schedule.map(item => `<li>${item.time}: ${item.activity}</li>`).join('');
            scheduleSection.classList.remove('hidden');
        } else {
            scheduleSection.classList.add('hidden');
        }

        // Populate Speakers
        if (event.speakers && event.speakers.length > 0) {
             speakersList.innerHTML = event.speakers.map(speaker => `
                <div class="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg">
                    ${speaker.photo ? `<img src="${speaker.photo}" alt="${speaker.name}" class="w-16 h-16 rounded-full object-cover">` : ''}
                    <div>
                        <h4 class="font-bold">${speaker.name}</h4>
                        <p class="text-sm text-gray-600">${speaker.bio}</p>
                    </div>
                </div>
            `).join('');
            speakersSection.classList.remove('hidden');
        } else {
            speakersSection.classList.add('hidden');
        }

        // Populate Media
        if (event.media && event.media.length > 0) {
             mediaGallery.innerHTML = event.media.map(item => {
                if (item.endsWith('.jpg') || item.endsWith('.png') || item.endsWith('.gif')) {
                    return `<img src="${item}" alt="Event Media" class="rounded-lg object-cover w-full">`;
                } else if (item.endsWith('.mp4') || item.endsWith('.webm')) {
                    return `
                        <video controls class="rounded-lg w-full">
                            <source src="${item}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    `;
                } else {
                    return ''; // Or handle other media types
                }
            }).join('');
            mediaSection.classList.remove('hidden');
        } else {
            mediaSection.classList.add('hidden');
        }

        // Populate Registration
        if (event.registration) {
            let regHtml = '';
            if (event.registration.required) {
                regHtml += '<p>Registration is required.</p>';
                if (event.registration.link) {
                    regHtml += `<p><a href="${event.registration.link}" class="text-blue-500 hover:underline">Register Here</a></p>`;
                }
            } else {
                 regHtml += '<p>Registration is not required.</p>';
            }
             registrationDetails.innerHTML = regHtml;
            registrationSection.classList.remove('hidden');
        } else {
            registrationSection.classList.add('hidden');
        }

        // Populate Contact
        if (event.contact) {
             let contactHtml = '';
             if (event.contact.email) {
                contactHtml += `<p><i class="fas fa-envelope mr-2"></i> Email: <a href="mailto:${event.contact.email}" class="text-blue-500 hover:underline">${event.contact.email}</a></p>`;
             }
             if (event.contact.phone) {
                contactHtml += `<p><i class="fas fa-phone mr-2"></i> Phone: <a href="tel:${event.contact.phone}" class="text-blue-500 hover:underline">${event.contact.phone}</a></p>`;
             }
             if (contactHtml) {
                 contactDetails.innerHTML = contactHtml;
                 contactSection.classList.remove('hidden');
             } else {
                 contactSection.classList.add('hidden');
             }
        } else {
            contactSection.classList.add('hidden');
        }


        console.log('Event details rendered.');

    } catch (error) {
        console.error('Error loading event details:', error);
        eventDetailTitle.textContent = 'Error';
        eventDetailContent.innerHTML = `<p class="text-center text-red-500">Failed to load event details. Error: ${error.message}</p>`;
        eventDetailDateLocation.textContent = '';

         // Hide all sections on error
         fullDescriptionSection.classList.add('hidden');
         scheduleSection.classList.add('hidden');
         speakersSection.classList.add('hidden');
         mediaSection.classList.add('hidden');
         registrationSection.classList.add('hidden');
         contactSection.classList.add('hidden');

    }
});

console.log('event-detail.js script loaded'); 