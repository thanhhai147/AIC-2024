import QueryAPI from "../API/queryAPI.js";

export default async function loadVideo(syntheticId) {
    return QueryAPI.queryVideo(syntheticId)
    .then(res => res.blob())
    .then(blob => URL.createObjectURL(blob))
    .then(videoURL => {
        let video = document.getElementById("single-video")
        video.setAttribute("src", videoURL)
        video.load()
        return videoURL
    })
    .catch(err => {
        console.log(err)
    })
}