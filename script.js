// ===== JAVED TRAVEL - Main JavaScript =====

const airlines = [
    { code: 'PK', name: 'PIA', fullName: 'Pakistan International Airlines', tag: 'tag-pia' },
    { code: 'PA', name: 'Airblue', fullName: 'Airblue', tag: 'tag-airblue' },
    { code: 'ER', name: 'SereneAir', fullName: 'Serene Air', tag: 'tag-serene' },
    { code: 'PF', name: 'AirSial', fullName: 'Air Sial', tag: 'tag-airsial' },
    { code: '9P', name: 'Fly Jinnah', fullName: 'Fly Jinnah', tag: 'tag-flyjinnah' }
];

const cities = [
    'Karachi', 'Lahore', 'Islamabad', 'Peshawar', 'Quetta',
    'Multan', 'Faisalabad', 'Sialkot', 'Rahim Yar Khan',
    'Bahawalpur', 'Sukkur', 'Turbat', 'Gwadar', 'Gilgit',
    'Skardu', 'Chitral', 'Dera Ismail Khan', 'Nawabshah'
];

const domesticRoutes = [
    { from: 'Karachi', to: 'Lahore', distance: '1210 km', duration: '1h 50m' },
    { from: 'Karachi', to: 'Islamabad', distance: '1400 km', duration: '2h 05m' },
    { from: 'Karachi', to: 'Peshawar', distance: '1500 km', duration: '2h 15m' },
    { from: 'Karachi', to: 'Quetta', distance: '680 km', duration: '1h 20m' },
    { from: 'Karachi', to: 'Multan', distance: '900 km', duration: '1h 35m' },
    { from: 'Karachi', to: 'Faisalabad', distance: '1100 km', duration: '1h 45m' },
    { from: 'Karachi', to: 'Sialkot', distance: '1350 km', duration: '2h 00m' },
    { from: 'Karachi', to: 'Sukkur', distance: '475 km', duration: '1h 00m' },
    { from: 'Karachi', to: 'Turbat', distance: '580 km', duration: '1h 10m' },
    { from: 'Karachi', to: 'Gwadar', distance: '650 km', duration: '1h 15m' },
    { from: 'Lahore', to: 'Islamabad', distance: '380 km', duration: '0h 55m' },
    { from: 'Lahore', to: 'Karachi', distance: '1210 km', duration: '1h 50m' },
    { from: 'Lahore', to: 'Peshawar', distance: '480 km', duration: '1h 05m' },
    { from: 'Lahore', to: 'Quetta', distance: '850 km', duration: '1h 30m' },
    { from: 'Islamabad', to: 'Karachi', distance: '1400 km', duration: '2h 05m' },
    { from: 'Islamabad', to: 'Lahore', distance: '380 km', duration: '0h 55m' },
    { from: 'Islamabad', to: 'Peshawar', distance: '190 km', duration: '0h 35m' },
    { from: 'Islamabad', to: 'Quetta', distance: '750 km', duration: '1h 25m' },
    { from: 'Islamabad', to: 'Multan', distance: '530 km', duration: '1h 10m' },
    { from: 'Islamabad', to: 'Gilgit', distance: '580 km', duration: '1h 05m' },
    { from: 'Islamabad', to: 'Skardu', distance: '600 km', duration: '1h 10m' },
    { from: 'Islamabad', to: 'Chitral', distance: '350 km', duration: '0h 55m' },
    { from: 'Peshawar', to: 'Karachi', distance: '1500 km', duration: '2h 15m' },
    { from: 'Quetta', to: 'Islamabad', distance: '750 km', duration: '1h 25m' },
    { from: 'Multan', to: 'Karachi', distance: '900 km', duration: '1h 35m' },
    { from: 'Faisalabad', to: 'Karachi', distance: '1100 km', duration: '1h 45m' },
    { from: 'Sialkot', to: 'Karachi', distance: '1350 km', duration: '2h 00m' },
    { from: 'Rahim Yar Khan', to: 'Islamabad', distance: '700 km', duration: '1h 20m' },
    { from: 'Bahawalpur', to: 'Islamabad', distance: '680 km', duration: '1h 15m' },
    { from: 'Sukkur', to: 'Islamabad', distance: '850 km', duration: '1h 30m' }
];

function generateFlightNo(airlineCode) {
    return airlineCode + '-' + (Math.floor(Math.random() * 900) + 100);
}

function generateTime(startHour, endHour) {
    const hour = Math.floor(Math.random() * (endHour - startHour)) + startHour;
    const min = Math.random() > 0.5 ? '00' : '30';
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return displayHour + ':' + min + ' ' + ampm;
}

function generatePrice(minPrice, maxPrice) {
    return Math.floor(Math.random() * (maxPrice - minPrice) / 100) * 100 + minPrice;
}

function getRandomStatus() {
    const statuses = [
        { text: 'On Time', cls: 'status-ontime' },
        { text: 'On Time', cls: 'status-ontime' },
        { text: 'On Time', cls: 'status-ontime' },
        { text: 'On Time', cls: 'status-ontime' },
        { text: 'Delayed', cls: 'status-delayed' },
        { text: 'Boarding', cls: 'status-boarding' }
    ];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

function updateCurrentDate() {
    const dateElements = document.querySelectorAll('.current-date');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-PK', options);
    dateElements.forEach(function(el) { el.textContent = dateStr; });
}

function generateTimetable(filterAirline, filterFrom, filterTo) {
    const tbody = document.getElementById('timetableBody');
    if (!tbody) { return; }
    tbody.innerHTML = '';
    let flights = [];
    domesticRoutes.forEach(function(route) {
        const numFlights = Math.floor(Math.random() * 3) + 2;
        const usedAirlines = [];
        for (let i = 0; i < numFlights; i++) {
            let airline;
            do { airline = airlines[Math.floor(Math.random() * airlines.length)]; }
            while (usedAirlines.includes(airline.code) && usedAirlines.length < airlines.length);
            usedAirlines.push(airline.code);
            const depHour = Math.floor(Math.random() * 14) + 6;
            const status = getRandomStatus();
            flights.push({
                airline: airline, flightNo: generateFlightNo(airline.code),
                from: route.from, to: route.to,
                departure: generateTime(depHour, depHour + 1),
                arrival: generateTime(depHour + 1, depHour + 3),
                duration: route.duration, price: generatePrice(8000, 35000),
                status: status,
                aircraft: ['Boeing 737', 'Airbus A320', 'ATR 72'][Math.floor(Math.random() * 3)]
            });
        }
    });
    if (filterAirline && filterAirline !== 'all') { flights = flights.filter(function(f) { return f.airline.name === filterAirline; }); }
    if (filterFrom && filterFrom !== 'all') { flights = flights.filter(function(f) { return f.from === filterFrom; }); }
    if (filterTo && filterTo !== 'all') { flights = flights.filter(function(f) { return f.to === filterTo; }); }
    flights.sort(function(a, b) { return a.departure.localeCompare(b.departure); });
    flights.forEach(function(flight) {
        const row = document.createElement('tr');
        row.innerHTML = '<td><span class="airline-tag ' + flight.airline.tag + '">' + flight.airline.name + '</span></td><td><strong>' + flight.flightNo + '</strong></td><td>' + flight.from + '</td><td>' + flight.to + '</td><td><strong>' + flight.departure + '</strong></td><td>' + flight.arrival + '</td><td>' + flight.duration + '</td><td>' + flight.aircraft + '</td><td><strong style="color:#10b981">PKR ' + flight.price.toLocaleString() + '</strong></td><td><span class="status-badge ' + flight.status.cls + '">' + flight.status.text + '</span></td><td><a href="booking.html" class="btn btn-primary" style="padding:6px 14px;font-size:0.8rem;">Book</a></td>';
        tbody.appendChild(row);
    });
    const countEl = document.getElementById('flightCount');
    if (countEl) { countEl.textContent = flights.length; }
}

function generateFlightResults() {
    const container = document.getElementById('flightResults');
    if (!container) { return; }
    container.innerHTML = '';
    const selectedRoutes = domesticRoutes.slice(0, 15);
    selectedRoutes.forEach(function(route) {
        const numFlights = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < numFlights; i++) {
            const airline = airlines[Math.floor(Math.random() * airlines.length)];
            const depHour = Math.floor(Math.random() * 14) + 6;
            const price = generatePrice(8000, 35000);
            const status = getRandomStatus();
            const colors = { 'tag-pia': '#006747', 'tag-airblue': '#004B87', 'tag-serene': '#00A651', 'tag-airsial': '#C8102E', 'tag-flyjinnah': '#FF6B00' };
            const card = document.createElement('div');
            card.className = 'flight-result-card';
            card.style.cssText = 'background:#fff;border-radius:12px;padding:25px;margin-bottom:15px;box-shadow:0 2px 8px rgba(0,0,0,0.08);display:grid;grid-template-columns:1fr 2fr 1fr;align-items:center;gap:20px;border-left:4px solid;transition:all 0.3s;';
            card.style.borderLeftColor = colors[airline.tag] || '#1a73e8';
            card.innerHTML = '<div style="text-align:center;"><span class="airline-tag ' + airline.tag + '" style="display:inline-block;margin-bottom:8px;">' + airline.name + '</span><p style="font-size:0.85rem;color:#64748b;">' + generateFlightNo(airline.code) + '</p><p style="font-size:0.75rem;color:#64748b;">' + route.duration + '</p></div><div><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;"><div style="text-align:center;"><h4 style="font-size:1.2rem;">' + generateTime(depHour, depHour + 1) + '</h4><p style="font-size:0.9rem;color:#64748b;">' + route.from + '</p></div><div style="flex:1;padding:0 20px;text-align:center;"><div style="border-top:2px dashed #e2e8f0;position:relative;margin:10px 0;"><span style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:#fff;padding:0 8px;font-size:0.8rem;color:#1a73e8;">&#9992; Direct</span></div></div><div style="text-align:center;"><h4 style="font-size:1.2rem;">' + generateTime(depHour + 1, depHour + 3) + '</h4><p style="font-size:0.9rem;color:#64748b;">' + route.to + '</p></div></div><div style="display:flex;gap:10px;flex-wrap:wrap;"><span class="status-badge ' + status.cls + '">' + status.text + '</span><span style="font-size:0.8rem;color:#64748b;padding:4px 8px;">Economy Class</span></div></div><div style="text-align:center;"><p style="font-size:0.75rem;color:#64748b;">Starting from</p><h3 style="font-size:1.4rem;color:#10b981;font-weight:700;">PKR ' + price.toLocaleString() + '</h3><a href="booking.html" class="btn btn-primary" style="margin-top:10px;padding:8px 20px;font-size:0.85rem;width:100%;">Book Now</a></div>';
            card.addEventListener('mouseenter', function() { this.style.transform = 'translateX(5px)'; this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)'; });
            card.addEventListener('mouseleave', function() { this.style.transform = 'translateX(0)'; this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'; });
            container.appendChild(card);
        }
    });
}

function filterTimetable() { // eslint-disable-line no-unused-vars
    const airlineEl = document.getElementById('filterAirline');
    const fromEl = document.getElementById('filterFrom');
    const toEl = document.getElementById('filterTo');
    const airline = airlineEl ? airlineEl.value : 'all';
    const from = fromEl ? fromEl.value : 'all';
    const to = toEl ? toEl.value : 'all';
    generateTimetable(airline, from, to);
}

function populateCitySelects() {
    const selects = document.querySelectorAll('.city-select');
    selects.forEach(function(select) {
        const defaultOption = select.querySelector('option');
        select.innerHTML = '';
        if (defaultOption) { select.appendChild(defaultOption); }
        cities.forEach(function(city) {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            select.appendChild(option);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) { hamburger.addEventListener('click', function() { navLinks.classList.toggle('active'); }); }
    document.querySelectorAll('.nav-links a').forEach(function(link) { link.addEventListener('click', function() { navLinks.classList.remove('active'); }); });
    updateCurrentDate();
    if (document.getElementById('timetableBody')) { generateTimetable(); }
    if (document.getElementById('flightResults')) { generateFlightResults(); }
    document.querySelectorAll('.search-tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.search-tab').forEach(function(t) { t.classList.remove('active'); });
            this.classList.add('active');
        });
    });
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var tripType = document.querySelector('input[name="tripType"]:checked').value;
            var name = document.getElementById('bookingName').value;
            var cnic = document.getElementById('bookingCNIC').value;
            var phone = document.getElementById('bookingPhone').value;
            var email = document.getElementById('bookingEmail').value || 'Not provided';
            var from = document.getElementById('bookingFrom').value;
            var to = document.getElementById('bookingTo').value;
            var airline = document.getElementById('bookingAirline').value || 'Any Airline';
            var flightClass = document.getElementById('bookingClass').value;
            var depDate = document.getElementById('bookingDepDate').value;
            var retDate = document.getElementById('bookingRetDate').value || 'N/A';
            var passengers = document.getElementById('bookingPassengers').value;
            var time = document.getElementById('bookingTime').value;
            var notes = document.getElementById('bookingNotes').value || 'None';

            var message = '--- NEW BOOKING REQUEST ---\n\n'
                + 'Trip Type: ' + tripType + '\n'
                + 'Full Name: ' + name + '\n'
                + 'CNIC: ' + cnic + '\n'
                + 'Phone: ' + phone + '\n'
                + 'Email: ' + email + '\n\n'
                + '--- FLIGHT DETAILS ---\n'
                + 'From: ' + from + '\n'
                + 'To: ' + to + '\n'
                + 'Airline: ' + airline + '\n'
                + 'Class: ' + flightClass + '\n'
                + 'Departure Date: ' + depDate + '\n'
                + 'Return Date: ' + retDate + '\n'
                + 'Passengers: ' + passengers + '\n'
                + 'Preferred Time: ' + time + '\n\n'
                + 'Special Notes: ' + notes + '\n\n'
                + 'Please confirm this booking. Thank you!';

            var whatsappURL = 'https://wa.me/9203181132286?text=' + encodeURIComponent(message);
            window.open(whatsappURL, '_blank');
        });
    }
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var name = document.getElementById('contactName').value;
            var phone = document.getElementById('contactPhone').value;
            var email = document.getElementById('contactEmail').value || 'Not provided';
            var subject = document.getElementById('contactSubject').value;
            var msg = document.getElementById('contactMessage').value;

            var message = '--- NEW CONTACT MESSAGE ---\n\n'
                + 'Name: ' + name + '\n'
                + 'Phone: ' + phone + '\n'
                + 'Email: ' + email + '\n'
                + 'Subject: ' + subject + '\n\n'
                + 'Message:\n' + msg + '\n\n'
                + 'Please respond. Thank you!';

            var whatsappURL = 'https://wa.me/9203181132286?text=' + encodeURIComponent(message);
            window.open(whatsappURL, '_blank');
        });
    }
    const searchForm = document.getElementById('searchForm');
    if (searchForm) { searchForm.addEventListener('submit', function(e) { e.preventDefault(); window.location.href = 'flights.html'; }); }
    populateCitySelects();
});
