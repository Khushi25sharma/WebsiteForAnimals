console.log('Homepage loaded');
document.querySelectorAll('.quick-link').forEach(link => {
  link.addEventListener('mouseenter', () => link.classList.add('scale-105'));
  link.addEventListener('mouseleave', () => link.classList.remove('scale-105'));
}); 