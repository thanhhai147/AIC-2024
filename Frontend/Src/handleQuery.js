let textQuery = document.getElementById("text-query")
let folderQuery = document.getElementById("folder-query")
let videoQuery = document.getElementById("video-query")
let keyframeQuery = document.getElementById("keyframe-query")
let limitQuery = document.getElementById("limit-query")
let submit = document.getElementById("submit-btn")

submit.addEventListener("click", e => {
    fetch(
        `http://localhost:8000/query?text=${textQuery.value}&folder=${folderQuery.value}&video=${videoQuery.value}&keyframe=${keyframeQuery.value}&limit=${limitQuery.value}`, 
        {
            method: "GET",
            mode: "cors"
        }
    )
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => {
        console.log(err)
    })
})
