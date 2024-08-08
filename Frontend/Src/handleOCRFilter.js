import chosenOCR from "../View/js/handleOCR.js"
import FilterAPI from "../API/filterAPI.js"
import HandleFrame from "../View/js/handleFrame.js"
import { openLoading, closeLoading } from "../View/js/handleLoading.js"

let ocrSubmit = document.getElementById("ocr-filter-submit")

ocrSubmit.addEventListener("click", e => {
    let syntheticId = localStorage.getItem("syntheticId").split(",")
   
    if(chosenOCR && chosenOCR.size > 0) {
        openLoading()
        FilterAPI.filterByOCR(syntheticId, Array.from(chosenOCR).join(" "))
        .then(res => res.json())
        .then(data => {
            if(data.success) HandleFrame.loadFrame(data.imagePath, data.objectDetection, data.ocr, data.colorFeature)
        })
        .catch(err => console.log(err))
        .finally(() => closeLoading())
    }
    else {
        openLoading()
        FilterAPI.filterBySyntheticId(syntheticId)
        .then(res => res.json())
        .then(data => {
            if(data.success) HandleFrame.loadFrame(data.imagePath, data.objectDetection, data.ocr, data.colorFeature)
        })
        .catch(err => console.log(err))
        .finally(() => closeLoading())
    }
})