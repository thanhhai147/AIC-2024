import HandleFrame from "../View/js/handleFrame.js"
import QueryAPI from "../API/queryAPI.js"

let textQuery = document.getElementById("text-query")
let limitQuery = document.getElementById("limit-query")
let submit = document.getElementById("submit-btn")

submit.addEventListener("click", e => {
    QueryAPI.query(textQuery.value, limitQuery.value)
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("syntheticId", data.frameInfo.map(info => `${info.FolderId}_${info.VideoId}_${info.FrameInfo}`))
        HandleFrame.loadFrame(data.imagePath, data.objectDetection)
    })  
    .catch(err => {
        console.log(err)
    })
})

