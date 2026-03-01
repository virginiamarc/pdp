document.addEventListener("DOMContentLoaded", () => {

  // CAROUSEL SCRIPT
  let current = 0;
  const slides = document.querySelectorAll('.slide');

  if (slides.length > 0) { //only run if slides exist
  
  function showSlide(index) {
    if (slides[current]) slides[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    if (slides[current]) slides[current].classList.add('active');
  }

  function showNextSlide() {
    showSlide(current + 1);
  }

  function showPrevSlide() {
    showSlide(current - 1);
  }

  setInterval(showNextSlide, 5000);

  const rightArrow = document.querySelector('.arrow-right');
  const leftArrow = document.querySelector('.arrow-left');

  if (rightArrow) rightArrow.addEventListener('click', showNextSlide);
  if (leftArrow) leftArrow.addEventListener('click', showPrevSlide);

  slides[0].classList.add('active');
}

  // HAMBURGER MENU SCRIPT
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.main-nav');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

});