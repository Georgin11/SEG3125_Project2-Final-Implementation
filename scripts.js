let currentIndex = 0;

const images = document.querySelectorAll('.carousel-images img, .carousel-video');
const totalImages = images.length;

document.querySelector('.carousel-control.prev').addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
    updateCarousel();
});

document.querySelector('.carousel-control.next').addEventListener('click', () => {
    currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
    updateCarousel();
});

function updateCarousel() {
    const offset = -currentIndex * 100;
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
}

document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const reviewText = this.querySelector('textarea').value;
    const reviewSummary = document.querySelector('.review-summary');
    const newReview = document.createElement('p');
    newReview.textContent = reviewText;
    reviewSummary.appendChild(newReview);
    this.reset();
});
