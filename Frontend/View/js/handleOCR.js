// OCR 
let OCRInput = document.getElementById("ocr-filter")
let chosenOCR = new Set()
let objIdx = 0

let OCRList = document.getElementById("ocr-filter-list")

let OCRCancelHandle = (e, OCRChild) => {
    chosenOCR.delete(OCRChild.innerText)
    OCRList.removeChild(OCRChild)
}

OCRInput.addEventListener("keypress", e => {
    if(e.key === "Enter") {
        if (OCRInput.value === "" || OCRInput.value === undefined || OCRInput.value === null || OCRInput.value.trim() === "") return
        chosenOCR.add(OCRInput.value)

        let newOCRChild = document.createElement('span')
        newOCRChild.setAttribute('id', `ocr-item-${objIdx}`)
        newOCRChild.setAttribute('class', 'ocr-filter-item')
        newOCRChild.innerText = OCRInput.value

        let newOCRCancel = document.createElement('img')
        newOCRCancel.setAttribute('id', `ocr-cancel-${objIdx}`)
        newOCRCancel.setAttribute('class', 'ocr-filter-item-cancel')
        newOCRCancel.setAttribute('src', '../assets/icon/cancel.png')

        newOCRCancel.addEventListener('click', e => OCRCancelHandle(e, newOCRChild))

        newOCRChild.appendChild(newOCRCancel)
        OCRList.appendChild(newOCRChild)

        OCRInput.value = null
        objIdx++
    }
})

let OCRClear = document.getElementById("ocr-filter-clear")
OCRClear.addEventListener('click', e => {
    OCRInput.value = null
    chosenOCR.clear()
    while (OCRList.lastChild) {
        OCRList.removeChild(OCRList.lastChild)
    }
})

export default chosenOCR