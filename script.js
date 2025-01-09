const startURL = "http://localhost:8000/api/v1/"
let genresTab = [undefined, "Romance", "Biography", "Crime", "Drama", "History", "Adventure", "Fantasy", "War", "Mystery", "Horror", "Western", "Comedy", "Family", "Action", "Sci-Fi", "Thriller", "Sport", "Animation", "Musical", "Music", "Film-Noir", "Adult", "Documentary", "Reality-TV", "News"]

// Gestion des requêtes avec l'API
async function APIRequest(endURL) {
    const r = await fetch(startURL + endURL)
    if (r.ok) {
        return r.json()
    }
}

// Gestion du modal
function openModal(movie) {
    let modal = document.getElementById('modal')
    let genres = ""
    let countries = ""
    let directors = ""
    let actors = ""
    let rated = ""
    if (movie.rated !== "Not rated or unkown rating") {
        rated = "PG" + movie.rated
    } else {
        rated = "No rated"
    }
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

let bestMovies = []
function findNumberPages(searchURL, place) {
    bestMovies = []
    APIRequest(searchURL).then((res) => {
        let numberOfPages = res.count
        let pageNumber = 1
        if (res.count >= 6) {
            pageNumber = Math.trunc(numberOfPages / 5) - 1
        }
        return pageNumber
    }).then((pageNumber) => {
        findBestMovies(searchURL, pageNumber, place)
    })
}

function findBestMovies(searchURL, pageNumber, place) {
    APIRequest(searchURL + "&page=" + pageNumber).then((page) => {
        page.results.forEach(movie => {
            bestMovies.push(movie)
        })
        if (page.next) {
            pageNumber += 1
            findBestMovies(searchURL, pageNumber, place)
        } else {
            if (place === "bestMovies") {
                fillBestMovies()
            } else {
                fillCategory(place)
            }
        }
    })
}

function fillBestMovies() {
    const bestMovie = document.getElementById("bestMovie")
    APIRequest("titles/" + bestMovies.pop().id).then((movie) => {
        bestMovie.children[1].children[0].setAttribute("src", movie.image_url)
        bestMovie.children[1].children[0].setAttribute("alt", movie.title + "_image")
        bestMovie.children[1].children[1].children[0].innerHTML = movie.title
        bestMovie.children[1].children[1].children[1].innerHTML = movie.description
        let bestMovieDetailsButton = bestMovie.getElementsByTagName("button")[0]
        bestMovieDetailsButton.addEventListener("click", (e) => {
            openModal(movie)
        })
    })
    let bestMoviesElt = bestMovie.nextElementSibling
    fillCategory(bestMoviesElt)
}

function fillCategory(place) {
    let thumbnail = place.children[1]
    for (let i = 0; i < 6; i++) {
        if (bestMovies.length > 0) {
            APIRequest("titles/" + bestMovies.pop().id)
            .then((movie) => {
                thumbnail.children[i].children[0].setAttribute("src", movie.image_url)
                thumbnail.children[i].children[0].setAttribute("alt", movie.title + "_image")
                thumbnail.children[i].children[1].children[0].innerHTML = movie.title
                thumbnail.children[i].children[1].style.display = "inherit"
                thumbnail.children[i].children[1].children[1].addEventListener("click", (e) => {
                    openModal(movie)
                })
            })
        } else {
            thumbnail.children[i].children[0].setAttribute("src", "img/no_movie.jpg")
            thumbnail.children[i].children[0].setAttribute("alt", "Error")
            thumbnail.children[i].children[1].children[0].innerHTML = ""
            thumbnail.children[i].children[1].style.display = "none"
        }
    }
}

function startFilled() {
    findNumberPages("titles/?sort_by=imdb_score", "bestMovies")
    let place = document.getElementsByClassName("container")
    findNumberPages("titles/?sort_by=imdb_score&genre=" + genresTab[7], place[1])
    findNumberPages("titles/?sort_by=imdb_score&genre=" + genresTab[10], place[2])
    let select = document.getElementsByName("otherCategory")
    let greenCase = document.createElement("div")
    greenCase.classList.add("green-case")
    greenCase.appendChild(document.createElement("div"))
    greenCase.children[0].classList.add("green-case-front")

    let dropdowns = document.getElementsByClassName("dropdown-content")
    for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].addEventListener("click", (e) => {
            let dropBtnElt = document.getElementsByClassName("dropbtn")[0]
            dropBtnElt.innerHTML = e.target.innerHTML
            e.target.appendChild(greenCase)
            greenCase.style.display = "inline"
            findNumberPages("titles/?sort_by=imdb_score&genre=" + genresTab[e.target.attributes[0].value], place[3])
        })
    }
}

function toggleArrow() {
    let arrowDisplay = document.getElementsByClassName("dropdown-arrow")[0].style.display
    if (arrowDisplay != "none") {
        document.getElementsByClassName("dropdown-arrow")[0].style.display = "none"
    }
    else {
        document.getElementsByClassName("dropdown-arrow")[0].style.display = "block"
    }
}

document.getElementsByClassName("dropbtn")[0].addEventListener("click", () => {
    document.getElementById("myDropdown").classList.toggle("show")
    toggleArrow()
})

window.onclick = function(event) {
  let dropdowns = document.getElementsByClassName("dropdown-content")
  if (!event.target.matches('.dropbtn') && dropdowns[0].classList.contains('show')) {
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove('show')
    }
    toggleArrow()
  }
}

startFilled()

let imgs = document.getElementsByTagName("img")
for (let i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener("error", (e) => {
        e.target.setAttribute("src", "img/error.jpg")
    })
}