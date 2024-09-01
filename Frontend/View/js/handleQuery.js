let proportionInput = document.getElementById("proportion")
let bertProportion = document.getElementById("bert-proportion")
let clipProportion = document.getElementById("clip-proportion")



proportionInput.addEventListener("input", e => {
    bertProportion.value = e.target.value
    clipProportion.value = 100 - e.target.value

    localStorage.setItem("queryProportion", JSON.stringify({
        "bert": e.target.value,
        "clip": 100 - e.target.value
    }))
})

bertProportion.addEventListener("input", e => {
    clipProportion.value = 100 - e.target.value
    proportionInput.value = e.target.value

    localStorage.setItem("queryProportion", JSON.stringify({
        "bert": e.target.value,
        "clip": 100 - e.target.value
    }))
})


clipProportion.addEventListener("input", e => {
    bertProportion.value = 100 - e.target.value
    proportionInput.value = 100 - e.target.value

    localStorage.setItem("queryProportion", JSON.stringify({
        "bert": 100 - e.target.value,
        "clip": e.target.value
    }))
})


