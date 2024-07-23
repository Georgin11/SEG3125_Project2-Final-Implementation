document.addEventListener('DOMContentLoaded', function () {
    initializeDateAndTimeDropdowns();
    initializeFormSubmission();
    initializeImageGallery();
    updateLocationDetails();
});

function initializeDateAndTimeDropdowns() {
    const dateSelect = document.getElementById('date-select');
    const timeSelect = document.getElementById('time-select');

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

        const disabledTimes = selectedDate === new Date().toISOString().split('T')[0] ? ['10 AM - 12 PM', '4 PM - 6 PM'] : [];
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

    dateSelect.addEventListener('change', function () {
        populateTimes(this.value);
    });

    populateDates();
    populateTimes(dateSelect.value);
}

function initializeFormSubmission() {
    document.getElementById('booking-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        alert(`Your booking request has been emailed to ${email}`);
        this.reset();
    });
}

function initializeImageGallery() {
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
        mainImage.src = galleryImages[currentImageIndex].src;
    }
}

function updateLocationDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const location = urlParams.get('location');
    const locationData = {
        pickering: {
            name: 'Pickering',
            address: '401 & Liverpool',
            features: 'Multi-purpose 4 full courts & 1 half court: Basketball',
            map: 'https://www.google.com/maps/embed?...',
            defaultImage: 'assets/pickering_.jpg'
        },
        markham: {
            name: 'Markham',
            address: 'Main St & Hwy 7',
            features: 'Multi-purpose 3 full courts & 2 half courts: Basketball, Volleyball',
            map: 'https://www.google.com/maps/embed?...',
            defaultImage: 'assets/markham_.jpg'
        },
        etobicoke: {
            name: 'Etobicoke',
            address: 'Dundas St & Kipling',
            features: 'Multi-purpose 2 full courts & 1 half court: Basketball, Dodgeball',
            map: 'https://www.google.com/maps/embed?...',
            defaultImage: 'assets/etobicoke_.jpg'
        },
        scarborough: {
            name: 'Scarborough',
            address: 'Kennedy Rd & Steeles',
            features: 'Multi-purpose 3 full courts & 1 half court: Basketball, Badminton',
            map: 'https://www.google.com/maps/embed?...',
            defaultImage: 'assets/scarborough_.jpg'
        },
        oakville: {
            name: 'Oakville',
            address: 'Trafalgar Rd & QEW',
            features: 'Multi-purpose 2 full courts: Basketball, Volleyball',
            map: 'https://www.google.com/maps/embed?...',
            defaultImage: 'assets/oakville_.jpg'
        },
        mississauga: {
            name: 'Mississauga',
            address: 'Hurontario St & Hwy 403',
            features: 'Multi-purpose 3 full courts & 1 half court: Basketball, Soccer',
            map: 'https://www.google.com/maps/embed?...',
            defaultImage: 'assets/mississauga_.jpg'
        }
    };

    if (locationData[location]) {
        document.getElementById('location-name').textContent = locationData[location].name;
        document.getElementById('location-address').textContent = locationData[location].address;
        document.getElementById('location-features').textContent = locationData[location].features;
        document.querySelector('.map iframe').src = locationData[location].map;
        document.getElementById('main-image').src = locationData[location].defaultImage;
        document.getElementById('book-now-btn').href = `booking.html?location=${location}`;
    }
}
