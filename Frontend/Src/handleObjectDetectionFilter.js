import chosenLables from "../View/js/handleObjectDetection.js"
import FilterAPI from "../API/filterAPI.js"
import HandleFrame from "../View/js/handleFrame.js"
import { openLoading, closeLoading } from "../View/js/handleLoading.js"
import { loadImage, loadRelevanceImage } from "./handleImage.js"

let objectDetectionSubmit = document.getElementById("obj-filter-submit")
let objectDetectionRelevanceSubmit = document.getElementById("obj-relevance-filter-submit")
let objectDetectionAllSubmit = document.getElementById("obj-all-filter-submit")
let relevanceContainer = document.getElementById('relevance-result-container')

objectDetectionSubmit.addEventListener("click", e => {
    openLoading()
    let syntheticId = localStorage.getItem("syntheticId").split(",")
    let ocr = localStorage.getItem("ocr")
    let objectDetection = Object.values(chosenLables)
    localStorage.setItem("objectDetection", JSON.stringify(objectDetection))
    let colorFeature = JSON.parse(localStorage.getItem("colorFeature"))
    let spaceRecognition = JSON.parse(localStorage.getItem("spaceRecognition"))
    let summaryTopic = JSON.parse(localStorage.getItem("summaryTopic"))
    FilterAPI.filterByAllModels(syntheticId, ocr, objectDetection, colorFeature, spaceRecognition, summaryTopic)
    .then(res => res.json())
    .then(data => {
        if(data.success) HandleFrame.loadFrame(
            data.syntheticId, 
            data.objectDetection, 
            data.ocr, 
            data.colorFeature, 
            data.spaceRecognition,
            data.summary
        )
        return data.syntheticId
    })
    .then(syntheticIdList => Promise.all(syntheticIdList.map(syntheticId => loadImage(syntheticId))))
    .catch(err => console.log(err))
    .finally(() => closeLoading())
})

objectDetectionAllSubmit.addEventListener("click", e => {
    openLoading()
    let ocr = localStorage.getItem("ocr")
    let objectDetection = Object.values(chosenLables)
    localStorage.setItem("objectDetection", JSON.stringify(objectDetection))
    let colorFeature = JSON.parse(localStorage.getItem("colorFeature"))
    let spaceRecognition = JSON.parse(localStorage.getItem("spaceRecognition"))
    let summaryTopic = JSON.parse(localStorage.getItem("summaryTopic"))
    FilterAPI.filterAllByAllModels(ocr, objectDetection, colorFeature, spaceRecognition, summaryTopic)
    .then(res => res.json())
    .then(data => {
        if(data.success) HandleFrame.loadFrame(
            data.syntheticId, 
            data.objectDetection, 
            data.ocr, 
            data.colorFeature, 
            data.spaceRecognition,
            data.summary
        )
        return data.syntheticId
    })
    .then(syntheticIdList => Promise.all(syntheticIdList.map(syntheticId => loadImage(syntheticId))))
    .catch(err => console.log(err))
    .finally(() => closeLoading())
})

objectDetectionRelevanceSubmit.addEventListener("click", e => {
    openLoading()
    let syntheticId = localStorage.getItem("relevanceSyntheticId").split(",")
    let ocr = localStorage.getItem("relevanceOcr")
    let objectDetection = Object.values(chosenLables)
    localStorage.setItem("relevanceObjectDetection", JSON.stringify(objectDetection))
    let colorFeature = JSON.parse(localStorage.getItem("relevanceColorFeature"))
    let spaceRecognition = JSON.parse(localStorage.getItem("relevanceSpaceRecognition"))
    let summaryTopic = JSON.parse(localStorage.getItem("relevanceSummaryTopic"))
    FilterAPI.filterByAllModels(syntheticId, ocr, objectDetection, colorFeature, spaceRecognition, summaryTopic)
    .then(res => res.json())
    .then(data => {
        if(data.success) HandleFrame.loadRelevanceFrame(
            data.syntheticId, 
            data.objectDetection, 
            data.ocr, 
            data.colorFeature, 
            data.spaceRecognition,
            data.summary
        )
        relevanceContainer.style.display = "flex"
        relevanceContainer.style.transform = 'translateX(0px)'
        return data.syntheticId
    })
    .then(syntheticIdList => Promise.all(syntheticIdList.map(syntheticId => loadRelevanceImage(syntheticId))))
    .catch(err => console.log(err))
    .finally(() => closeLoading())
})