// Main variables for JS

// début de l'URL de l'api
const startURL = "http://localhost:8000/api/v1/"

let page = 1
// Tableau avec les catégories affichées
let categoriesDisplay = ["best", "Fantasy", "Horror"]
// Tableau pour gérer les informations des catégories
let categoryTab = [{
        id: 0,
        name: "best",
        title: "Film les mieux notés",
        moviesTab: [],
        pagesNumber: 0,
        url: "titles/?sort_by=imdb_score"
    }
]
// Tableau pour le nombre de vignettes selon le format
let thumbnailNumber = {
    default: 6,
    smartphone: 2,
    tablet: 4
}
