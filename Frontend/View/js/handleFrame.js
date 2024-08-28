import { addRelevanceFrame } from "./handleRelevance.js"
import loadVideo from "../../Src/handleVideo.js"
import { openLoading, closeLoading } from "./handleLoading.js"

let playIconPath = ['../assets/icon/pause.png', '../assets/icon/play.png']

let singleResultContainer = document.getElementById("single-result")
let idContainer = document.getElementById("single-frame-id")
let ocrContainer = document.getElementById("single-frame-ocr")
let objContainer = document.getElementById("single-frame-obj")
let colorContainer = document.getElementById("single-frame-color")
let spaceContainer = document.getElementById("single-frame-space")
let summaryContainer = document.getElementById("single-frame-summary")
let video = document.getElementById("single-video")
let rewind = document.getElementById('single-frame-rewind')
let fastfoward = document.getElementById('single-frame-fastfoward')
let play = document.getElementById("single-frame-play")
let framePosition = document.getElementById("single-position")
let cancel = document.getElementById("single-result-cancel")
let multipleResultContainer = document.getElementById("multiple-results")
let toolbar = document.getElementById('tool-bar')
let multipleRelevanceResultContainer = document.getElementById("relevance-multiple-results-container")
let frameList = document.getElementById("relevance-frame-list-container")

let startTime = null
let endTime = null
let targetTime = null

let fps = 25
let intervalTime = 20

class HandleFrame {
    static handlePlay () {
        if(play.getAttribute('src') === playIconPath[0]) {
            play.setAttribute('src', playIconPath[1])
            video.pause()
        } else {
            if (video.currentTime >= endTime) return
            play.setAttribute('src', playIconPath[0])
            video.play()
        }
    }

    static handleRewind() {
        let rewindTime = video.currentTime - 1
        if (rewindTime <= startTime) return
        video.currentTime = rewindTime
        video.play()
        play.setAttribute('src', playIconPath[0])
    }

    static handleFastforward() {
        let fastfowardTime = video.currentTime + 1
        if (fastfowardTime >= endTime) return
        video.currentTime = fastfowardTime
        video.play()
        play.setAttribute('src', playIconPath[0])
    }

    static handleTimeUpdate() {
        framePosition.innerText = Math.floor(video.currentTime * fps)
        if(video.currentTime >= endTime) {
            video.pause()
            play.setAttribute('src', playIconPath[1])
        }
    }

    static async loadDetailFrame(folderId, videoId, frameId, objectDetection, ocr, colorFeature, spaceRecognition, summary) {
        openLoading()

        targetTime = frameId / fps
        video.currentTime = targetTime
        startTime = video.currentTime - intervalTime / 2
        endTime = video.currentTime + intervalTime / 2

        const videoURL = await loadVideo(`${folderId}_${folderId}_${videoId}`, startTime, endTime)

        play.addEventListener('click', this.handlePlay)
        rewind.addEventListener("click", this.handleRewind)
        fastfoward.addEventListener("click", this.handleFastforward)
        video.addEventListener("timeupdate", this.handleTimeUpdate)

        idContainer.innerHTML = `${folderId}-${videoId}-${frameId}`

        while(objContainer.lastChild) objContainer.removeChild(objContainer.lastChild)
        objectDetection.forEach(obj => {
            let objectDisplay = document.createElement("span")
            objectDisplay.setAttribute('class', 'single-frame-obj-item')
            objectDisplay.innerHTML = `${obj['Label']} - ${obj['Quantity']} - ${Number(obj['Proportion'].toFixed(2))}`
            objContainer.appendChild(objectDisplay)
        })

        while(ocrContainer.lastChild) ocrContainer.removeChild(ocrContainer.lastChild)
        let ocrDisplay = document.createElement("span")
        ocrDisplay.setAttribute('class', 'single-frame-ocr-item')
        ocrDisplay.innerHTML = ocr
        ocrContainer.appendChild(ocrDisplay)

        while(colorContainer.lastChild) colorContainer.removeChild(colorContainer.lastChild)
        colorFeature.forEach(color => {
            let colorDisplay = document.createElement("span")
            colorDisplay.setAttribute('class', 'single-frame-color-item')
            colorDisplay.innerHTML = color.toString().toLowerCase().charAt(0).toUpperCase() + color.toString().toLowerCase().slice(1)
            colorContainer.appendChild(colorDisplay)
        })
        
        while(spaceContainer.lastChild) spaceContainer.removeChild(spaceContainer.lastChild)
        spaceRecognition.forEach(space => {
            let spaceDisplay = document.createElement("span")
            spaceDisplay.setAttribute('class', 'single-frame-space-item')
            let spaceReplace = space.replace("_", " ").split("/").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" / ")
            spaceDisplay.innerHTML = spaceReplace
            spaceContainer.appendChild(spaceDisplay)
        })
        
        // while(summaryContainer.lastChild) summaryContainer.removeChild(summaryContainer.lastChild)
        // summary.forEach(topic => {
        //     let topicDisplay = document.createElement("span")
        //     topicDisplay.setAttribute('class', 'single-frame-summary-item')
        //     topicDisplay.innerHTML = topic
        //     summaryContainer.appendChild(topicDisplay)
        // })
        
        const cancelDetailFrame = () => {
            play.setAttribute('src', playIconPath[1])
            video.pause()
            video.removeAttribute("src")
            URL.revokeObjectURL(videoURL)
            video.load()
            play.removeEventListener('click', this.handlePlay)
            rewind.removeEventListener("click", this.handleRewind)
            fastfoward.removeEventListener("click", this.handleFastforward)
            video.removeEventListener("timeupdate", this.handleTimeUpdate)
            singleResultContainer.style.display = 'none'
            multipleResultContainer.style.filter = null
            toolbar.style.filter = null
        }

        cancel.addEventListener("click", e => cancelDetailFrame())
        document.addEventListener("keydown", e => {
            if(e.key === 'Escape' || e.key === 'Esc') cancelDetailFrame()
        })

        closeLoading()

        multipleResultContainer.style.filter = 'blur(4px)'
        toolbar.style.filter = 'blur(4px)'
        singleResultContainer.style.display = 'block'
    }

    static loadFrame(syntheticId, objectDetection, ocr, colorFeature, spaceRecognition, summary) {
        if (!syntheticId) return
        let multipleResultContainer = document.getElementById("multiple-results")
        let frameList = document.getElementById("frame-list-container")
        
        frameList.remove()
        frameList = document.createElement("div")
        frameList.setAttribute("id", "frame-list-container")
        multipleResultContainer.appendChild(frameList)

        syntheticId.forEach((singleSyntheticId, idx) => {
            let frameContainer = document.createElement("div")

            frameContainer.setAttribute("class", "frame-container")
            
            let syntheticIdSplit = singleSyntheticId.split("_")
            let frameId = syntheticIdSplit[2]
            let videoId = syntheticIdSplit[1]
            let folderId = syntheticIdSplit[0]

            let canvas = document.createElement('canvas')
            canvas.id = `canvas-${folderId}-${videoId}-${frameId}`
            canvas.setAttribute("class", "canvas-frame")

            canvas.addEventListener("click", e => {
                this.loadDetailFrame(
                    folderId, 
                    videoId,
                    frameId, 
                    objectDetection[idx], 
                    ocr[idx], 
                    colorFeature[idx], 
                    spaceRecognition[idx], 
                    // summary[idx]
                )
            })

            let info = document.createElement("span")
            info.setAttribute("class", "frame-info normal-text")
            info.innerHTML = `${folderId}-${videoId}-${frameId}`

            let relevanceAdd = document.createElement("span")
            relevanceAdd.setAttribute("class", "frame-relevance-add")
            relevanceAdd.innerHTML = "+"
            relevanceAdd.addEventListener("click", e => {
                addRelevanceFrame(e, `${folderId}-${videoId}-${frameId}`)
            })

            frameContainer.appendChild(canvas)
            frameContainer.appendChild(info)
            frameContainer.appendChild(relevanceAdd)
            frameList.appendChild(frameContainer)
        })

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    static loadRelevanceFrame(syntheticId, objectDetection, ocr, colorFeature, spaceRecognition, summary) {    
        frameList.remove()
        frameList = document.createElement("div")
        frameList.setAttribute("id", "relevance-frame-list-container")
        multipleRelevanceResultContainer.appendChild(frameList)

        syntheticId.forEach((singleSyntheticId, idx) => {
            let frameContainer = document.createElement("div")

            frameContainer.setAttribute("class", "frame-container")

            let syntheticIdSplit = singleSyntheticId.split("_")
            let frameId = syntheticIdSplit[2]
            let videoId = syntheticIdSplit[1]
            let folderId = syntheticIdSplit[0]

            let canvas = document.createElement('canvas')
            canvas.id = `canvas-relevance-${folderId}-${videoId}-${frameId}`
            canvas.setAttribute("class", "canvas-frame")

            canvas.addEventListener("click", e => {
                this.loadDetailFrame(
                    folderId, 
                    videoId, 
                    frameId, 
                    objectDetection[idx], 
                    ocr[idx], 
                    colorFeature[idx], 
                    spaceRecognition[idx],
                    // summary[idx]
                )
            })

            let info = document.createElement("span")
            info.setAttribute("class", "frame-info normal-text")
            info.innerHTML = `${folderId}-${videoId}-${frameId}`

            let relevanceAdd = document.createElement("span")
            relevanceAdd.setAttribute("class", "frame-relevance-add")
            relevanceAdd.innerHTML = "+"
            relevanceAdd.addEventListener("click", e => {
                addRelevanceFrame(e, `${folderId}-${videoId}-${frameId}`)
            })

            frameContainer.appendChild(canvas)
            frameContainer.appendChild(info)
            frameContainer.appendChild(relevanceAdd)
            frameList.appendChild(frameContainer)
        })
    }
}

export default HandleFrame