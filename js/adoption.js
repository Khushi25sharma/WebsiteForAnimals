console.log('Adoption page loaded');
document.querySelectorAll('.card-hover button').forEach(btn => {
  btn.addEventListener('click', () => alert('Contact us to learn more about this pet!'));
}); 