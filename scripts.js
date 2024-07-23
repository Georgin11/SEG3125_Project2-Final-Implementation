document.addEventListener('DOMContentLoaded', function () {
    // Carousel functionality
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

    // Review form functionality
    document.getElementById('review-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const reviewText = this.querySelector('textarea').value;
        const reviewSummary = document.querySelector('.review-summary');
        const newReview = document.createElement('p');

        // Create the review text node
        const reviewTextNode = document.createTextNode(reviewText);

        // Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.classList.add('remove-review');
        deleteButton.addEventListener('click', function() {
            reviewSummary.removeChild(newReview);
        });

        // Append the text node and delete button to the review paragraph
        newReview.appendChild(reviewTextNode);
        newReview.appendChild(deleteButton);

        // Append the new review paragraph to the review summary
        reviewSummary.appendChild(newReview);

        // Reset the form
        this.reset();
    });

    // Location details functionality
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

    // Image gallery functionality similar to the carousel
    let currentImageIndex = 0;
    const galleryImages = document.querySelectorAll('.gallery-image');
    const mainImage = document.getElementById('main-image');
    const totalGalleryImages = galleryImages.length;

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function () {
            currentImageIndex = index;
            updateGallery();
        });
    });

    function updateGallery() {
        const offset = -currentImageIndex * 100;
        mainImage.style.transform = `translateX(${offset}%)`;
        mainImage.src = galleryImages[currentImageIndex].src;
    }

    // Date and Time Dropdowns
    const dateSelect = document.getElementById('date-select');
    const timeSelect = document.getElementById('time-select');

    // Function to populate dates
    function populateDates() {
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            const option = document.createElement('option');
            option.value = date.toISOString().split('T')[0];
            option.textContent = date.toDateString();
            dateSelect.appendChild(option);
        }
    }

    // Function to populate times based on selected date
    function populateTimes(selectedDate) {
        const times = [
            '8 AM - 10 AM',
            '10 AM - 12 PM',
            '12 PM - 2 PM',
            '2 PM - 4 PM',
            '4 PM - 6 PM',
            '6 PM - 8 PM',
            '8 PM - 10 PM'
        ];

        // Example of graying out times for a specific date (e.g., today's date)
        const disabledTimes = selectedDate === new Date().toISOString().split('T')[0] ? ['10 AM - 12 PM', '4 PM - 6 PM'] : [];

        // Clear existing options
        timeSelect.innerHTML = '';

        times.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            if (disabledTimes.includes(time)) {
                option.disabled = true;
                option.style.color = 'gray';
            }
            timeSelect.appendChild(option);
        });
    }

    // Event listener for date selection
    dateSelect.addEventListener('change', function () {
        populateTimes(this.value);
    });

    // Initial population
    populateDates();
    populateTimes(dateSelect.value);

    // Form submission event
    document.getElementById('booking-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        alert(`Your booking request has been emailed to ${email}`);
        this.reset();
    });
    
});
