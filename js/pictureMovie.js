// Ajout du code HTML pour une image de film
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

// Ajout au conteneur du titre et des vignettes de films
function addToContainer(container, categoryNumber) {
    category = categoryTab.find((cat) => cat.name == categoriesDisplay[categoryNumber])
    container.appendChild(document.createElement("h1"))
    container.children[0].innerHTML = category.title
    container.appendChild(addDivPicturesMovie())
}

// Ajout de la div contenant les vignettes de films
function addDivPicturesMovie() {
    let div = document.createElement("div")
    div.classList.add("picturesMovie")
    for (let i = 0; i < thumbnailNumber.default; i++) {
        div.appendChild(addPictureMovie())
    }
    return div
}

// Remplissage des conteneurs
function fillContainers() {
    // Recherche des conteneurs
    let containers = document.getElementsByClassName("container")
    for (let i = 0; i < containers.length; i++) {
        // S'il s'agit d'un conteneur qui n'est pas la catégorie "other", on remplit le conteneur
        if (i != (containers.length - 1)) {
            addToContainer(containers[i], i)
            findNumberPages(categoriesDisplay[i])
        } else {
            // Sinon on met le code HTML sans remplissage
            containers[i].appendChild(addDivPicturesMovie())
        }
        // Création du bouton "Voir plus"/"Voir moins"
        let button = document.createElement("button")
        button.classList.add("buttonMoreLess")
        button.innerHTML = "Voir plus"
        // Ajout de l'event sur le bouton
        button.addEventListener("click", (e) => {
            let viewMode = ""
            if (e.target.innerHTML == "Voir moins") {
                viewMode = "less"
            }
            // Mise à jour de la vue selon le format d'écran
            updateViewPicturesMovie(e.target.parentNode.children[1], viewMode)
        })
        containers[i].appendChild(button)
        // Mise à jour de la vue selon le format d'écran
        updateViewPicturesMovie(containers[i].children[1], "less")
    }
    // Gestion de l'affichage des img des films si elles n'existent pas
    let imgs = document.getElementsByTagName("img")
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener("error", (e) => {
            e.target.setAttribute("src", "img/error.jpg")
        })
    }
}

// Mise à jour de la vue selon le format d'écran et du texte du bouton
function updateViewPicturesMovie(container, viewMode) {
    let viewNumber = thumbnailNumber.default
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
    // Mise à jour du display selon e nombre à afficher
    for (let i = 0; i < container.children.length; i++) {
        container.children[i].style.display = i < viewNumber
            ? "block"
            : "none"
    }
}

// En cas de modification de l'écran, on met à jour la vue
window.addEventListener("resize", () => {
    let containers = document.getElementsByClassName("container")
    for (let i = 0; i < containers.length; i++) {
        updateViewPicturesMovie(containers[i].children[1], "less")
    }
})