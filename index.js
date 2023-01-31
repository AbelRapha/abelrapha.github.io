var slides = document.getElementsByClassName("slide");
var currentSlide = 0;
var prevBtn = document.querySelector("#prevBtn");
var nextBtn = document.querySelector("#nextBtn");

prevBtn.addEventListener("click", function() {
slides[currentSlide].classList.remove("active-slide");
currentSlide = (currentSlide - 1 + slides.length) % slides.length;
slides[currentSlide].classList.add("active-slide");
});

nextBtn.addEventListener("click", function() {
slides[currentSlide].classList.remove("active-slide");
currentSlide = (currentSlide + 1) % slides.length;
slides[currentSlide].classList.add("active-slide");
});