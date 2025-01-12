// Création du modal


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