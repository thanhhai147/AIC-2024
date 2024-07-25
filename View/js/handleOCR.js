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

let OCRClear = document.getElementById("ocr-filter-clear")
OCRClear.addEventListener('click', e => {
    OCRObject = {}
    while (OCRList.lastChild) {
        OCRList.removeChild(OCRList.lastChild)
    }
})