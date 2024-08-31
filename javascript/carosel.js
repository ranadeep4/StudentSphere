const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const carouselSlides = document.querySelector('.carousel-slides');
const slides = document.querySelectorAll('.carousel-slide');

let index = 0;
const totalSlides = slides.length;

function showSlide(i) {
    if (i >= totalSlides) {
        index = 0;
    } else if (i < 0) {
        index = totalSlides - 1;
    } else {
        index = i;
    }
    carouselSlides.style.transform = `translateX(-${index * 100}%)`;
}

prevButton.addEventListener('click', () => {
    showSlide(index - 1);
});

nextButton.addEventListener('click', () => {
    showSlide(index + 1);
});

let slideInterval = setInterval(() => {
    showSlide(index + 1);
}, 2000);

// Optional: Clear and reset interval on manual navigation
prevButton.addEventListener('click', () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        showSlide(index + 1);
    }, 2000);
});

nextButton.addEventListener('click', () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        showSlide(index + 1);
    }, 2000);
});
