import chosenSpaceList  from "../View/js/handleSpaceRecognition.js"
import FilterAPI from "../API/filterAPI.js"
import HandleFrame from "../View/js/handleFrame.js"
import { openLoading, closeLoading } from "../View/js/handleLoading.js"

let spaceSubmit = document.getElementById("space-filter-submit")
spaceSubmit.addEventListener("click", e => {
    let syntheticId = localStorage.getItem("syntheticId").split(",")
    if (chosenSpaceList && chosenSpaceList.size > 0) {
        openLoading()
        FilterAPI.filterBySpaceRecognition(syntheticId, Array.from(chosenSpaceList))
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