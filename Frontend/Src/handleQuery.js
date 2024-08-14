import HandleFrame from "../View/js/handleFrame.js"
import { loadImage } from "./handleImage.js"
import QueryAPI from "../API/queryAPI.js"
import { openLoading, closeLoading } from "../View/js/handleLoading.js"

let textQuery = document.getElementById("text-query")
let limitQuery = document.getElementById("limit-query")
let submit = document.getElementById("submit-btn")

submit.addEventListener("click", e => {
    if(!textQuery.value) return
    openLoading()
    const queryProportion = JSON.parse(localStorage.getItem("queryProportion"))
    QueryAPI.query(textQuery.value, limitQuery.value, queryProportion.bert, queryProportion.clip)
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("syntheticId", data.syntheticId)
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
    .catch(err => {
        console.log(err)
    })
    .finally(() => closeLoading())
})

