// Query Visibility
let queryVisibilityIcon = document.getElementById("query-visibility-icon")
let queryVisibility = 'open'
let queryVisibilityIconPath = ['../assets/icon/down.png', '../assets/icon/up.png']
let queryContainer = document.getElementById("query-container")

document.getElementsByTagName("body")[0].addEventListener("load", e => {
    queryVisibility = 'open'
    queryVisibilityIcon.setAttribute("src", queryVisibilityIconPath[0])
    queryContainer.style.display = 'flex'
})

queryVisibilityIcon.addEventListener("click", e => {
    if (queryVisibility === 'open') {
        queryVisibility = 'closed'
        queryVisibilityIcon.setAttribute("src", queryVisibilityIconPath[1])
        queryContainer.style.display = 'none'
    } else {
        queryVisibility = 'open'
        queryVisibilityIcon.setAttribute("src", queryVisibilityIconPath[0])
        queryContainer.style.display = 'flex'
    }
})

// Filte Visibility
let filterVisibilityIcon = document.getElementById("filter-visibility-icon")
let filterLabel = document.getElementById("filter-label-container")
let filterVisibility = 'open'
let filterVisibilityIconPath = ['../assets/icon/down.png', '../assets/icon/up.png']
let filterContainer = document.getElementById("filter-container")

document.getElementsByTagName("body")[0].addEventListener("load", e => {
    filterVisibility = 'open'
    filterVisibilityIcon.setAttribute("src", filterVisibilityIconPath[0])
    filterContainer.style.display = 'flex'
    filterLabel.style.marginBottom = '8px'
})

filterVisibilityIcon.addEventListener("click", e => {
    if (filterVisibility === 'open') {
        filterVisibility = 'closed'
        filterVisibilityIcon.setAttribute("src", filterVisibilityIconPath[1])
        filterContainer.style.display = 'none'
        filterLabel.style.marginBottom = 0
    } else {
        filterVisibility = 'open'
        filterVisibilityIcon.setAttribute("src", filterVisibilityIconPath[0])
        filterContainer.style.display = 'flex'
        filterLabel.style.marginBottom = '8px'
    }
})

// OCR 
let OCRInput = document.getElementById("ocr-filter")
let OCRObject = {}
let objIdx = 0

let OCRList = document.getElementById("ocr-filter-list")

let OCRCancelHandle = (e, cancelIdx, OCRChild) => {
    delete OCRObject[cancelIdx]
    OCRList.removeChild(OCRChild)
}

OCRInput.addEventListener("keypress", e => {
    if(e.key === "Enter") {
        OCRObject[objIdx] = OCRInput.value

        let newOCRChild = document.createElement('span')
        newOCRChild.setAttribute('id', `ocr-item-${objIdx}`)
        newOCRChild.setAttribute('class', 'ocr-filter-item')
        newOCRChild.innerText = OCRInput.value

        let newOCRCancel = document.createElement('img')
        newOCRCancel.setAttribute('id', `ocr-cancel-${objIdx}`)
        newOCRCancel.setAttribute('class', 'ocr-filter-item-cancel')
        newOCRCancel.setAttribute('src', '../assets/icon/cancel.png')

        newOCRCancel.addEventListener('click', e => OCRCancelHandle(e, objIdx, newOCRChild))

        newOCRChild.appendChild(newOCRCancel)
        OCRList.appendChild(newOCRChild)

        OCRInput.value = null
        objIdx++
    }
})