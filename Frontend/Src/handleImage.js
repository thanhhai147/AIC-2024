import QueryAPI from "../API/queryAPI.js";

function loadImage(syntheticId) {
    QueryAPI.queryImage(syntheticId)
    .then(res => res.blob())
    .then(blob => URL.createObjectURL(blob))
    .then(imageURL => {
        let canvas = document.getElementById(`canvas-${syntheticId.replace(/_/g, "-")}`)
        let ctx = canvas.getContext('2d')
        let frame = new Image()
        frame.className = "frame"
        frame.src = imageURL
        frame.onload = () => {
            ctx.drawImage(frame, 0, 0, 480, 360, 0, 0, 300, 150)
            URL.revokeObjectURL(imageURL)
        }
    })
    .catch(err => {
        console.log(err)
    })
}

function loadRelevanceImage(syntheticId) {
    QueryAPI.queryImage(syntheticId)
    .then(res => res.blob())
    .then(blob => URL.createObjectURL(blob))
    .then(imageURL => {
        let canvas = document.getElementById(`canvas-relevance-${syntheticId.replace(/_/g, "-")}`)
        let ctx = canvas.getContext('2d')
        let frame = new Image()
        frame.className = "frame"
        frame.src = imageURL
        frame.onload = () => {
            ctx.drawImage(frame, 0, 0, 480, 360, 0, 0, 300, 150)
        }
        return imageURL
    })
    .then(imageURL => {
        URL.revokeObjectURL(imageURL)
    })
    .catch(err => {
        console.log(err)
    })
}

export {
    loadImage,
    loadRelevanceImage
}