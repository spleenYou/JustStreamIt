let modal = document.createElement("modal")
modal.setAttribute("id", "modal")

modal.appendChild(document.createElement("div"))
modal.appendChild(document.createElement("img"))
modal.appendChild(document.createElement("p"))
modal.appendChild(document.createElement("p"))
modal.appendChild(document.createElement("button"))

modal.children[0].classList.add("information")
modal.children[0].appendChild(document.createElement("button"))
modal.children[0].children[0].classList.add("cross")
modal.children[0].children[0].innerHTML = "❌"
modal.children[0].appendChild(document.createElement("h2"))
modal.children[0].appendChild(document.createElement("div"))
modal.children[0].children[2].appendChild(document.createElement("span"))
modal.children[0].children[2].appendChild(document.createElement("span"))
modal.children[0].children[2].appendChild(document.createElement("span"))
modal.children[0].children[2].appendChild(document.createElement("span"))
modal.children[0].children[2].appendChild(document.createElement("span"))
modal.children[0].children[2].appendChild(document.createElement("span"))
modal.children[0].children[2].children[3].innerHTML = "<br>"
modal.children[0].children[2].children[4].innerHTML = "Réalisé par:"
modal.children[0].children[2].children[5].classList.add("no-bold")
modal.children[1].setAttribute("src", "")
modal.children[1].setAttribute("alt", "")
modal.children[2].classList.add("modal-resume")
modal.children[3].classList.add("modal-actors")
modal.children[4].innerHTML = "Fermer"