let proportionInput = document.getElementById("proportion")
let bertProportion = document.getElementById("bert-proportion")
let clipProportion = document.getElementById("clip-proportion")



proportionInput.addEventListener("input", e => {
    bertProportion.innerHTML = e.target.value
    clipProportion.innerHTML = 100 - e.target.value

    localStorage.setItem("queryProportion", JSON.stringify({
        "bert": e.target.value,
        "clip": 100 - e.target.value
    }))
})

