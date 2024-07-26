let frameList = document.getElementById("frame-list-container")

for (let i=0; i<30; i++) {
    let frameContainer = document.createElement("div")
    frameContainer.setAttribute("class", "frame-container")

    let frame = document.createElement("img")
    frame.setAttribute("class", "frame")
    frame.setAttribute("src", "../assets/test frame.jpg")

    let info = document.createElement("span")
    info.setAttribute("class", "frame-info normal-text")
    info.innerHTML = `L27-V001-${i}`

    frameContainer.appendChild(frame)
    frameContainer.appendChild(info)
    frameList.appendChild(frameContainer)
}