<<<<<<< HEAD
let filmek = fetch("filmek.json")
    .then(response => response.json())

function betoltes(){
    let div = document.getElementById("tartalom");
    for (let i = 0; i < filmek.length; i++) {
        let film = filmek[i];
        let p = document.createElement("p");
        p.textContent = film.cim;
        div.appendChild(p);
=======
const filmek = [
    {
        id: 1,
        cim: "Avatar: The Way of Water",
        year: 2022,
        mufaj: "Fantasy, Kaland",
        rendezo: "James Cameron",
        image: "https://m.media-amazon.com/images/I/81+1r6ZQGGL._AC_SY679_.jpg",
        badge: "ÚJ"
    },
    {
        id: 2,
        cim: "Zootropolis",
        year: 2016,
        mufaj: "Animáció, Vígjáték",
        rendezo: "Byron Howard, Rich Moore",
        image: "https://m.media-amazon.com/images/I/91pR9wKJ3zL._AC_SY679_.jpg"
    },
    {
        id: 3,
        cim: "Oppenheimer",
        year: 2023,
        mufaj: "Dráma, Történelmi",
        rendezo: "Christopher Nolan",
        image: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg"
    },
    {
        id: 4,
        cim: "Barbie",
        year: 2023,
        mufaj: "Vígjáték, Kaland",
        rendezo: "Greta Gerwig",
        image: "https://m.media-amazon.com/images/I/71QZc5l6pXL._AC_SY679_.jpg"
    },
    {
        id: 5,
        cim: "The Housemaid",
        year: 2016,
        mufaj: "Thriller, Dráma",
        rendezo: "Derek Nguyen",
        image: "https://m.media-amazon.com/images/I/71w6QwQwQwL._AC_SY679_.jpg"
    },
    {
        id: 6,
        cim: "Senki 2",
        year: 2024,
        mufaj: "Akció, Thriller",
        rendezo: "Iain Softley",
        image: "https://m.media-amazon.com/images/I/81Zt42ioCgL._AC_SY679_.jpg"
>>>>>>> 204b86bb3bb15877fdb024375768a30b71a7087f
    }
];

const seatRows = 10;
const seatCols = 12;

const bookedSeatsByFilm = {
    1: ["A3", "A4", "A5", "B7", "B8", "C11", "D1", "D6", "E10", "F11"],
    2: ["A2", "A11", "B5", "B6", "C8", "D9", "E3", "F2", "G4", "H9"],
    3: ["A1", "A6", "B9", "C2", "D4", "E5", "F8", "G11", "H1", "I6"],
    4: ["A7", "B3", "C10", "D2", "E8", "F5", "G9", "H7", "I4", "J10"],
    5: ["A4", "B11", "C5", "D7", "E11", "F1", "G2", "H10", "I3", "J8"],
    6: ["A8", "B10", "C1", "D11", "E2", "F6", "G3", "H5", "I7", "J9"]
};

let selectedFilm = null;
let selectedSeats = [];

function getSeatId(row, col) {
    return String.fromCharCode(65 + row) + (col + 1);
}

function openSeatBooking(film) {
    selectedFilm = film;
    selectedSeats = [];

    const seatBooking = document.getElementById('seatBooking');
    const selectedMovieTitle = document.getElementById('selectedMovieTitle');
    const bookingInfo = document.getElementById('bookingInfo');

    selectedMovieTitle.textContent = `${film.cim} - Helyfoglalás`;
    bookingInfo.textContent = 'Kattints a zöld szabad helyekre a foglaláshoz, majd nyomd meg a Foglalás gombot.';
    seatBooking.classList.remove('hidden');

    renderSeatGrid();
    updateSelectedCount();
}

function renderSeatGrid() {
    const seatGrid = document.getElementById('seatGrid');
    seatGrid.innerHTML = '';

    const bookedSeats = bookedSeatsByFilm[selectedFilm.id] || [];

    for (let row = 0; row < seatRows; row++) {
        for (let col = 0; col < seatCols; col++) {
            const seatId = getSeatId(row, col);
            const seatButton = document.createElement('button');
            seatButton.className = 'seat';
            seatButton.textContent = seatId;s
            seatButton.dataset.seatId = seatId;

            if (bookedSeats.includes(seatId)) {
                seatButton.classList.add('reserved');
                seatButton.disabled = true;
            } else {
                seatButton.classList.add('available');
                seatButton.addEventListener('click', () => toggleSeatSelection(seatButton, seatId));
            }

            seatGrid.appendChild(seatButton);
        }
    }
}

function toggleSeatSelection(button, seatId) {
    const index = selectedSeats.indexOf(seatId);
    if (index === -1) {
        selectedSeats.push(seatId);
        button.classList.add('selected');
        button.classList.remove('available');
    } else {
        selectedSeats.splice(index, 1);
        button.classList.remove('selected');
        button.classList.add('available');
    }
    updateSelectedCount();
}

function updateSelectedCount() {
    document.getElementById('selectedCount').textContent = selectedSeats.length;
}

function clearSelection() {
    selectedSeats = [];
    renderSeatGrid();
    updateSelectedCount();
}

function confirmBooking() {
    if (!selectedFilm) {
        return;
    }

    if (selectedSeats.length === 0) {
        alert('Először válassz ki legalább egy szabad ülést.');
        return;
    }

    bookedSeatsByFilm[selectedFilm.id] = [
        ...new Set([...(bookedSeatsByFilm[selectedFilm.id] || []), ...selectedSeats])
    ];

    alert(`Sikeres foglalás: ${selectedSeats.join(', ')}\nKöszönjük!`);
    clearSelection();
}

function generateFilmGrid() {
    const filmGrid = document.getElementById('filmGrid');
    filmGrid.innerHTML = '';

    filmek.forEach(film => {
        const filmCard = document.createElement('div');
        filmCard.className = 'film-card';

        filmCard.innerHTML = `
            ${film.badge ? `<div class="badge">${film.badge}</div>` : ''}
            <img src="${film.image}" alt="${film.cim}" onerror="this.src='https://via.placeholder.com/160x240/333/999?text=No+Image'">
            <div class="film-info">
                <h3>${film.cim}</h3>
                <p class="film-meta">${film.year} &middot; ${film.mufaj || ''}</p>
                <p class="film-meta">${film.rendezo ? 'Rendező: ' + film.rendezo : ''}</p>
            </div>
            <div class="film-overlay">
                <button class="play-btn">▶</button>
            </div>
        `;

        filmCard.addEventListener('click', () => {
            openSeatBooking(film);
        });

        filmGrid.appendChild(filmCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    generateFilmGrid();

    const filterBtns = document.querySelectorAll('.nav-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    document.getElementById('confirmBookingBtn').addEventListener('click', confirmBooking);
    document.getElementById('clearSelectionBtn').addEventListener('click', clearSelection);
});
