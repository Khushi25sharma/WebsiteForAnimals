console.log('Emergency page loaded');
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    link.style.background = '#ffe6e6';
    setTimeout(() => link.style.background = '', 1000);
  });
}); 