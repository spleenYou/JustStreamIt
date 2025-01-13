function addPictureMovie() {
    let pictureMovie = document.createElement("div")
    pictureMovie.appendChild(document.createElement("img"))
    pictureMovie.children[0].setAttribute("src", "img/no_movie.jpg")
    pictureMovie.children[0].setAttribute("alt", "no_movie")
    pictureMovie.appendChild(document.createElement("div"))
    pictureMovie.children[1].classList.add("movieBanner")
    pictureMovie.children[1].appendChild(document.createElement("h2"))
    pictureMovie.children[1].appendChild(document.createElement("button"))
    pictureMovie.children[1].children[1].innerHTML = "Détails"
    return pictureMovie
}

function addToContainer(container, categoryNumber) {
    category = categoryTab.find((cat) => cat.name == categoriesDisplay[categoryNumber])
    container.appendChild(document.createElement("h1"))
    container.children[0].innerHTML = category.title
    container.appendChild(addDivPicturesMovie())
    return title
}

function addDivPicturesMovie() {
    let div = document.createElement("div")
    div.classList.add("picturesMovie")
    for (let i = 0; i < thumbnailNumber.more; i++) {
        div.appendChild(addPictureMovie())
    }
    return div
}

function fillContainers() {
    let containers = document.getElementsByClassName("container")
    for (let i = 0; i < containers.length; i++) {
        if (i != (containers.length - 1)) {
            addToContainer(containers[i], i)
            findNumberPages(categoriesDisplay[i])
        } else {
            containers[i].appendChild(addDivPicturesMovie())
        }
        let button = document.createElement("button")
        button.classList.add("buttonMoreLess")
        button.innerHTML = "Voir plus"
        button.addEventListener("click", (e) => {
            let viewMode = "less"
            if (e.target.innerHTML == "Voir plus") {
                viewMode = "more"
            }
            updateViewPicturesMovie(e.target.parentNode.children[1], viewMode)
        })
        containers[i].appendChild(button)
        updateViewPicturesMovie(containers[i].children[1], "less")
    }
    let imgs = document.getElementsByTagName("img")
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener("error", (e) => {
            e.target.setAttribute("src", "img/error.jpg")
        })
    }
}

function updateViewPicturesMovie(container, viewMode) {
    let viewNumber = thumbnailNumber.more
    container.nextSibling.innerHTML = "Voir moins"
    if (viewMode == "less") {
        container.nextSibling.innerHTML = "Voir plus"
        if (screen.width < 1023) {
            viewNumber = thumbnailNumber.tablet
        }
        if (screen.width < 600) {
            viewNumber = thumbnailNumber.smartphone
        }
    }
    for (let i = 0; i < container.children.length; i++) {
        container.children[i].style.display = i < viewNumber
            ? "block"
            : "none"
    }
}

window.addEventListener("resize", () => {
    let containers = document.getElementsByClassName("container")
    for (let i = 0; i < containers.length; i++) {
        updateViewPicturesMovie(containers[i].children[1], "less")
    }
})