document.addEventListener("DOMContentLoaded", () => {

  // CAROUSEL SCRIPT
  let current = 0;
  const slides = document.querySelectorAll('.slide');

  function showSlide(index) {
    slides[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
  }

  function showNextSlide() {
    showSlide(current + 1);
  }

  function showPrevSlide() {
    showSlide(current - 1);
  }

  setInterval(showNextSlide, 5000);

  document.querySelector('.arrow-right').addEventListener('click', showNextSlide);
  document.querySelector('.arrow-left').addEventListener('click', showPrevSlide);

  slides[0].classList.add('active');

  // HAMBURGER MENU SCRIPT
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.main-nav');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

});