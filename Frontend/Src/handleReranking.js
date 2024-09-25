import HandleFrame from "../View/js/handleFrame.js"
import QueryAPI from "../API/queryAPI.js"
import { openLoading, closeLoading } from "../View/js/handleLoading.js"
import { loadImage } from "./handleImage.js"
import clearFilter from "./handleClearFilter.js"

let textRerankingQuery = document.getElementById("text-ranking-query")
let limitQuery = document.getElementById("limit-ranking-query")
let submit = document.getElementById("submit-ranking-btn")

submit.addEventListener("click", e => {
    if(!textRerankingQuery.value) return 
    openLoading()
    let imageQuery = localStorage.getItem("syntheticId").split(",")
    const queryProportion = JSON.parse(localStorage.getItem("queryProportion"))
    clearFilter()
    QueryAPI.queryReranking(imageQuery, textRerankingQuery.value, limitQuery.value, queryProportion.bert, queryProportion.clip)
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("syntheticId", data.syntheticId)
        if(data.success) HandleFrame.loadFrame(
            data.syntheticId, 
            data.fps,
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

