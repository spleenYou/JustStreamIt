// Gestion de la catégorie "other"

// Ajout de l'event afficher/fermer pour le menu
document.getElementsByClassName("dropbtn")[0].addEventListener("click", () => {
    document.getElementById("myDropdown").classList.toggle("show")
    toggleArrow()
})

// Fermeture du menu si clique en dehors du menu
window.onclick = function(event) {
  let dropdowns = document.getElementsByClassName("dropdown-content")
  if (!event.target.matches('.dropbtn') && dropdowns[0].classList.contains('show')) {
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove('show')
    }
    toggleArrow()
  }
}

// Création du menu selon les catégories non affichées
function createMenu() {
    // Création du carré vert
    let greenCase = document.createElement("div")
    greenCase.classList.add("green-case")
    greenCase.appendChild(document.createElement("div"))
    greenCase.children[0].classList.add("green-case-front")
    for (let i = 1; i < categoryTab.length; i++) {
        if (!categoriesDisplay.find((cat) => cat == categoryTab[i].name)) {
            // Création du span de la catégorie
            let span
            span = document.createElement("span")
            span.setAttribute("value", categoryTab[i].id)
            span.innerHTML = categoryTab[i].name
            span.addEventListener("click", (e) => {
                // Affichage du nom de la catégorie choisie
                document.getElementsByClassName("dropbtn")[0].innerHTML = e.target.innerHTML
                // Affichage du carré vert dans le menu
                e.target.appendChild(greenCase)
                greenCase.style.display = "inline"
                // Recherche de la catégorie et remplissage des vignettes
                let categoryId = e.target.attributes[0].value
                findNumberPages(categoryTab.find((cat) => cat.id == categoryId).name)
            })
            // Ajout du span au menu
            document.getElementById("myDropdown").appendChild(span)
        }
    }
}

// Gestion de la flèche sur le côté du bouton du menu des catégories
function toggleArrow() {
    let arrowDisplay = document.getElementsByClassName("dropdown-arrow")[0].style.display
    if (arrowDisplay != "none") {
        document.getElementsByClassName("dropdown-arrow")[0].style.display = "none"
    }
    else {
        document.getElementsByClassName("dropdown-arrow")[0].style.display = "block"
    }
}