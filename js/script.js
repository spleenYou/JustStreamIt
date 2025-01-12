const startURL = "http://localhost:8000/api/v1/"
let genresTab = []
let page = 1

// Gestion des requêtes avec l'API
async function APIRequest(endURL) {
    const r = await fetch(startURL + endURL)
    if (r.ok) {
        return r.json()
    }
}

function findNumberPages(searchURL, place) {
    let bestMoviesTab = []
    APIRequest(searchURL).then((res) => {
        let numberOfPages = res.count
        let pageNumber = 1
        if (res.count >= 6) {
            pageNumber = Math.trunc(numberOfPages / 5) - 1
        }
        return pageNumber
    }).then((pageNumber) => {
        bestMoviesTab = []
        findBestMovies(searchURL, pageNumber, place, bestMoviesTab)
    })
}

function findBestMovies(searchURL, pageNumber, place, bestMoviesTab) {
    APIRequest(searchURL + "&page=" + pageNumber).then((page) => {
        page.results.forEach(movie => {
            bestMoviesTab.push(movie)
        })
        if (page.next != null) {
            pageNumber += 1
            findBestMovies(searchURL, pageNumber, place, bestMoviesTab)
        } else {
            if (place === "bestMovies") {
                fillBestMovies(bestMoviesTab)
            } else {
                fillCategory(bestMoviesTab, place)
            }
        }
    })
}

function fillBestMovies(bestMoviesTab) {
    const bestMovie = document.getElementById("bestMovie")
    APIRequest("titles/" + bestMoviesTab.pop().id)
    .then((movie) => {
        bestMovie.children[1].children[0].setAttribute("src", movie.image_url)
        bestMovie.children[1].children[0].setAttribute("alt", movie.title + "_image")
        bestMovie.children[1].children[1].children[0].innerHTML = movie.title
        bestMovie.children[1].children[1].children[1].innerHTML = movie.description
        let bestMovieDetailsButton = bestMovie.getElementsByTagName("button")[0]
        bestMovieDetailsButton.addEventListener("click", () => {
            showModal(movie)
        })
    })
    let bestMoviesElt = bestMovie.nextElementSibling
    fillCategory(bestMoviesTab, bestMoviesElt)
}

function fillCategory(bestMoviesTab, place) {
    let thumbnail = place.children[1]
    for (let i = 0; i < 6; i++) {
        if (bestMoviesTab.length > 0) {
            APIRequest("titles/" + bestMoviesTab.pop().id)
            .then((movie) => {
                thumbnail.children[i].children[0].setAttribute("src", movie.image_url)
                thumbnail.children[i].children[0].setAttribute("alt", movie.title + "_image")
                thumbnail.children[i].children[1].children[0].innerHTML = movie.title
                thumbnail.children[i].children[1].style.display = "inherit"
                thumbnail.children[i].children[1].children[1].addEventListener("click", () => {
                    showModal(movie)
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

function findNameCategory(id) {
    return genresTab.find((category) => category.id == id).name
}

function startFilled() {
    findNumberPages("titles/?sort_by=imdb_score", "bestMovies")
    let place = document.getElementsByClassName("container")
    findNumberPages("titles/?sort_by=imdb_score&genre=" + findNameCategory(7), place[1])
    findNumberPages("titles/?sort_by=imdb_score&genre=" + findNameCategory(10), place[2])
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
            findNumberPages("titles/?sort_by=imdb_score&genre=" + findNameCategory(e.target.attributes[0].value), place[3])
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

function start() {
    let genre = {}
    APIRequest(`genres/?page=${page}`).then((genres) => {
        for (let i = 0; i < genres.results.length; i++) {
            genre = {
                id: genres.results[i].id,
                name: genres.results[i].name
            }
            genresTab.push(genre)
        }
        return genres.next
    }).then((next) => {
        if (next != null) {
        page += 1
            start(page)
        } else {
            createSpanCategory()
        }
    })
}

function createSpanCategory() {
    let span
    let myDropdown = document.getElementById("myDropdown")
    for (let i = 0; i < genresTab.length; i++) {
        span = document.createElement("span")
        span.setAttribute("value", genresTab[i].id)
        span.innerHTML = genresTab[i].name
        myDropdown.appendChild(span)
    }
    startFilled()
}

let imgs = document.getElementsByTagName("img")
for (let i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener("error", (e) => {
        e.target.setAttribute("src", "img/error.jpg")
    })
}

start()