import chosenTopicList from "../View/js/handleSummary.js"
import FilterAPI from "../API/filterAPI.js"
import HandleFrame from "../View/js/handleFrame.js"
import { openLoading, closeLoading } from "../View/js/handleLoading.js"

let summarySubmit = document.getElementById("summary-filter-submit")
let summaryRelevanceSubmit = document.getElementById("summary-relevance-filter-submit")
let relevanceContainer = document.getElementById('relevance-result-container')

summarySubmit.addEventListener("click", e => {
    openLoading()
    let syntheticId = localStorage.getItem("syntheticId").split(",")
    let ocr = localStorage.getItem("ocr")
    let objectDetection = JSON.parse(localStorage.getItem("objectDetection"))
    let colorFeature = JSON.parse(localStorage.getItem("colorFeature"))
    let spaceRecognition = JSON.parse(localStorage.getItem("spaceRecognition"))
    let summaryTopic = Array.from(chosenTopicList)
    localStorage.setItem("summaryTopic", JSON.stringify(summaryTopic))
    FilterAPI.filterByAllModels(syntheticId, ocr, objectDetection, colorFeature, spaceRecognition, summaryTopic)
    .then(res => res.json())
    .then(data => {
        if(data.success) HandleFrame.loadFrame(
            data.imagePath, 
            data.objectDetection, 
            data.ocr, 
            data.colorFeature, 
            data.spaceRecognition,
            data.summary
        )
    })
    .catch(err => console.log(err))
    .finally(() => closeLoading())
})

summaryRelevanceSubmit.addEventListener("click", e => {
    openLoading()
    let syntheticId = localStorage.getItem("relevanceSyntheticId").split(",")
    let ocr = localStorage.getItem("relevanceOcr")
    let objectDetection = JSON.parse(localStorage.getItem("relevanceObjectDetection"))
    let colorFeature = JSON.parse(localStorage.getItem("relevanceColorFeature"))
    let spaceRecognition = JSON.parse(localStorage.getItem("relevanceSpaceRecognition"))
    let summaryTopic = Array.from(chosenTopicList)
    localStorage.setItem("relevanceSummaryTopic", JSON.stringify(summaryTopic))
    FilterAPI.filterByAllModels(syntheticId, ocr, objectDetection, colorFeature, spaceRecognition, summaryTopic)
    .then(res => res.json())
    .then(data => {
        if(data.success) HandleFrame.loadRelevanceFrame(
            data.imagePath, 
            data.objectDetection, 
            data.ocr, 
            data.colorFeature, 
            data.spaceRecognition,
            data.summary
        )
        relevanceContainer.style.display = "flex"
    })
    .catch(err => console.log(err))
    .finally(() => closeLoading())
})