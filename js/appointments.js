console.log('Appointments page loaded');
document.querySelector('form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Appointment booked! We will contact you soon.');
  this.reset();
}); 