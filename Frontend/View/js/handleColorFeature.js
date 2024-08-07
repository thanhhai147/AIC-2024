const colorList = [
    "red_#FF0000",
    "orange_#FFA500",
    "yellow_#FFFF00",
    "charteruse green_#DFFF00",
    "green_#00FF00",
    "spring green_#00FF7F",
    "CYAN_#00FFFF",
    "Azure_#007FFF",
    "blue_#0000FF",
    "violet_#7F00FF",
    "magenta_#FF00FF",
    "rose_#FF007F",
    "black_#000000",
    "white_#FFFFFF",
    "gray_#808080"
]
let filterColorList = colorList

const checkIconPath = ['../assets/icon/unchecked.png', '../assets/icon/check.png'] 
let chosenColorList = new Set()
let colorContainer = document.getElementById('color-filter-list')
let colorInput = document.getElementById('color-filter')
let colorClear = document.getElementById('color-filter-clear')

const handleCheckColor = (color, checkIcon) => {
    if (checkIcon.getAttribute("src") === checkIconPath[0]) {
        chosenColorList.add(color)
        checkIcon.setAttribute("src", checkIconPath[1])
    } else {
        chosenColorList.delete(color)
        checkIcon.setAttribute("src", checkIconPath[0])
    }
}

const showColor = (colorList) => {

    while(colorContainer.lastChild) colorContainer.removeChild(colorContainer.lastChild)
    
    colorList.forEach(colorInfo => {
        let [color, hexCode] = colorInfo.split("_")
        let colorText = document.createElement("span")
        colorText.className = 'color-filter-label normal-text'
        colorText.innerHTML = color.toString().toLowerCase().charAt(0).toUpperCase() + color.toString().toLowerCase().slice(1)
        
        let colorShow = document.createElement("div")
        colorShow.className = 'color-filter-show'
        colorShow.style.backgroundColor = hexCode
    
        let colorWrapper = document.createElement("div")
        colorWrapper.className = 'color-filter-wrapper'
    
        let checkIcon = document.createElement("img")
        checkIcon.className = 'color-filter-check-icon'
        checkIcon.src = chosenColorList.has(color) ? checkIconPath[1] : checkIconPath[0]
        checkIcon.addEventListener("click", e => handleCheckColor(color, checkIcon))
    
        colorWrapper.appendChild(colorShow)
        colorWrapper.appendChild(colorText)
        colorWrapper.appendChild(checkIcon)
        colorContainer.appendChild(colorWrapper)
    })
}

const search = (value) => {
    return colorList.filter((o) =>
        String(o).toLowerCase().includes(value.toLowerCase())
    )
}

showColor(filterColorList)

colorInput.addEventListener("input", e => {
    filterColorList = search(e.target.value)
    showColor(filterColorList)
})

colorClear.addEventListener("click", e => {
    chosenColorList.clear()
    showColor(filterColorList)
})

export default chosenColorList