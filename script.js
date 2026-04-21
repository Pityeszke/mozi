const filmek = [
    { id: 1, cim: "The 90s Ohm", year: 2024, image: "poster1.jpg", badge: "IMPRESS" },
    { id: 2, cim: "Fives Égen Ötletek", year: 2024, image: "poster2.jpg" },
    { id: 3, cim: "The Housemaid", year: 2024, image: "poster3.jpg" },
    { id: 4, cim: "A Bir Jáva", year: 2024, image: "poster4.jpg" },
    { id: 5, cim: "Ismeretlen - Támadás", year: 2024, image: "poster5.jpg" },
    { id: 6, cim: "Zootropolis", year: 2024, image: "poster6.jpg" },
    { id: 7, cim: "Avatar: Utolsó Lélegzet", year: 2024, image: "poster7.jpg" },
    { id: 8, cim: "Agugrász", year: 2024, image: "poster8.jpg" },
    { id: 9, cim: "Halál Cikk", year: 2024, image: "poster9.jpg" },
    { id: 10, cim: "Birmingham Bandája", year: 2024, image: "poster10.jpg" },
    { id: 11, cim: "Nurnberg", year: 2024, image: "poster11.jpg" },
    { id: 12, cim: "The Restless Hungarian", year: 2024, image: "poster12.jpg", badge: "IMPRESS" },
    { id: 13, cim: "Segítség!", year: 2024, image: "poster13.jpg" },
    { id: 14, cim: "Hálál Bolygó", year: 2024, image: "poster14.jpg" },
    { id: 15, cim: "Husz Tudnék Zájadult?", year: 2024, image: "poster15.jpg" },
    { id: 16, cim: "Senki 2", year: 2024, image: "poster16.jpg" }
];

function generateFilmGrid() {
    const filmGrid = document.getElementById('filmGrid');
    filmGrid.innerHTML = '';

    filmek.forEach(film => {
        const filmCard = document.createElement('div');
        filmCard.className = 'film-card';
        
        const imagePath = `https://via.placeholder.com/160x240/1a1a1a/FFB000?text=${encodeURIComponent(film.cim.substring(0, 10))}`;
        
        filmCard.innerHTML = `
            ${film.badge ? `<div class="badge">${film.badge}</div>` : ''}
            <img src="${imagePath}" alt="${film.cim}" onerror="this.src='https://via.placeholder.com/160x240/333/999?text=No+Image'">
            <div class="film-overlay">
                <button class="play-btn">▶</button>
            </div>
        `;

        filmCard.addEventListener('click', () => {
            console.log(`Kattintottál: ${film.cim}`);
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
