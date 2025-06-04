console.log('Homepage loaded');

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

document.querySelectorAll('.quick-link').forEach(link => {
  link.addEventListener('mouseenter', () => link.classList.add('scale-105'));
  link.addEventListener('mouseleave', () => link.classList.remove('scale-105'));
}); 