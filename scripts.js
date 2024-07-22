document.addEventListener('DOMContentLoaded', function() {
    // Carousel Controls
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

    // Language Modal
    const languageBtn = document.getElementById('language-btn');
    const languageModal = document.getElementById('language-modal');
    const closeBtn = document.querySelector('.close-btn');
    const englishBtn = document.getElementById('english-btn');
    const frenchBtn = document.getElementById('french-btn');

    languageBtn.addEventListener('click', function () {
        languageModal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', function () {
        languageModal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === languageModal) {
            languageModal.style.display = 'none';
        }
    });

    englishBtn.addEventListener('click', function () {
        languageModal.style.display = 'none';
        window.location.href = 'index.html'; // Redirect to the English version
    });

    frenchBtn.addEventListener('click', function () {
        languageModal.style.display = 'none';
        window.location.href = 'index_fr.html'; // Redirect to the French version
    });

    // Review Posting and Removal
    const reviewForm = document.getElementById('review-form');
    const reviewSummary = document.querySelector('.review-summary');

    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const textarea = reviewForm.querySelector('textarea');
        const reviewText = textarea.value;

        if (reviewText.trim() === "") return;

        const reviewParagraph = document.createElement('p');
        reviewParagraph.textContent = reviewText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        removeButton.classList.add('remove-review');
        removeButton.onclick = function() {
            reviewParagraph.remove();
        };

        reviewParagraph.appendChild(removeButton);
        reviewSummary.appendChild(reviewParagraph);
        textarea.value = "";
    });

    reviewSummary.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-review')) {
            event.target.parentElement.remove();
        }
    });

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        question.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Location Details (if applicable)
    const urlParams = new URLSearchParams(window.location.search);
    const location = urlParams.get('location');
    const locationData = {
        pickering: {
            name: 'Pickering',
            address: '401 & Liverpool',
            features: 'Multi-purpose 4 full courts & 1 half court: Basketball',
            map: 'https://www.google.com/maps/embed?...'
        },
        markham: {
            name: 'Markham',
            address: 'Main St & Hwy 7',
            features: 'Multi-purpose 3 full courts & 2 half courts: Basketball, Volleyball',
            map: 'https://www.google.com/maps/embed?...'
        },
        etobicoke: {
            name: 'Etobicoke',
            address: 'Dundas St & Kipling',
            features: 'Multi-purpose 2 full courts & 1 half court: Basketball, Dodgeball',
            map: 'https://www.google.com/maps/embed?...'
        },
        scarborough: {
            name: 'Scarborough',
            address: 'Kennedy Rd & Steeles',
            features: 'Multi-purpose 3 full courts & 1 half court: Basketball, Badminton',
            map: 'https://www.google.com/maps/embed?...'
        },
        oakville: {
            name: 'Oakville',
            address: 'Trafalgar Rd & QEW',
            features: 'Multi-purpose 2 full courts: Basketball, Volleyball',
            map: 'https://www.google.com/maps/embed?...'
        },
        mississauga: {
            name: 'Mississauga',
            address: 'Hurontario St & Hwy 403',
            features: 'Multi-purpose 3 full courts & 1 half court: Basketball, Soccer',
            map: 'https://www.google.com/maps/embed?...'
        }
    };

    if (locationData[location]) {
        document.getElementById('location-name').textContent = locationData[location].name;
        document.getElementById('location-address').textContent = locationData[location].address;
        document.getElementById('location-features').textContent = locationData[location].features;
        document.querySelector('.map iframe').src = locationData[location].map;
        document.getElementById('book-now-btn').href = `booking.html?location=${location}`;
    }

    const galleryImages = document.querySelectorAll('.gallery-image');
    const mainImage = document.getElementById('main-image');

    galleryImages.forEach(img => {
        img.addEventListener('click', function () {
            mainImage.src = this.src;
        });
    });

    // Populate schedule (dummy data)
    const scheduleTable = document.getElementById('schedule-table');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const times = ['8 AM - 10 AM', '10 AM - 12 PM', '12 PM - 2 PM', '2 PM - 4 PM', '4 PM - 6 PM', '6 PM - 8 PM', '8 PM - 10 PM'];

    days.forEach(day => {
        times.forEach(time => {
            const row = document.createElement('tr');
            const dayCell = document.createElement('td');
            const timeCell = document.createElement('td');
            dayCell.textContent = day;
            timeCell.textContent = time;
            row.appendChild(dayCell);
            row.appendChild(timeCell);
            scheduleTable.appendChild(row);
        });
    });
});
