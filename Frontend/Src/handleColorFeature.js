import chosenColorList from "../View/js/handleColorFeature.js";
import FilterAPI from "../API/filterAPI.js"
import HandleFrame from "../View/js/handleFrame.js"
import { openLoading, closeLoading } from "../View/js/handleLoading.js"

let colorSubmit = document.getElementById("color-filter-submit")
colorSubmit.addEventListener("click", e => {
    let syntheticId = localStorage.getItem("syntheticId").split(",")
    if (chosenColorList && chosenColorList.size > 0) {
        openLoading()
        FilterAPI.filterByColorFeature(syntheticId, Array.from(chosenColorList))
        .then(res => res.json())
        .then(data => {
            if(data.success) HandleFrame.loadFrame(data.imagePath, data.objectDetection, data.ocr, data.colorFeature, data.spaceRecognition)
        })
        .catch(err => console.log(err))
        .finally(() => closeLoading())
    } else {
        openLoading()
        FilterAPI.filterBySyntheticId(syntheticId)
        .then(res => res.json())
        .then(data => {
            if(data.success) HandleFrame.loadFrame(data.imagePath, data.objectDetection, data.ocr, data.colorFeature, data.spaceRecognition)
        })
        .catch(err => console.log(err))
        .finally(() => closeLoading())
    }
})