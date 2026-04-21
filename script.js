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
    }
];


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
            alert(`Kattintottál: ${film.cim}`);
        });

        filmGrid.appendChild(filmCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    generateFilmGrid();

    // Filter gombok
    const filterBtns = document.querySelectorAll('.nav-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
});
