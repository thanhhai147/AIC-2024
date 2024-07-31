import HandleFrame from "../View/js/handleFrame.js"

let textQuery = document.getElementById("text-query")
let limitQuery = document.getElementById("limit-query")
let submit = document.getElementById("submit-btn")

submit.addEventListener("click", e => {
    fetch(
        `http://localhost:8000/query?text=${textQuery.value}&limit=${limitQuery.value}`, 
        {
            method: "GET",
            mode: "cors"
        }
    )
    .then(res => res.json())
    .then(data => {
        HandleFrame.loadFrame(data.imagePath, data.scores)
    })  
    .catch(err => {
        console.log(err)
    })
})

