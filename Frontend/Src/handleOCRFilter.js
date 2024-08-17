import chosenOCR from "../View/js/handleOCR.js"
import FilterAPI from "../API/filterAPI.js"
import HandleFrame from "../View/js/handleFrame.js"
import { openLoading, closeLoading } from "../View/js/handleLoading.js"
import { loadImage, loadRelevanceImage } from "./handleImage.js"

let ocrSubmit = document.getElementById("ocr-filter-submit")
let ocrRelevanceSubmit = document.getElementById("ocr-relevance-filter-submit")
let ocrAllSubmit = document.getElementById("ocr-all-filter-submit")
let relevanceContainer = document.getElementById('relevance-result-container')

ocrSubmit.addEventListener("click", e => {
    openLoading()
    let syntheticId = localStorage.getItem("syntheticId").split(",")
    let ocr = Array.from(chosenOCR).join(" ")
    localStorage.setItem("ocr", ocr)
    let objectDetection = JSON.parse(localStorage.getItem("objectDetection"))
    let colorFeature = JSON.parse(localStorage.getItem("colorFeature"))
    let spaceRecognition = JSON.parse(localStorage.getItem("spaceRecognition"))
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
        return data.syntheticId
    })
    .then(syntheticIdList => Promise.all(syntheticIdList.map(syntheticId => loadImage(syntheticId))))
    .catch(err => console.log(err))
    .finally(() => closeLoading())
})

ocrRelevanceSubmit.addEventListener("click", e => {
    openLoading()
    let syntheticId = localStorage.getItem("relevanceSyntheticId").split(",")
    let ocr = Array.from(chosenOCR).join(" ")
    localStorage.setItem("relevanceOcr", ocr)
    let objectDetection = JSON.parse(localStorage.getItem("relevanceObjectDetection"))
    let colorFeature = JSON.parse(localStorage.getItem("relevanceColorFeature"))
    let spaceRecognition = JSON.parse(localStorage.getItem("relevanceSpaceRecognition"))
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
        relevanceContainer.style.transform = 'translateX(0px)'
        return data.syntheticId
    })
    .then(syntheticIdList => Promise.all(syntheticIdList.map(syntheticId => loadRelevanceImage(syntheticId))))
    .catch(err => console.log(err))
    .finally(() => closeLoading())
})

ocrAllSubmit.addEventListener("click", e => {
    openLoading()
    let ocr = Array.from(chosenOCR).join(" ")
    localStorage.setItem("ocr", ocr)
    let objectDetection = JSON.parse(localStorage.getItem("objectDetection"))
    let colorFeature = JSON.parse(localStorage.getItem("colorFeature"))
    let spaceRecognition = JSON.parse(localStorage.getItem("spaceRecognition"))
    let summaryTopic = JSON.parse(localStorage.getItem("summaryTopic"))
    FilterAPI.filterAllByAllModels(ocr, objectDetection, colorFeature, spaceRecognition, summaryTopic)
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
        return data.syntheticId
    })
    .then(syntheticIdList => Promise.all(syntheticIdList.map(syntheticId => loadImage(syntheticId))))
    .catch(err => console.log(err))
    .finally(() => closeLoading())
})