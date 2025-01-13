const startURL = "http://localhost:8000/api/v1/"
let genresTab = []
let page = 1
let categoriesDisplay = ["best", "Fantasy", "Horror"]
let categoryTab = [{
        id: 0,
        name: "best",
        title: "Film les mieux notés",
        moviesTab: [],
        pagesNumber: 0,
        url: "titles/?sort_by=imdb_score"
    }
]
let thumbnailNumber = {
    more: 6,
    smartphone: 2,
    tablet: 4
}
