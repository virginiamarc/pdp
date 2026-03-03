document.addEventListener("DOMContentLoaded", () => {
  // HAMBURGER MENU SCRIPT
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.main-nav');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }
});