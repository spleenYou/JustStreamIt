// Gestion des requêtes avec l'API
async function APIRequest(endURL) {
    const r = await fetch(startURL + endURL)
    if (r.ok) {
        return r.json()
    }
}

function findNumberPages(categoryName) {
    let category = categoryTab.find((e) => e.name === categoryName)
    APIRequest(category.url).then((res) => {
        let pagesNumber = res.count
        category.moviesTab = []
        category.pagesNumber =  Math.ceil(pagesNumber / 5)
    }).then(() => {
        findMoviesInformation(category)
    })
}

function findMoviesInformation(category) {
    APIRequest(category.url + "&page=" + category.pagesNumber).then((page) => {
        for (let i = page.results.length; i != 0; i--) {
            category.moviesTab.push(page.results[i - 1])
        }
        moviesNumber = category.name != "best"
            ? thumbnailNumber.default
            : thumbnailNumber.default + 1
        if ((category.moviesTab.length < moviesNumber) && (category.pagesNumber > 1)) {
            category.pagesNumber -= 1
            findMoviesInformation(category)
        } else {
            fillCategory(category)
        }
    })
}

function fillCategory(category) {
    let isBest = category.name === "best"
    ? 1
    : 0
    for (let i = 0; i < (thumbnailNumber.default + isBest); i++) {
        let place = document.getElementsByClassName("container")
        let indexCat = categoriesDisplay.findIndex((name) => name == category.name)
        if (indexCat == -1) {
            indexCat = 3
        }
        let thumbnail = place[indexCat].children[1]
        if (i < category.moviesTab.length) {
            APIRequest("titles/" + category.moviesTab[i].id)
            .then((movie) => {
                    let index = i - isBest
                    if (index == -1) {
                        index = 1
                        thumbnail = document.getElementById("bestMovie")
                        thumbnail.children[1].children[1].children[1].innerHTML = movie.description
                        button = bestMovie.getElementsByTagName("button")[0]
                    } else {
                        button = thumbnail.children[index].children[1].children[1]
                        thumbnail.children[index].children[1].style.display = "inherit"
                    }
                    thumbnail.children[index].children[0].setAttribute("src", movie.image_url)
                    thumbnail.children[index].children[0].setAttribute("alt", movie.title + "_image")
                    thumbnail.children[index].children[1].children[0].innerHTML = movie.title
                    button.addEventListener("click", () => {
                        showModal(movie)
                    })
                })
        } else {
            thumbnail.children[i].children[0].setAttribute("src", "img/no_movie.jpg")
            thumbnail.children[i].children[0].setAttribute("alt", "no_movie")
            thumbnail.children[i].children[1].children[0].innerHTML = ""
            thumbnail.children[i].children[1].style.display = "none"
        }
    }
}

function start(next="") {
    let url = "genres/?page=1"
    if (next) {
        url = next.replace(startURL, "")
    }
    APIRequest(url).then((genres) => {
        let genre = {}
        for (let i = 0; i < genres.results.length; i++) {
            genre = {
                id: genres.results[i].id,
                name: genres.results[i].name,
                title: genres.results[i].name,
                moviesTab: [],
                pagesNumber: 0,
                url: "titles/?sort_by=imdb_score&genre=" + genres.results[i].name
            }
            categoryTab.push(genre)
        }
        return genres.next
    }).then((next) => {
        if (next != null) {
            start(next)
        } else {
            fillContainers()
            createSpanCategory()
        }
    })
}

start()