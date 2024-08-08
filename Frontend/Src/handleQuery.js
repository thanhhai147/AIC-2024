import HandleFrame from "../View/js/handleFrame.js"
import QueryAPI from "../API/queryAPI.js"
import { openLoading, closeLoading } from "../View/js/handleLoading.js"

let textQuery = document.getElementById("text-query")
let limitQuery = document.getElementById("limit-query")
let submit = document.getElementById("submit-btn")

submit.addEventListener("click", e => {
    if(!textQuery.value) return
    openLoading()
    QueryAPI.query(textQuery.value, limitQuery.value)
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("syntheticId", data.syntheticId)
        HandleFrame.loadFrame(data.imagePath, data.objectDetection, data.ocr, data.colorFeature)
    })  
    .catch(err => {
        console.log(err)
    })
    .finally(() => closeLoading())
})

