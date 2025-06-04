console.log('Find Vets page loaded (Leaflet/OSM + Overpass)');
let map, marker, vetMarkers = [];

function initMap(lat = 28.6139, lng = 77.2090) { // Default: New Delhi
  map = L.map('map').setView([lat, lng], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  marker = L.marker([lat, lng]).addTo(map).bindPopup('You are here!').openPopup();
  findVets(lat, lng);
}

function clearVetMarkers() {
  vetMarkers.forEach(m => map.removeLayer(m));
  vetMarkers = [];
}

function findVets(lat, lng) {
  clearVetMarkers();
  // Overpass QL: find all amenity=veterinary within 5km
  const query = `[out:json];node[amenity=veterinary](around:5000,${lat},${lng});out;`;
  fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: query,
    headers: { 'Content-Type': 'text/plain' }
  })
    .then(res => res.json())
    .then(data => {
      if (data.elements.length === 0) {
        alert('No vet clinics found nearby.');
        return;
      }
      data.elements.forEach(el => {
        const vetMarker = L.marker([el.lat, el.lon], {icon: L.icon({iconUrl: 'https://cdn-icons-png.flaticon.com/512/616/616408.png', iconSize: [32,32], iconAnchor: [16,32]})})
          .addTo(map)
          .bindPopup(`<b>${el.tags.name || 'Veterinary Clinic'}</b><br>${el.tags['addr:full'] || el.tags['addr:street'] || ''}`);
        vetMarkers.push(vetMarker);
      });
    });
}

function searchCity(city) {
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat), lng = parseFloat(data[0].lon);
        map.setView([lat, lng], 13);
        if (marker) map.removeLayer(marker);
        marker = L.marker([lat, lng]).addTo(map).bindPopup(`Searched location: ${city}`).openPopup();
        findVets(lat, lng);
      } else {
        alert('Location not found.');
      }
    });
}

document.getElementById('searchBtn').onclick = function() {
  const city = document.getElementById('cityInput').value;
  if (!city) return alert('Please enter a city or area.');
  searchCity(city);
};

document.getElementById('locateBtn').onclick = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude, lng = pos.coords.longitude;
      map.setView([lat, lng], 13);
      if (marker) map.removeLayer(marker);
      marker = L.marker([lat, lng]).addTo(map).bindPopup('Your Location').openPopup();
      findVets(lat, lng);
    }, () => alert('Could not get your location.'));
  } else {
    alert('Geolocation not supported.');
  }
};

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

document.addEventListener('DOMContentLoaded', () => setTimeout(() => initMap(), 500)); 