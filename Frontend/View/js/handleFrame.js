class HandleFrame {
    static loadDetailFrame(folderId, videoId, frameId, objectDetection) {
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
        console.log(objectDetection)
        objectDetection.forEach(obj => {
            let objectDisplay = document.createElement("span")
            objectDisplay.setAttribute('class', 'single-frame-obj-item')
            objectDisplay.innerHTML = `${obj['Label']} - ${obj['Quantity']} - ${Number(obj['Proportion'].toFixed(2))}`
            objContainer.appendChild(objectDisplay)
        })

        let multipleResultContainer = document.getElementById("multiple-results")
        let toolbar = document.getElementById('tool-bar')
        multipleResultContainer.style.filter = 'blur(8px)'
        toolbar.style.filter = 'blur(8px)'

        let cancel = document.getElementById("single-result-cancel")
        cancel.addEventListener("click", e => {
            singleResultContainer.style.display = 'none'
            multipleResultContainer.style.filter = null
            toolbar.style.filter = null
        })

        singleResultContainer.style.display = 'block'
    }

    static loadFrame(imgPath, objectDetection) {
        let multipleResultContainer = document.getElementById("multiple-results")
        let frameList = document.getElementById("frame-list-container")
        
        frameList.remove()
        frameList = document.createElement("div")
        frameList.setAttribute("id", "frame-list-container")
        multipleResultContainer.appendChild(frameList)

        imgPath.forEach((path, idx) => {
            let frameContainer = document.createElement("div")

            frameContainer.setAttribute("class", "frame-container")

            let frame = document.createElement("img")
            frame.setAttribute("class", "frame")
            // frame.setAttribute("loading", "lazy")
            // frame.setAttribute("decoding", "asynchronous")
            frame.setAttribute("src", path)
            let paramPath = path.split("\\")
            let paramPathLength = paramPath.length
            let frameId = paramPath[paramPathLength - 1].split(".")[0]
            let videoId = paramPath[paramPathLength - 2]
            let folderId = paramPath[paramPathLength - 3]

            frameContainer.addEventListener("click", e => {
                this.loadDetailFrame(folderId, videoId, frameId, objectDetection[idx])
            })

            let info = document.createElement("span")
            info.setAttribute("class", "frame-info normal-text")
            info.innerHTML = `${folderId}-${videoId}-${frameId}`

            frameContainer.appendChild(frame)
            frameContainer.appendChild(info)
            frameList.appendChild(frameContainer)
        })
    }
}

export default HandleFrame