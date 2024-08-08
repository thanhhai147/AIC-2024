import chosenLables from "../View/js/handleObjectDetection.js"
import FilterAPI from "../API/filterAPI.js"
import HandleFrame from "../View/js/handleFrame.js"
import { openLoading, closeLoading } from "../View/js/handleLoading.js"

let objectDetectionSubmit = document.getElementById("obj-filter-submit")

objectDetectionSubmit.addEventListener("click", e => {
    let syntheticId = localStorage.getItem("syntheticId").split(",")
    let objectDetection = Object.values(chosenLables)

    if (objectDetection && objectDetection.length > 0) {
        openLoading()
        FilterAPI.filterByObjectDetection(syntheticId, objectDetection)
        .then(res => res.json())
        .then(data => {
            if(data.success) HandleFrame.loadFrame(data.imagePath, data.objectDetection, data.ocr, data.colorFeature)
        })
        .catch(err => console.log(err))
        .finally(() => closeLoading())
    } else {
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