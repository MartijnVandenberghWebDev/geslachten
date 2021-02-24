"use strict";
const tbody = document.querySelector("tbody");
leesJSON();

async function leesJSON() {
    const response = await fetch("geslachten.json");
    if (!response.ok) {
        document.getElementById("nietGevonden").hidden = false;
    } else {
        document.getElementById("nietGevonden").hidden = true;
        const users = await response.json();
        const categorie = "allen";
        toonUsers(users, categorie);
        const hyperlinks = document.querySelectorAll("#categorieën a");
        for (const hyperlink of hyperlinks) {
            hyperlink.onclick = function () {
                while (tbody.rows.length !== 0){
                    tbody.deleteRow(0);
                };
                const categorie = hyperlink.dataset.geslacht;
                console.log(categorie);
                toonUsers(users, categorie);
            }
        }
    }
}

function toonUsers(users, categorie) {
    for (const user of users) {
        if (user.geslacht === categorie || categorie === "allen") {
            const tr = tbody.insertRow();
            const celVoornaam = tr.insertCell();
            celVoornaam.innerText = user.voornaam;
            const celFamilienaam = tr.insertCell();
            celFamilienaam.innerText = user.familienaam;
            const celGeslacht = tr.insertCell();
            const afbeeldingGeslacht = document.createElement("img")
            afbeeldingGeslacht.src = `${user.geslacht}.png`;
            celGeslacht.appendChild(afbeeldingGeslacht);
            const celFoto = tr.insertCell();
            const fotoUser = document.createElement("img");
            fotoUser.src = user.foto;
            celFoto.appendChild(fotoUser);
        }
    }
}