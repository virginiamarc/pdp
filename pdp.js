function openForm() {
  alert("Volunteer sign-up form coming soon!");
}

// CAROUSEL SCRIPT
let current = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  slides[current].classList.remove('active');
  current = (index + slides.length) % slides.length; // wrap around
  slides[current].classList.add('active');
}

function showNextSlide() {
  showSlide(current + 1);
}

function showPrevSlide() {
  showSlide(current - 1);
}

// Auto-rotate
setInterval(showNextSlide, 5000);

// Arrow controls
document.querySelector('.arrow-right').addEventListener('click', showNextSlide);
document.querySelector('.arrow-left').addEventListener('click', showPrevSlide);

// Initialize
slides[0].classList.add('active');