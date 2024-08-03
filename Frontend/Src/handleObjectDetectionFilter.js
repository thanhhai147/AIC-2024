import chosenLables from "../View/js/handleObjectDetection.js"
import FilterAPI from "../API/filterAPI.js"
import HandleFrame from "../View/js/handleFrame.js"

let objectDetectionSubmit = document.getElementById("obj-filter-submit")

objectDetectionSubmit.addEventListener("click", e => {
    let syntheticId = localStorage.getItem("syntheticId").split(",")
    let objectDetection = Object.values(chosenLables)

    FilterAPI.filterByObjectDetection(syntheticId, objectDetection)
    .then(res => res.json())
    .then(data => {
        HandleFrame.loadFrame(data.imagePath, data.objectDetection)
    })
    .catch(err => console.log(err))
})