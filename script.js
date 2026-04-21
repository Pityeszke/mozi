let filmek = fetch("filmek.json")
    .then(response => response.json())

function betoltes(){
    let div = document.getElementById("tartalom");
    for (let i = 0; i < filmek.length; i++) {
        let film = filmek[i];
        let p = document.createElement("p");
        p.textContent = film.cim;
        div.appendChild(p);
    }
}
addEventListener("DOMContentLoaded", betoltes);