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

function findBestMovies(param, place="") {
    let genre = ""
    if (param > 0) {
        genre = genresTab[param]
        searchURL = "?sort_by=imdb_score&genre=" + genre
    } else if (param == 0) {
        searchURL = "?sort_by=imdb_score"
    }
    let bestMovies = []
    APIRequest("titles/" + searchURL).then((res) => {
        let numberOfPages = res.count
        let pageNumber = Math.trunc(numberOfPages / 5) - 1
        APIRequest("titles/?page=" + pageNumber + "&sort_by=imdb_score&genre=" + genre).then((page) => {
            page.results.forEach(movie => {
                bestMovies.push(movie)
            });
        }).then(() => {
            APIRequest("titles/?page=" + (pageNumber + 1) + "&sort_by=imdb_score&genre=" + genre).then((page) => {
                page.results.forEach(movie => {
                    bestMovies.push(movie)
                });
            }).then(() => {
                APIRequest("titles/?page=" + (pageNumber + 2) + "&sort_by=imdb_score&genre=" + genre).then((page) => {
                    page.results.forEach(movie => {
                        bestMovies.push(movie)
                    });
                }).then(() => {
                    if (param > 0) {
                        fillCategory(bestMovies, place)
                    } else if (param == 0) {
                        fillBestMovies(bestMovies)
                    }
                })
            })
        })
    })
}

function fillBestMovies(bestMovies) {
    APIRequest("titles/" + bestMovies.pop().id).then((movie) => {
        const bestMovie = document.getElementById("bestMovie").children[1]
        bestMovie.children[0].setAttribute("src", movie.image_url)
        bestMovie.children[0].setAttribute("alt", movie.title + "_image")
        bestMovie.children[1].children[0].innerHTML = movie.title
        bestMovie.children[1].children[1].innerHTML = movie.description
        let bestMovieDetailsButton = bestMovie.getElementsByTagName("button")[0]
        bestMovieDetailsButton.addEventListener("click", () => {
            openModal(movie)
        })
    })
    let bestMoviesElt = document.getElementById("bestMovies").children[1]
    for (let i = 0; i < 6; i++) {
        APIRequest("titles/" + bestMovies.pop().id).then((movie) => {
            bestMoviesElt.children[i].children[0].setAttribute("src", movie.image_url)
            bestMoviesElt.children[i].children[0].setAttribute("alt", movie.title + "_image")
            bestMoviesElt.children[i].children[1].children[0].innerHTML = movie.title
            bestMoviesElt.children[i].children[1].children[1].addEventListener("click", () => {
                openModal(movie)
            })
        })
    }
}

function fillCategory(bestMovies, place) {
    let thumbnail = place.children[1]
    for (let i = 0; i < 6; i++) {
        APIRequest("titles/" + bestMovies.pop().id).then((movie) => {
            thumbnail.children[i].children[0].setAttribute("src", movie.image_url)
            thumbnail.children[i].children[0].setAttribute("alt", movie.title + "_image")
            thumbnail.children[i].children[1].children[0].innerHTML = movie.title
            thumbnail.children[i].children[1].children[1].addEventListener("click", () => {
                openModal(movie)
            })
        })
    }
}

function startFilled() {
    findBestMovies(0)
    place = document.getElementsByClassName("container")
    findBestMovies(7, place[1])
    findBestMovies(10, place[2])
}

startFilled()