const bestMovie = document.getElementById("bestMovie")
const startURL = "http://localhost:8000/api/v1/"

// Gestion des requêtes avec l'API
function APIRequest(endURL) {
    return new Promise((resolve) => {
        let test = fetch(startURL + endURL).then(res => {
            if (res.ok) {
                let reponse = res.json()
                resolve(reponse)
            }
        })
    })
}

// Gestion du modal
function openModal(movie) {
    let modal = document.getElementById("modal")
    let genres = ""
    let countries = ""
    let directors = ""
    let actors = ""
    for (let i = 0; i < movie.genres.length; i++) {
        genres += movie.genres[i]
        if (i < movie.genres.length - 1) {
            genres += ", "
        }
    }
    for (let i = 0; i < movie.actors.length; i++) {
        actors += movie.actors[i]
        if (i < movie.actors.length - 1) {
            actors += ", "
        }
    }
    for (let i = 0; i < movie.directors.length; i++) {
        directors += movie.directors[i]
        if (i < movie.directors.length - 1) {
            directors += ", "
        }
    }
    for (let i = 0; i < movie.countries.length; i++) {
        countries += movie.countries[i]
        if (i < movie.countries.length - 1) {
            countries += " / "
        }
    }
    modal.children[0].children[0].children[1].children[0].innerHTML = movie.year + " - " + genres
    modal.children[0].children[0].children[1].children[1].innerHTML = movie.duration + " minutes (" + countries + ")"
    modal.children[0].children[0].children[1].children[2].innerHTML = "IMDB score: " + movie.imdb_score + "/10"
    modal.children[0].children[0].children[1].children[5].innerHTML = directors
    modal.children[0].children[0].children[0].innerHTML = movie.title
    modal.children[0].children[1].setAttribute("src", movie.image_url)
    modal.children[1].innerHTML = movie.long_description
    modal.children[2].innerHTML = "Avec:<br>" + actors
    modal.style.display = "flex"
    modal.children[3].addEventListener("click", () => {
        modal.style.display = "none"
    })
}

function findBestMovies() {
    APIRequest("titles/?sort_by=imdb_score").then((res) => {
        let numberOfPages = res.count
        let lastPage = Math.ceil(numberOfPages / 5)
        APIRequest("titles/?page=" + lastPage + "&sort_by=imdb_score").then((lastpage) => {
            console.log(lastPage)
        })
    })
}

// Gestion partie "Best movie"
APIRequest("titles/3062096").then((movie) => {
    bestMovie.children[1].children[0].setAttribute("src", movie.image_url)
    bestMovie.children[1].children[0].setAttribute("alt", movie.title + "_image")
    bestMovie.children[1].children[1].children[0].innerHTML = movie.title
    bestMovie.children[1].children[1].children[1].innerHTML = movie.description
    let bestMovieDetailsButton = bestMovie.getElementsByTagName("button")[0]
    bestMovieDetailsButton.addEventListener("click", () => {
        openModal(movie)
    })
})

findBestMovies()