let objectLabels = [
    'person',
    'bicycle',
    'car',
    'motorcycle',
    'airplane',
    'bus',
    'train',
    'truck',
    'boat',
    'traffic light',
    'fire hydrant',
    'stop sign',
    'parking meter',
    'bench',
    'bird',
    'cat',
    'dog',
    'horse',
    'sheep',
    'cow',
    'elephant',
    'bear',
    'zebra',
    'giraffe',
    'backpack',
    'umbrella',
    'handbag',
    'tie',
    'suitcase',
    'frisbee',
    'skis',
    'snowboard',
    'sports ball',
    'kite',
    'baseball bat',
    'baseball glove',
    'skateboard',
    'surfboard',
    'tennis racket',
    'bottle',
    'wine glass',
    'cup',
    'fork',
    'knife',
    'spoon',
    'bowl',
    'banana',
    'apple',
    'sandwich',
    'orange',
    'broccoli',
    'carrot',
    'hot dog',
    'pizza',
    'donut',
    'cake',
    'chair',
    'couch',
    'potted plant',
    'bed',
    'dining table',
    'toilet',
    'tv',
    'laptop',
    'mouse',
    'remote',
    'keyboard',
    'cell phone',
    'microwave',
    'oven',
    'toaster',
    'sink',
    'refrigerator',
    'book',
    'clock',
    'vase',
    'scissors',
    'teddy bear',
    'hair drier',
    'toothbrush'
]
let filterObjectLabels = objectLabels
let chosenLabels = {}

let checkIconPath = ['../assets/icon/unchecked.png', '../assets/icon/check.png'] 

let objFilter = document.getElementById('obj-filter')
let objFilterList = document.getElementById('obj-filter-list')

const handleCheck = (e, document, idx, label) => {
    if(document.getAttribute("src") === checkIconPath[1]) {
        delete chosenLabels[idx]
        document.setAttribute("src", checkIconPath[0])
    } else {
        chosenLabels[idx] = label
        document.setAttribute("src", checkIconPath[1])
    }
}

const showFilterItem = (labelList) => {
    
    while(objFilterList.lastChild) {
        objFilterList.removeChild(objFilterList.lastChild)
    }

    labelList.forEach((label, objIdx) => {
        let objItem = document.createElement("span")
        objItem.setAttribute("class", "object-filter-item")
        objItem.innerHTML = label

        let checkIcon = document.createElement("img")
        checkIcon.setAttribute("class", "object-filter-check-icon")
        checkIcon.setAttribute("src", Object.values(chosenLabels).includes(label) ? checkIconPath[1] : checkIconPath[0])
        checkIcon.addEventListener('click', e => handleCheck(e, checkIcon, objIdx, label))

        objItem.appendChild(checkIcon)
        objFilterList.appendChild(objItem)
    })
}

const search = (value) => {
    return objectLabels.filter((o) =>
        String(o).toLowerCase().includes(value.toLowerCase())
    )
}

showFilterItem(filterObjectLabels)

objFilter.addEventListener('input', e => {
    filterObjectLabels = search(objFilter.value)
    showFilterItem(filterObjectLabels)
})

let ObjFilterOnly = document.getElementById("obj-filter-only")
let checkOnly = false
ObjFilterOnly.addEventListener("click", e => {
    if (!checkOnly) showFilterItem(Object.values(chosenLabels))
    else showFilterItem(filterObjectLabels)
    checkOnly = !checkOnly
})

let ObjFilterClear = document.getElementById("obj-filter-clear")
ObjFilterClear.addEventListener("click", e => {
    chosenLabels = {}
    showFilterItem(filterObjectLabels)
})