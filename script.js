let filmek = [];

async function jsonBetoltes() {
    try {
        const response = await fetch('json.json');
        const data = await response.json();
        filmek = data.filmek;
    } catch (error) {
        console.error('Hiba a JSON betöltésekor:', error);
    }
}

function betoltes(){
    let div = document.getElementById("tartalom");
    div.innerHTML = ''; // Töröljük a korábbi tartalmat
    for (let i = 0; i < filmek.length; i++) {
        let film = filmek[i];
        let filmDiv = document.createElement("div");
        filmDiv.className = "film";
        filmDiv.innerHTML = `
            <h2>${film.cim}</h2>
            <p>Rendező: ${film.rendezo}</p>
            <p>Év: ${film.ev}</p>
            <p>Műfaj: ${film.mufaj}</p>
            <p>Hossz: ${film.hossz} perc</p>
            <p>Korhatár: ${film.korhatar}</p>
            <button onclick="vetitesekMegjelenites(${film.id})">Vetítések megtekintése</button>
        `;
        div.appendChild(filmDiv);
    }
}

function vetitesekMegjelenites(filmId) {
    const film = filmek.find(f => f.id === filmId);
    let div = document.getElementById("tartalom");
    div.innerHTML = `<h2>${film.cim} - Vetítések</h2>`;
    film.vetitesek.forEach(vetites => {
        let vetitesDiv = document.createElement("div");
        vetitesDiv.className = "vetites";
        vetitesDiv.innerHTML = `
            <p>Mozi: ${vetites.mozi}</p>
            <p>Terem: ${vetites.terem}</p>
            <p>Kezdés: ${new Date(vetites.kezdes).toLocaleString()}</p>
            <p>Nyelv: ${vetites.nyelv}</p>
            <p>Formátum: ${vetites.formatum}</p>
            <button onclick="helyekMegjelenites(${film.id}, ${vetites.id})">Helyek foglalása</button>
        `;
        div.appendChild(vetitesDiv);
    });
    let visszaBtn = document.createElement("button");
    visszaBtn.textContent = "Vissza a filmekhez";
    visszaBtn.onclick = betoltes;
    div.appendChild(visszaBtn);
}

function helyekMegjelenites(filmId, vetitesId) {
    let div = document.getElementById("tartalom");
    div.innerHTML = `<h2>Helyek foglalása</h2>`;
    
    // Egyszerű 5x5 terem
    let teremDiv = document.createElement("div");
    teremDiv.className = "terem";
    for (let sor = 1; sor <= 5; sor++) {
        let sorDiv = document.createElement("div");
        sorDiv.className = "sor";
        for (let hely = 1; hely <= 5; hely++) {
            let helyBtn = document.createElement("button");
            helyBtn.className = "hely";
            helyBtn.textContent = `${sor}-${hely}`;
            helyBtn.onclick = () => helyFoglalas(filmId, vetitesId, sor, hely);
            sorDiv.appendChild(helyBtn);
        }
        teremDiv.appendChild(sorDiv);
    }
    div.appendChild(teremDiv);
    
    let visszaBtn = document.createElement("button");
    visszaBtn.textContent = "Vissza a vetítésekhez";
    visszaBtn.onclick = () => vetitesekMegjelenites(filmId);
    div.appendChild(visszaBtn);
}

function helyFoglalas(filmId, vetitesId, sor, hely) {
    // Egyszerű foglalás tárolás localStorage-ban
    let foglalasok = JSON.parse(localStorage.getItem('foglalasok') || '[]');
    foglalasok.push({ filmId, vetitesId, sor, hely });
    localStorage.setItem('foglalasok', JSON.stringify(foglalasok));
    alert(`Hely foglalva: ${sor}-${hely}`);
}

addEventListener("DOMContentLoaded", async () => {
    await jsonBetoltes();
    betoltes();
});