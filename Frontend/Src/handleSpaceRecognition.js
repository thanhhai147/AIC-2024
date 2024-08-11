import chosenSpaceList  from "../View/js/handleSpaceRecognition.js"
import FilterAPI from "../API/filterAPI.js"
import HandleFrame from "../View/js/handleFrame.js"
import { openLoading, closeLoading } from "../View/js/handleLoading.js"

let spaceSubmit = document.getElementById("space-filter-submit")
let spaceRelevanceSubmit = document.getElementById("space-relevance-filter-submit")
let relevanceContainer = document.getElementById('relevance-result-container')

spaceSubmit.addEventListener("click", e => {
    openLoading()
    let syntheticId = localStorage.getItem("syntheticId").split(",")
    let ocr = localStorage.getItem("ocr")
    let objectDetection = JSON.parse(localStorage.getItem("objectDetection"))
    let colorFeature = JSON.parse(localStorage.getItem("colorFeature"))
    let spaceRecognition = Array.from(chosenSpaceList)
    localStorage.setItem("spaceRecognition", JSON.stringify(spaceRecognition))
    let summaryTopic = JSON.parse(localStorage.getItem("summaryTopic"))
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

spaceRelevanceSubmit.addEventListener("click", e => {
    openLoading()
    let syntheticId = localStorage.getItem("relevanceSyntheticId").split(",")
    let ocr = localStorage.getItem("relevanceOcr")
    let objectDetection = JSON.parse(localStorage.getItem("relevanceObjectDetection"))
    let colorFeature = JSON.parse(localStorage.getItem("relevanceColorFeature"))
    let spaceRecognition = Array.from(chosenSpaceList)
    localStorage.setItem("relevanceSpaceRecognition", JSON.stringify(spaceRecognition))
    let summaryTopic = JSON.parse(localStorage.getItem("relevanceSummaryTopic"))
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