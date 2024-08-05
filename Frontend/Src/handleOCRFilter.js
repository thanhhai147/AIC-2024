import OCRObject from "../View/js/handleOCR.js"
import FilterAPI from "../API/filterAPI.js"
import HandleFrame from "../View/js/handleFrame.js"

let ocrSubmit = document.getElementById("ocr-filter-submit")

ocrSubmit.addEventListener("click", e => {
    let syntheticId = localStorage.getItem("syntheticId").split(",")
    let ocr = Object.values(OCRObject)
    
    if(ocr && ocr.length > 0) {
        FilterAPI.filterByOCR(syntheticId, Object.values(ocr).join(" "))
        .then(res => res.json())
        .then(data => {
            if(data.success) HandleFrame.loadFrame(data.imagePath, data.objectDetection, data.ocr)
        })
        .catch(err => console.log(err))
    }
    else {
        FilterAPI.filterBySyntheticId(syntheticId)
        .then(res => res.json())
        .then(data => {
            if(data.success) HandleFrame.loadFrame(data.imagePath, data.objectDetection, data.ocr)
        })
        .catch(err => console.log(err))
    }
})