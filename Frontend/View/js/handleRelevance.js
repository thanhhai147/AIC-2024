import HandleFrame from "./handleFrame.js"
let relevanceFeedbackData = {
    textual: null,
    image: {},
    proportion: {
        text: 0.5,
        image: 0.5
    }
}

let proportionInput = document.getElementById("proportion-relevance")
let textProportion = document.getElementById("text-relevance-proportion")
let imageProportion = document.getElementById("image-relevance-proportion")
let textRelevance = document.getElementById("text-relevance")

proportionInput.addEventListener("input", e => {
    textProportion.innerHTML = e.target.value
    imageProportion.innerHTML = 100 - e.target.value
})

const addRelevanceFrame = (e, frameInfo) => {
    let frameSyntheticId = frameInfo.split("-").join("_") 
    if(frameSyntheticId in relevanceFeedbackData.image) return
    relevanceFeedbackData.image[frameSyntheticId] = frameSyntheticId

    let imageRelevance = document.getElementById("image-relevance")

    let placeholder = document.getElementById("image-relevance-placeholder")
    if(placeholder) imageRelevance.removeChild(placeholder)

    let relevanceInfo = document.createElement("span")
    relevanceInfo.setAttribute("id", `relevance-image-info-${frameInfo}`)
    relevanceInfo.setAttribute("class", "normal-text relevance-image-info")
    relevanceInfo.innerHTML = frameInfo

    relevanceInfo.addEventListener("dblclick", e => removeRelevanceFrame(e))
    
    imageRelevance.appendChild(relevanceInfo)
}

const removeRelevanceFrame = (e) => {
    let frameSyntheticId = e.target.id.split("-").slice(3).join("_")
    delete relevanceFeedbackData.image[frameSyntheticId]

    let imageRelevance = document.getElementById("image-relevance")
    imageRelevance.removeChild(e.target) 
}

textRelevance.addEventListener("input", e => {
    relevanceFeedbackData.textual = e.target.value
})

proportionInput.addEventListener("input", e => {
    relevanceFeedbackData.proportion.text = textProportion.innerHTML
    relevanceFeedbackData.proportion.image = imageProportion.innerHTML
})


document.body.addEventListener("click", e => {
    let imgPath = []
    for (let i=0; i<20; i ++) imgPath.push("../assets/test frame.jpg")
    HandleFrame.loadRelevanceFrame(imgPath, [], [])

})

export {
    addRelevanceFrame,
    relevanceFeedbackData
}