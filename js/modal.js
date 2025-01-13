// Création du modal
{/*
<div class="information">
    <button class="cross">❌</button>
    <h2></h2>
    <div>
        <span></span>
        <span></span>
        <span></span>
        <span><br></span>
        <span>Réalisé par:</span>
        <span class="no-bold"></span>  
    </div>
</div>
<img src="" alt="">
<p class="modal-resume"></p>
<p class="modal-actors"></p>
<button>Fermer</button> */}

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
modal.children[0].children[2].children[3].innerHTML = "<br>"
modal.children[0].children[2].appendChild(document.createElement("span"))
modal.children[0].children[2].children[4].innerHTML = "Réalisé par:"
modal.children[0].children[2].appendChild(document.createElement("span"))
modal.children[0].children[2].children[5].classList.add("no-bold")
// Image du film
modal.appendChild(document.createElement("img"))
modal.appendChild(document.createElement("p"))
modal.children[2].classList.add("modal-resume")
modal.appendChild(document.createElement("p"))
modal.children[3].classList.add("modal-actors")
modal.appendChild(document.createElement("button"))
modal.children[4].innerHTML = "Fermer"

// Gestion du modal
function showModal(movie) {
    let modal = document.getElementById('modal')
    let genres = movie.genres.join(", ");
    let countries = movie.countries.join(" / ");
    let directors = movie.directors.join(", ");
    let actors = movie.actors.join(", ");
    let rated = movie.rated !== "Not rated or unknown rating" 
        ? "Not rated"
        : "PG" + movie.rated
    modal.children[0].children[2].children[0].innerHTML = movie.year + " - " + genres
    modal.children[0].children[2].children[1].innerHTML = rated + " - " + movie.duration + " minutes (" + countries + ")"
    modal.children[0].children[2].children[2].innerHTML = "IMDB score: " + movie.imdb_score + "/10"
    modal.children[0].children[2].children[5].innerHTML = directors
    modal.children[0].children[1].innerHTML = movie.title
    modal.children[1].setAttribute("src", movie.image_url)
    modal.children[2].innerHTML = movie.long_description
    modal.children[3].innerHTML = "Avec:<br>" + actors
    modal.style.display = "grid"
    let bouton = modal.getElementsByTagName("button")
    for (let i = 0; i < bouton.length; i++) {
        bouton[i].addEventListener("click", () => {
            modal.style.display = "none"
        })
    }
    modal.scroll({
        top: 0,
        left: 0,
        behavior: "instant",
    })
}