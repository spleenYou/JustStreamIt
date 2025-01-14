// Gestion des requêtes avec l'API
async function APIRequest(endURL) {
    const r = await fetch(startURL + endURL)
    if (r.ok) {
        return r.json()
    }
}

// Recherche le nmobre max de pages d'une catégorie
function findNumberPages(categoryName) {
    // récupère l'objet de la catégorie
    let category = categoryTab.find((e) => e.name === categoryName)
    APIRequest(category.url).then((res) => {
        // Récupération du nombre de films retournés par l'API
        let pagesNumber = res.count
        // Reset du tableau des films
        category.moviesTab = []
        // calcul du nombre de pages correspondantes (5 films par pages)
        // Utilisation de .ceil pour récupoérer le nombre supérieur en cas de virgule
        category.pagesNumber =  Math.ceil(pagesNumber / 5)
    }).then(() => {
        // On lmance la recherche d'information sur les films
        findMoviesInformation(category)
    })
}

// Recherche d'informations sur les films
function findMoviesInformation(category, previousURL) {
    url = previousURL
        ? previousURL.replace(startURL, "")
        : category.url + "&page=" + category.pagesNumber
    // Requête sur la page de la catégorie
    APIRequest(url).then((page) => {
        // Mets les films contenus dans la réponse dans le tableau en ordre inverse (la note la plus haute en premier)
        for (let i = page.results.length; i != 0; i--) {
            category.moviesTab.push(page.results[i - 1])
        }
        // Si on recherche les meilleurs films, il faut un film en plus (film top + les vignettes en dessous)
        moviesNumber = category.name != "best"
            ? thumbnailNumber.default
            : thumbnailNumber.default + 1
        // vérifie si on a atteint le nombre de films voulus ou s'il n'y a plus de films à chercher
        if ((category.moviesTab.length < moviesNumber) && (page.previous != null)) {
            findMoviesInformation(category, page.previous)
        } else {
            // Remplissage des catégories si les informations sont complètes
            fillCategory(category)
        }
    })
}

// Remplissage de l'HTML
function fillCategory(category) {
    let isBest = category.name === "best"
    ? 1
    : 0
    for (let i = 0; i < (thumbnailNumber.default + isBest); i++) {
        // Recherche des conteneur pour l'affichage des vignettes
        let place = document.getElementsByClassName("container")
        // Calcul pour savoir où afficher la catégorie
        let indexCat = categoriesDisplay.findIndex((name) => name == category.name)
        // Si la catégorie n'est pas dans le tableau alors c'est la catégorie "other"
        if (indexCat == -1) {
            indexCat = 3
        }
        let thumbnail = place[indexCat].children[1]
        if (i < category.moviesTab.length) {
            // Recherche des information sur un film
            APIRequest("titles/" + category.moviesTab[i].id)
            .then((movie) => {
                // Remplissage de la vignette
                let index = i - isBest
                // si affichage du meilleur film, on adapte le code
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
            // S'il n'ya plus de film à afficher, on met une image par défaut et on n'affiche pas la bannière
            thumbnail.children[i].children[0].setAttribute("src", "img/no_movie.jpg")
            thumbnail.children[i].children[0].setAttribute("alt", "no_movie")
            thumbnail.children[i].children[1].children[0].innerHTML = ""
            thumbnail.children[i].children[1].style.display = "none"
        }
    }
}

// Départ en cherchant les catégories
function start(url) {
    APIRequest(url).then((genres) => {
        // Création des tableaux par catégorie
        for (let i = 0; i < genres.results.length; i++) {
            categoryTab.push({
                id: genres.results[i].id,
                name: genres.results[i].name,
                title: genres.results[i].name,
                moviesTab: [],
                pagesNumber: 0,
                url: "titles/?sort_by=imdb_score&genre=" + genres.results[i].name
            })
        }
        return genres.next
    }).then((next) => {
        // S'il y a une page suivante, on relance la recherche sinon on continue le programme
        if (next != null) {
            // On envoie l'url sans le début
            start(next.replace(startURL, ""))
        } else {
            // Remplissage des conteneurs
            fillContainers()
            // Création du menu déroulant
            createSpanCategory()
        }
    })
}

start("genres/?page=1")