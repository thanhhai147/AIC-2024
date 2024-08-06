import HandleFrame from "../View/js/handleFrame.js"
import QueryAPI from "../API/queryAPI.js"
import { relevanceFeedbackData } from "../View/js/handleRelevance.js"

let limitQuery = document.getElementById("limit-relevance")
let submit = document.getElementById("relevance-submit-btn")

submit.addEventListener("click", e => {
    let relevanceData = relevanceFeedbackData
    relevanceData.image = Object.keys(relevanceData.image)
    
    QueryAPI.queryRelevance(relevanceData, limitQuery.value)
    .then(res => res.json())
    .then(data => { 
        localStorage.setItem("relevanceSyntheticId", data.syntheticId)
        HandleFrame.loadRelevanceFrame(data.imagePath, data.objectDetection, data.ocr)
    })  
    .catch(err => {
        console.log(err)
    })
})

