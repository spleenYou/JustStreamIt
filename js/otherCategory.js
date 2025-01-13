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

function createSpanCategory() {
    let span
    let myDropdown = document.getElementById("myDropdown")
    for (let i = 1; i < categoryTab.length; i++) {
        // console.log(categoryDisplay.find((cat) => cat == categoryTab[i].name))
        if (!categoryDisplay.find((cat) => cat == categoryTab[i].name)) {
            console.log(i, categoryTab[i].name)
            span = document.createElement("span")
            span.setAttribute("value", categoryTab[i].id)
            span.innerHTML = categoryTab[i].name
            myDropdown.appendChild(span)
            span.addEventListener("click", (e) => {
                let dropBtnElt = document.getElementsByClassName("dropbtn")[0]
                dropBtnElt.innerHTML = e.target.innerHTML
                e.target.appendChild(greenCase)
                greenCase.style.display = "inline"
                findNumberPages(findNameCategory(e.target.attributes[0].value))
            })
        }
    }
    let greenCase = document.createElement("div")
    greenCase.classList.add("green-case")
    greenCase.appendChild(document.createElement("div"))
    greenCase.children[0].classList.add("green-case-front")
    startFilled()
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