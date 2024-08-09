import { addRelevanceFrame } from "./handleRelevance.js"

let playIconPath = ['/Frontend/View/assets/icon/pause.png', '/Frontend/View/assets/icon/play.png']

let singleResultContainer = document.getElementById("single-result")
let idContainer = document.getElementById("single-frame-id")
let ocrContainer = document.getElementById("single-frame-ocr")
let objContainer = document.getElementById("single-frame-obj")
let colorContainer = document.getElementById("single-frame-color")
let spaceContainer = document.getElementById("single-frame-space")
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
let intervalTime = 10

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
        console.log(video.currentTime, endTime)
        if(video.currentTime >= endTime) {
            video.pause()
            play.setAttribute('src', playIconPath[1])
        }
    }

    static loadDetailFrame(folderId, videoId, frameId, objectDetection, ocr, colorFeature, spaceRecognition) {
        video.setAttribute("src", `../../../Dataset/2024/Videos/${folderId}/${folderId}_${videoId}.mp4`)

        targetTime = frameId / fps
        video.currentTime = targetTime
        startTime = video.currentTime - intervalTime / 2
        endTime = video.currentTime + intervalTime / 2

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

        multipleResultContainer.style.filter = 'blur(4px)'
        toolbar.style.filter = 'blur(4px)'

        cancel.addEventListener("click", e => {
            play.setAttribute('src', playIconPath[1])
            video.pause()
            video.removeAttribute("src")
            video.load()
            play.removeEventListener('click', this.handlePlay)
            rewind.removeEventListener("click", this.handleRewind)
            fastfoward.removeEventListener("click", this.handleFastforward)
            video.removeEventListener("timeupdate", this.handleTimeUpdate)
            singleResultContainer.style.display = 'none'
            multipleResultContainer.style.filter = null
            toolbar.style.filter = null
        })

        singleResultContainer.style.display = 'block'
    }

    static loadFrame(imgPath, objectDetection, ocr, colorFeature, spaceRecognition) {
        let multipleResultContainer = document.getElementById("multiple-results")
        let frameList = document.getElementById("frame-list-container")
        
        frameList.remove()
        frameList = document.createElement("div")
        frameList.setAttribute("id", "frame-list-container")
        multipleResultContainer.appendChild(frameList)

        imgPath.forEach((path, idx) => {
            let frameContainer = document.createElement("div")

            frameContainer.setAttribute("class", "frame-container")

            let canvas = document.createElement('canvas')
            canvas.setAttribute("class", "canvas-frame")
            let ctx = canvas.getContext('2d')
            let frame = new Image()
            frame.className = "frame"
            frame.src = path
            frame.onload = () => {
                ctx.drawImage(frame, 0, 0, 480, 360, 0, 0, 300, 150)
            }
            
            let paramPath = path.split("\\")
            let paramPathLength = paramPath.length
            let frameId = paramPath[paramPathLength - 1].split(".")[0]
            let videoId = paramPath[paramPathLength - 2]
            let folderId = paramPath[paramPathLength - 3]

            canvas.addEventListener("click", e => {
                this.loadDetailFrame(folderId, videoId, frameId, objectDetection[idx], ocr[idx], colorFeature[idx], spaceRecognition[idx])
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

    static loadRelevanceFrame(imgPath, objectDetection, ocr, colorFeature, spaceRecognition) {    
        frameList.remove()
        frameList = document.createElement("div")
        frameList.setAttribute("id", "relevance-frame-list-container")
        multipleRelevanceResultContainer.appendChild(frameList)

        imgPath.forEach((path, idx) => {
            let frameContainer = document.createElement("div")

            frameContainer.setAttribute("class", "frame-container")

            let canvas = document.createElement('canvas')
            canvas.setAttribute("class", "canvas-frame")
            let ctx = canvas.getContext('2d')
            let frame = new Image()
            frame.className = "frame"
            frame.src = path
            frame.onload = () => {
                ctx.drawImage(frame, 0, 0, 480, 360, 0, 0, 300, 150)
            }

            let paramPath = path.split("\\")
            let paramPathLength = paramPath.length
            let frameId = paramPath[paramPathLength - 1].split(".")[0]
            let videoId = paramPath[paramPathLength - 2]
            let folderId = paramPath[paramPathLength - 3]

            canvas.addEventListener("click", e => {
                this.loadDetailFrame(folderId, videoId, frameId, objectDetection[idx], ocr[idx], colorFeature[idx], spaceRecognition[idx])
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