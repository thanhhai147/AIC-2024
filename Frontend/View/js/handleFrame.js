import { addRelevanceFrame } from "./handleRelevance.js"

class HandleFrame {
    static loadDetailFrame(folderId, videoId, frameId, objectDetection, ocr, colorFeature, spaceRecognition) {
        let singleResultContainer = document.getElementById("single-result")
        
        let frameContainer = document.getElementById("single-frame-container")
        let idContainer = document.getElementById("single-frame-id")
        let ocrContainer = document.getElementById("single-frame-ocr")
        let objContainer = document.getElementById("single-frame-obj")
        let colorContainer = document.getElementById("single-frame-color")
        let spaceContainer = document.getElementById("single-frame-space")

        let frame = document.createElement("img")
        frame.setAttribute("class", "single-frame")
        frame.setAttribute("src", `/Dataset/2024/KeyFrame/${folderId}/${videoId}/${frameId}.jpg`)
        if(frameContainer.firstChild) {
            frameContainer.removeChild(frameContainer.firstChild)
        }
        frameContainer.appendChild(frame)

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

        let multipleResultContainer = document.getElementById("multiple-results")
        let toolbar = document.getElementById('tool-bar')
        multipleResultContainer.style.filter = 'blur(4px)'
        toolbar.style.filter = 'blur(4px)'

        let cancel = document.getElementById("single-result-cancel")
        cancel.addEventListener("click", e => {
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
        let multipleResultContainer = document.getElementById("relevance-multiple-results-container")
        let frameList = document.getElementById("relevance-frame-list-container")
        
        frameList.remove()
        frameList = document.createElement("div")
        frameList.setAttribute("id", "relevance-frame-list-container")
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
}

export default HandleFrame