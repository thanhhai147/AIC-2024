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
    relevanceFeedbackData['image'][frameSyntheticId] = frameSyntheticId

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
    delete relevanceFeedbackData['image'][frameSyntheticId]

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

let icon_path = ['../assets/icon/right arrow.png', '../assets/icon/left arrow.png']
let relevanceIcon = document.getElementById('relevance-icon')
let relevanceContainer = document.getElementById('relevance-result-container')

relevanceIcon.addEventListener('click', e => {
    if (relevanceIcon.getAttribute('src') === icon_path[0]) {
        relevanceIcon.setAttribute('src', icon_path[1])
        relevanceContainer.style.transform = 'translateX(calc(50vw - 30px))'
    }
    else {
        relevanceIcon.setAttribute('src', icon_path[0])
        relevanceContainer.style.transform = 'translateX(0)'
    }
})

export {
    addRelevanceFrame,
    relevanceFeedbackData
}