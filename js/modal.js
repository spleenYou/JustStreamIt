// Création du modal

let modal = document.getElementById("modal")
modal.appendChild(document.createElement("div"))
modal.children[0].classList.add("information")
// Croix pour le modal en tablette et smartphone
modal.children[0].appendChild(document.createElement("button"))
modal.children[0].children[0].classList.add("cross")
modal.children[0].children[0].innerHTML = "❌"
// Titre
modal.children[0].appendChild(document.createElement("h2"))
// div pour les informations
modal.children[0].appendChild(document.createElement("div"))
// span pour les informations
modal.children[0].children[2].appendChild(document.createElement("span"))
modal.children[0].children[2].appendChild(document.createElement("span"))
modal.children[0].children[2].appendChild(document.createElement("span"))
modal.children[0].children[2].appendChild(document.createElement("span"))
modal.children[0].children[2].appendChild(document.createElement("span"))
modal.children[0].children[2].children[3].innerHTML = "<br>"
modal.children[0].children[2].appendChild(document.createElement("span"))
modal.children[0].children[2].children[4].innerHTML = "Réalisé par:"
modal.children[0].children[2].appendChild(document.createElement("span"))
modal.children[0].children[2].children[5].classList.add("no-bold")
// Image du film
modal.appendChild(document.createElement("img"))
// Paragraphe pour le résumé
modal.appendChild(document.createElement("p"))
modal.children[2].classList.add("modal-resume")
// Paragraphe pour les acteurs
modal.appendChild(document.createElement("p"))
modal.children[3].classList.add("modal-actors")
// Bouton "fermer"
modal.appendChild(document.createElement("button"))
modal.children[4].innerHTML = "Fermer"

// Gestion du modal
function showModal(movie) {
    // Préparation des informations pour remplir le modal
    let genres = movie.genres.join(", ");
    let countries = movie.countries.join(" / ");
    let directors = movie.directors.join(", ");
    let gross = movie.worldwide_gross_income
        ? parseInt(movie.worldwide_gross_income, 10).toLocaleString('en-US') + "$"
        : "unknown"
    let actors = movie.actors.join(", ");
    let rated = movie.rated !== "Not rated or unknown rating" 
        ? "Not rated"
        : "PG" + movie.rated
    modal.children[0].children[2].children[0].innerHTML = movie.year + " - " + genres
    modal.children[0].children[2].children[1].innerHTML = rated + " - " + movie.duration + " minutes (" + countries + ")"
    modal.children[0].children[2].children[2].innerHTML = "IMDB score: " + movie.imdb_score + "/10"
    modal.children[0].children[2].children[2].innerHTML = "Worlwide gross: " + gross
    modal.children[0].children[2].children[6].innerHTML = directors
    modal.children[0].children[1].innerHTML = movie.title
    modal.children[1].setAttribute("src", movie.image_url)
    modal.children[2].innerHTML = movie.long_description
    modal.children[3].innerHTML = "Avec:<br>" + actors
    // Affichage du modal
    modal.style.display = "grid"
    // Ajout d'un event sur la croix et le bouton "Fermer" pour fermer le modal
    let boutons = modal.getElementsByTagName("button")
    for (let i = 0; i < boutons.length; i++) {
        boutons[i].addEventListener("click", () => {
            modal.style.display = "none"
        })
    }
    // Met l'affichage du modal en haut en cas de scroll
    modal.scroll({
        top: 0,
        left: 0,
        behavior: "instant",
    })
}