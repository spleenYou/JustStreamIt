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
    for (let i = 0; i < genresTab.length; i++) {
        span = document.createElement("span")
        span.setAttribute("value", genresTab[i].id)
        span.innerHTML = genresTab[i].name
        myDropdown.appendChild(span)
    }
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