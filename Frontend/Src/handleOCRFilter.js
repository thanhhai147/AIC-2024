import chosenOCR from "../View/js/handleOCR.js"
import FilterAPI from "../API/filterAPI.js"
import HandleFrame from "../View/js/handleFrame.js"

let ocrSubmit = document.getElementById("ocr-filter-submit")

ocrSubmit.addEventListener("click", e => {
    let syntheticId = localStorage.getItem("syntheticId").split(",")
    console.log(chosenOCR)
    if(chosenOCR && chosenOCR.size > 0) {
        FilterAPI.filterByOCR(syntheticId, Array.from(chosenOCR).join(" "))
        .then(res => res.json())
        .then(data => {
            if(data.success) HandleFrame.loadFrame(data.imagePath, data.objectDetection, data.ocr, data.colorFeature)
        })
        .catch(err => console.log(err))
    }
    else {
        FilterAPI.filterBySyntheticId(syntheticId)
        .then(res => res.json())
        .then(data => {
            if(data.success) HandleFrame.loadFrame(data.imagePath, data.objectDetection, data.ocr, data.colorFeature)
        })
        .catch(err => console.log(err))
    }
})