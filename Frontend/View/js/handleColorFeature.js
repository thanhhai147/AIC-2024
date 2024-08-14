const colorList = [
    "red_rgb(255, 0, 0)_rgba(255, 0, 0, 0.5)",
    "orange_rgb(255, 165, 0)_rgba(255, 165, 0, 0.5)",
    "yellow_rgb(255, 255, 0)_rgba(255, 255, 0, 0.5)",
    "chartreuse green_rgb(223, 255, 0)_rgba(223, 255, 0, 0.5)",
    "green_rgb(0, 255, 0)_rgba(0, 255, 0, 0.5)",
    "spring green_rgb(0, 255, 127)_rgba(0, 255, 127, 0.5)",
    "CYAN_rgb(0, 255, 255)_rgba(0, 255, 255, 0.5)",
    "Azure_rgb(0, 127, 255)_rgba(0, 127, 255, 0.5)",
    "blue_rgb(0, 0, 255)_rgba(0, 0, 255, 0.5)",
    "violet_rgb(127, 0, 255)_rgba(127, 0, 255, 0.5)",
    "magenta_rgb(255, 0, 255)_rgba(255, 0, 255, 0.5)",
    "rose_rgb(255, 0, 127)_rgba(255, 0, 127, 0.5)",
    "black_rgb(0, 0, 0)_rgba(0, 0, 0, 0.3)",
    "white_rgb(255, 255, 255)_rgba(255, 255, 255, 0.5)",
    "gray_rgb(128, 128, 128)_rgba(128, 128, 128, 0.5)"
]
let filterColorList = colorList

let chosenColorList = new Set()
let colorContainer = document.getElementById('color-filter-list')
let colorInput = document.getElementById('color-filter')
let colorClear = document.getElementById('color-filter-clear')

const showColor = (colorList) => {

    while(colorContainer.lastChild) colorContainer.removeChild(colorContainer.lastChild)
    
    colorList.forEach(colorInfo => {
        let [colorLabel, colorRGB, colorRGBA] = colorInfo.split("_")
        
        let colorShow = document.createElement("div")
        colorShow.className = 'color-filter-show'
        colorShow.style.backgroundColor = chosenColorList.has(colorLabel) ? colorRGBA : colorRGB
        colorShow.style.border = chosenColorList.has(colorLabel) ? "2px solid var(--primary-color-2)" : "none"
        colorShow.addEventListener("click", e => {
            if(colorShow.style.backgroundColor == colorRGB) {
                colorShow.style.backgroundColor = colorRGBA
                colorShow.style.border = "2px solid var(--primary-color-2)"
                chosenColorList.add(colorLabel)
            } else {
                colorShow.style.backgroundColor = colorRGB
                colorShow.style.border = "none"
                chosenColorList.delete(colorLabel)
            }
        })
    
        colorContainer.appendChild(colorShow)
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