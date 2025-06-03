console.log('Donate page loaded');
document.querySelector('form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for your donation!');
  this.reset();
}); 