document.addEventListener('DOMContentLoaded', function () {
    // Carousel
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

    // Review Form
    document.getElementById('review-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const reviewText = this.querySelector('textarea').value;
        const reviewSummary = document.querySelector('.review-summary');
        const newReview = document.createElement('p');
        newReview.textContent = reviewText;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.classList.add('remove-review');
        newReview.appendChild(removeButton);
        reviewSummary.appendChild(newReview);
        this.reset();

        removeButton.addEventListener('click', () => {
            reviewSummary.removeChild(newReview);
        });
    });

    // Location Details
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

    // Language Selector
    const languageSelectorBtn = document.getElementById('language-selector-btn');
    const languageModal = document.getElementById('language-modal');
    const closeBtn = document.querySelector('.close-btn');

    languageSelectorBtn.addEventListener('click', () => {
        languageModal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        languageModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === languageModal) {
            languageModal.style.display = 'none';
        }
    });

    document.getElementById('english-btn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document.getElementById('french-btn').addEventListener('click', () => {
        window.location.href = 'index_fr.html';
    });
});
