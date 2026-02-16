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

// Seeded random number generator - same date always gives same flights
function seededRandom(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function getDateSeed(dateStr) {
    var d = new Date(dateStr);
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function getSelectedDate() {
    var dateInput = document.getElementById('timetableDate');
    if (dateInput && dateInput.value) {
        return dateInput.value;
    }
    return new Date().toISOString().split('T')[0];
}

function getDayName(dateStr) {
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[new Date(dateStr).getDay()];
}

function generateFlightNo(airlineCode, seed) {
    var num = Math.floor(seededRandom(seed) * 900) + 100;
    return airlineCode + '-' + num;
}

function generateTime(startHour, endHour, seed) {
    var hour = Math.floor(seededRandom(seed) * (endHour - startHour)) + startHour;
    var min = seededRandom(seed + 1) > 0.5 ? '00' : '30';
    var ampm = hour >= 12 ? 'PM' : 'AM';
    var displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return displayHour + ':' + min + ' ' + ampm;
}

function generatePrice(minPrice, maxPrice, seed) {
    return Math.floor(seededRandom(seed) * (maxPrice - minPrice) / 100) * 100 + minPrice;
}

function getSeededStatus(seed) {
    var statuses = [
        { text: 'On Time', cls: 'status-ontime' },
        { text: 'On Time', cls: 'status-ontime' },
        { text: 'On Time', cls: 'status-ontime' },
        { text: 'On Time', cls: 'status-ontime' },
        { text: 'Delayed', cls: 'status-delayed' },
        { text: 'Boarding', cls: 'status-boarding' }
    ];
    return statuses[Math.floor(seededRandom(seed) * statuses.length)];
}

function updateDateDisplay(dateStr) {
    var displayEl = document.getElementById('selectedDateDisplay');
    if (displayEl) {
        var d = new Date(dateStr);
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        displayEl.textContent = d.toLocaleDateString('en-PK', options);
    }
}

function updateCurrentDate() {
    var dateElements = document.querySelectorAll('.current-date');
    var now = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var dateStr = now.toLocaleDateString('en-PK', options);
    dateElements.forEach(function(el) {
        if (el.id !== 'selectedDateDisplay') {
            el.textContent = dateStr;
        }
    });
}

function generateTimetable(filterAirline, filterFrom, filterTo) {
    var tbody = document.getElementById('timetableBody');
    if (!tbody) { return; }
    tbody.innerHTML = '';

    var selectedDate = getSelectedDate();
    var dateSeed = getDateSeed(selectedDate);
    var dayName = getDayName(selectedDate);

    updateDateDisplay(selectedDate);

    var flights = [];
    var seedCounter = dateSeed;

    domesticRoutes.forEach(function(route, routeIndex) {
        var numFlights = Math.floor(seededRandom(dateSeed + routeIndex * 100) * 3) + 2;
        var usedAirlines = [];
        for (var i = 0; i < numFlights; i++) {
            seedCounter = dateSeed + routeIndex * 100 + i * 10;
            var airlineIndex = Math.floor(seededRandom(seedCounter) * airlines.length);
            var attempts = 0;
            while (usedAirlines.includes(airlines[airlineIndex].code) && attempts < airlines.length) {
                airlineIndex = (airlineIndex + 1) % airlines.length;
                attempts++;
            }
            var airline = airlines[airlineIndex];
            usedAirlines.push(airline.code);

            var depHour = Math.floor(seededRandom(seedCounter + 1) * 14) + 6;
            var status = getSeededStatus(seedCounter + 2);

            flights.push({
                airline: airline,
                flightNo: generateFlightNo(airline.code, seedCounter + 3),
                from: route.from, to: route.to,
                departure: generateTime(depHour, depHour + 1, seedCounter + 4),
                arrival: generateTime(depHour + 1, depHour + 3, seedCounter + 5),
                duration: route.duration,
                price: generatePrice(8000, 35000, seedCounter + 6),
                status: status,
                aircraft: ['Boeing 737', 'Airbus A320', 'ATR 72'][Math.floor(seededRandom(seedCounter + 7) * 3)]
            });
        }
    });

    if (filterAirline && filterAirline !== 'all') { flights = flights.filter(function(f) { return f.airline.name === filterAirline; }); }
    if (filterFrom && filterFrom !== 'all') { flights = flights.filter(function(f) { return f.from === filterFrom; }); }
    if (filterTo && filterTo !== 'all') { flights = flights.filter(function(f) { return f.to === filterTo; }); }
    flights.sort(function(a, b) { return a.departure.localeCompare(b.departure); });

    flights.forEach(function(flight) {
        var row = document.createElement('tr');
        row.innerHTML = '<td><span class="airline-tag ' + flight.airline.tag + '">' + flight.airline.name + '</span></td><td><strong>' + flight.flightNo + '</strong></td><td>' + flight.from + '</td><td>' + flight.to + '</td><td><strong>' + flight.departure + '</strong></td><td>' + flight.arrival + '</td><td>' + flight.duration + '</td><td>' + flight.aircraft + '</td><td><strong style="color:#10b981">PKR ' + flight.price.toLocaleString() + '</strong></td><td><span class="status-badge ' + flight.status.cls + '">' + flight.status.text + '</span></td><td><a href="booking.html" class="btn btn-primary" style="padding:6px 14px;font-size:0.8rem;">Book</a></td>';
        tbody.appendChild(row);
    });

    var countEl = document.getElementById('flightCount');
    if (countEl) { countEl.textContent = flights.length; }

    // Filter static airline timetables by selected day
    filterStaticTimetables(dayName);
}

// Day matching for static airline tables
var dayMap = {
    'Sun': 'Sun', 'Mon': 'Mon', 'Tue': 'Tue', 'Wed': 'Wed',
    'Thu': 'Thu', 'Fri': 'Fri', 'Sat': 'Sat'
};

function doesFlightRunOnDay(daysText, dayName) {
    if (daysText.trim() === 'Daily') return true;
    var daysList = daysText.split('/').map(function(d) { return d.trim(); });
    return daysList.includes(dayName);
}

function filterStaticTimetables(dayName) {
    var staticTables = document.querySelectorAll('.timetable-container table.timetable');
    staticTables.forEach(function(table) {
        // Skip the dynamic timetable (has id timetableBody)
        if (table.querySelector('#timetableBody')) return;

        var rows = table.querySelectorAll('tbody tr');
        var visibleCount = 0;
        rows.forEach(function(row) {
            var cells = row.querySelectorAll('td');
            // The "Days" column is the 3rd column (index 2) in static tables
            if (cells.length >= 3) {
                var daysText = cells[2].textContent;
                if (doesFlightRunOnDay(daysText, dayName)) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            }
        });

        // Show message if no flights on this day
        var noFlightRow = table.querySelector('.no-flights-row');
        if (visibleCount === 0) {
            if (!noFlightRow) {
                noFlightRow = document.createElement('tr');
                noFlightRow.className = 'no-flights-row';
                var colCount = table.querySelector('thead tr').children.length;
                noFlightRow.innerHTML = '<td colspan="' + colCount + '" style="text-align:center;padding:20px;color:#64748b;font-style:italic;">No flights scheduled for ' + dayName + 'day. Please select another date.</td>';
                table.querySelector('tbody').appendChild(noFlightRow);
            }
        } else if (noFlightRow) {
            noFlightRow.remove();
        }
    });
}

function generateFlightResults() {
    var container = document.getElementById('flightResults');
    if (!container) { return; }
    container.innerHTML = '';
    var selectedRoutes = domesticRoutes.slice(0, 15);
    selectedRoutes.forEach(function(route) {
        var numFlights = Math.floor(Math.random() * 3) + 2;
        for (var i = 0; i < numFlights; i++) {
            var airline = airlines[Math.floor(Math.random() * airlines.length)];
            var depHour = Math.floor(Math.random() * 14) + 6;
            var price = generatePrice(8000, 35000, Math.random() * 10000);
            var statuses = [
                { text: 'On Time', cls: 'status-ontime' },
                { text: 'On Time', cls: 'status-ontime' },
                { text: 'On Time', cls: 'status-ontime' },
                { text: 'Delayed', cls: 'status-delayed' },
                { text: 'Boarding', cls: 'status-boarding' }
            ];
            var status = statuses[Math.floor(Math.random() * statuses.length)];
            var colors = { 'tag-pia': '#006747', 'tag-airblue': '#004B87', 'tag-serene': '#00A651', 'tag-airsial': '#C8102E', 'tag-flyjinnah': '#FF6B00' };
            var depTime = generateTime(depHour, depHour + 1, Math.random() * 10000);
            var arrTime = generateTime(depHour + 1, depHour + 3, Math.random() * 10000);
            var flightNo = airline.code + '-' + (Math.floor(Math.random() * 900) + 100);
            var card = document.createElement('div');
            card.className = 'flight-result-card';
            card.style.cssText = 'background:#fff;border-radius:12px;padding:25px;margin-bottom:15px;box-shadow:0 2px 8px rgba(0,0,0,0.08);display:grid;grid-template-columns:1fr 2fr 1fr;align-items:center;gap:20px;border-left:4px solid;transition:all 0.3s;';
            card.style.borderLeftColor = colors[airline.tag] || '#1a73e8';
            card.innerHTML = '<div style="text-align:center;"><span class="airline-tag ' + airline.tag + '" style="display:inline-block;margin-bottom:8px;">' + airline.name + '</span><p style="font-size:0.85rem;color:#64748b;">' + flightNo + '</p><p style="font-size:0.75rem;color:#64748b;">' + route.duration + '</p></div><div><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;"><div style="text-align:center;"><h4 style="font-size:1.2rem;">' + depTime + '</h4><p style="font-size:0.9rem;color:#64748b;">' + route.from + '</p></div><div style="flex:1;padding:0 20px;text-align:center;"><div style="border-top:2px dashed #e2e8f0;position:relative;margin:10px 0;"><span style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:#fff;padding:0 8px;font-size:0.8rem;color:#1a73e8;">&#9992; Direct</span></div></div><div style="text-align:center;"><h4 style="font-size:1.2rem;">' + arrTime + '</h4><p style="font-size:0.9rem;color:#64748b;">' + route.to + '</p></div></div><div style="display:flex;gap:10px;flex-wrap:wrap;"><span class="status-badge ' + status.cls + '">' + status.text + '</span><span style="font-size:0.8rem;color:#64748b;padding:4px 8px;">Economy Class</span></div></div><div style="text-align:center;"><p style="font-size:0.75rem;color:#64748b;">Starting from</p><h3 style="font-size:1.4rem;color:#10b981;font-weight:700;">PKR ' + price.toLocaleString() + '</h3><a href="booking.html" class="btn btn-primary" style="margin-top:10px;padding:8px 20px;font-size:0.85rem;width:100%;">Book Now</a></div>';
            card.addEventListener('mouseenter', function() { this.style.transform = 'translateX(5px)'; this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)'; });
            card.addEventListener('mouseleave', function() { this.style.transform = 'translateX(0)'; this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'; });
            container.appendChild(card);
        }
    });
}

function filterTimetable() { // eslint-disable-line no-unused-vars
    var airlineEl = document.getElementById('filterAirline');
    var fromEl = document.getElementById('filterFrom');
    var toEl = document.getElementById('filterTo');
    var airline = airlineEl ? airlineEl.value : 'all';
    var from = fromEl ? fromEl.value : 'all';
    var to = toEl ? toEl.value : 'all';
    generateTimetable(airline, from, to);
}

function populateCitySelects() {
    var selects = document.querySelectorAll('.city-select');
    selects.forEach(function(select) {
        var defaultOption = select.querySelector('option');
        select.innerHTML = '';
        if (defaultOption) { select.appendChild(defaultOption); }
        cities.forEach(function(city) {
            var option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            select.appendChild(option);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var hamburger = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.nav-links');
    if (hamburger) { hamburger.addEventListener('click', function() { navLinks.classList.toggle('active'); }); }
    document.querySelectorAll('.nav-links a').forEach(function(link) { link.addEventListener('click', function() { navLinks.classList.remove('active'); }); });

    updateCurrentDate();

    // Set date picker to today's date
    var dateInput = document.getElementById('timetableDate');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
        // Allow dates up to 30 days in advance
        var maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30);
        dateInput.max = maxDate.toISOString().split('T')[0];
    }

    if (document.getElementById('timetableBody')) { generateTimetable(); }
    if (document.getElementById('flightResults')) { generateFlightResults(); }

    document.querySelectorAll('.search-tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.search-tab').forEach(function(t) { t.classList.remove('active'); });
            this.classList.add('active');
        });
    });

    var bookingForm = document.getElementById('bookingForm');
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

    var contactForm = document.getElementById('contactForm');
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

    var searchForm = document.getElementById('searchForm');
    if (searchForm) { searchForm.addEventListener('submit', function(e) { e.preventDefault(); window.location.href = 'flights.html'; }); }

    populateCitySelects();
});
