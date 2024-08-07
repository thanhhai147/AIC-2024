import HandleFrame from "../View/js/handleFrame.js"
import QueryAPI from "../API/queryAPI.js"
import { relevanceFeedbackData } from "../View/js/handleRelevance.js"

let limitQuery = document.getElementById("limit-relevance")
let submit = document.getElementById("relevance-submit-btn")

let relevanceContainer = document.getElementById('relevance-result-container')

submit.addEventListener("click", e => {
    let relevanceData = JSON.parse(JSON.stringify(relevanceFeedbackData))
    relevanceData.image = Object.keys(relevanceData.image)
    
    QueryAPI.queryRelevance(relevanceData, limitQuery.value)
    .then(res => res.json())
    .then(data => { 
        localStorage.setItem("relevanceSyntheticId", data.syntheticId)
        HandleFrame.loadRelevanceFrame(data.imagePath, data.objectDetection, data.ocr)
        relevanceContainer.style.display = 'flex'
    })  
    .catch(err => { 
        console.log(err)
    })
})

