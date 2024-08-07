import chosenColorList from "../View/js/handleColorFeature.js";
import FilterAPI from "../API/filterAPI.js"
import HandleFrame from "../View/js/handleFrame.js"

let colorSubmit = document.getElementById("color-filter-submit")
colorSubmit.addEventListener("click", e => {
    let syntheticId = localStorage.getItem("syntheticId").split(",")
    console.log(chosenColorList)
    if (chosenColorList && chosenColorList.size > 0) {
        FilterAPI.filterByColorFeature(syntheticId, Array.from(chosenColorList))
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