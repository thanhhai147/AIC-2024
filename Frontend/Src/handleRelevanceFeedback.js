import HandleFrame from "../View/js/handleFrame.js"
import QueryAPI from "../API/queryAPI.js"
import { relevanceFeedbackData } from "../View/js/handleRelevance.js"
import { openLoading, closeLoading } from "../View/js/handleLoading.js"
import { loadRelevanceImage } from "./handleImage.js"

let limitQuery = document.getElementById("limit-relevance")
let submit = document.getElementById("relevance-submit-btn")

let relevanceContainer = document.getElementById('relevance-result-container')

submit.addEventListener("click", e => {
    openLoading()
    let relevanceData = JSON.parse(JSON.stringify(relevanceFeedbackData))
    relevanceData.image = Object.keys(relevanceData.image)
    const queryProportion = JSON.parse(localStorage.getItem("queryProportion"))
    QueryAPI.queryRelevance(relevanceData, limitQuery.value, queryProportion.bert, queryProportion.clip)
    .then(res => res.json())
    .then(data => { 
        localStorage.setItem("relevanceSyntheticId", data.syntheticId)
        if(data.success) HandleFrame.loadRelevanceFrame(
            data.imagePath, 
            data.objectDetection, 
            data.ocr, 
            data.colorFeature, 
            data.spaceRecognition,
            data.summary
        )
        relevanceContainer.style.display = 'flex'
        relevanceContainer.style.transform = 'translateX(0px)'
        return data.syntheticId
    })  
    .then(syntheticIdList => {
        console.log(document.getElementById("canvas-relevance-L27-V011-L27"))
        return syntheticIdList
    })
    .then(syntheticIdList => Promise.all(syntheticIdList.map(syntheticId => loadRelevanceImage(syntheticId))))
    .catch(err => { 
        console.log(err)
    })
    .finally(() => closeLoading())
})

