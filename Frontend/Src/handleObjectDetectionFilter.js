import chosenLables from "../View/js/handleObjectDetection.js"
import FilterAPI from "../API/filterAPI.js"
import HandleFrame from "../View/js/handleFrame.js"

let objectDetectionSubmit = document.getElementById("obj-filter-submit")

objectDetectionSubmit.addEventListener("click", e => {
    let syntheticId = localStorage.getItem("syntheticId").split(",")
    let objectDetection = Object.values(chosenLables)
    console.log(objectDetection)
    if (objectDetection && objectDetection.length > 0) {
        FilterAPI.filterByObjectDetection(syntheticId, objectDetection)
        .then(res => res.json())
        .then(data => {
            if(data.success) HandleFrame.loadFrame(data.imagePath, data.objectDetection, data.ocr, data.colorFeature)
        })
        .catch(err => console.log(err))
    } else {
        FilterAPI.filterBySyntheticId(syntheticId)
        .then(res => res.json())
        .then(data => {
            if(data.success) HandleFrame.loadFrame(data.imagePath, data.objectDetection, data.ocr, data.colorFeature)
        })
        .catch(err => console.log(err))
    }
})