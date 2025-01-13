let thumbnailNumber = 6

function addPictureMovie() {
    let pictureMovie = document.createElement("div")
    pictureMovie.appendChild(document.createElement("img"))
    pictureMovie.appendChild(document.createElement("div"))
    pictureMovie.children[1].classList.add("movieBanner")
    pictureMovie.children[1].appendChild(document.createElement("h2"))
    pictureMovie.children[1].appendChild(document.createElement("button"))
    pictureMovie.children[1].children[1].innerHTML = "Détails"
    return pictureMovie
}