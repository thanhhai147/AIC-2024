import HandleFrame from "../View/js/handleFrame.js"
import QueryAPI from "../API/queryAPI.js"

let textRerankingQuery = document.getElementById("text-ranking-query")
let limitQuery = document.getElementById("limit-ranking-query")
let submit = document.getElementById("submit-ranking-btn")

submit.addEventListener("click", e => {
    if(!textRerankingQuery.value) return 
    let imageQuery = localStorage.getItem("syntheticId").split(",")
    QueryAPI.queryReranking(imageQuery, textRerankingQuery.value, limitQuery.value)
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("syntheticId", data.syntheticId)
        HandleFrame.loadFrame(data.imagePath, data.objectDetection, data.ocr)
    })  
    .catch(err => {
        console.log(err)
    })
})

