console.log('Shop page loaded');
document.querySelectorAll('.card-hover button').forEach(btn => {
  btn.addEventListener('click', () => alert('Added to cart (demo only)!'));
}); 