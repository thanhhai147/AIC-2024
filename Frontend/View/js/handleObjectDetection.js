let objectLabels = [
    'person_person',
    'traffic_bicycle',
    'traffic_car',
    'traffic_motorcycle',
    'traffic_airplane',
    'traffic_bus',
    'traffic_train',
    'traffic_truck',
    'traffic_boat',
    'traffic_traffic light',
    'traffic_fire hydrant',
    'traffic_stop sign',
    'traffic_parking meter',
    'animal_bird',
    'animal_cat',
    'animal_dog',
    'animal_horse',
    'animal_sheep',
    'animal_cow',
    'animal_elephant',
    'animal_bear',
    'animal_zebra',
    'animal_giraffe',
    'accessories_backpack',
    'accessories_umbrella',
    'accessories_handbag',
    'accessories_tie',
    'accessories_suitcase',
    'sport tools_frisbee',
    'sport tools_skis',
    'sport tools_snowboard',
    'sport tools_sports ball',
    'sport tools_kite',
    'sport tools_baseball bat',
    'sport tools_baseball glove',
    'sport tools_skateboard',
    'sport tools_surfboard',
    'sport tools_tennis racket',
    'utensils_bottle',
    'utensils_wine glass',
    'utensils_cup',
    'utensils_fork',
    'utensils_knife',
    'utensils_spoon',
    'utensils_bowl',
    'food_banana',
    'food_apple',
    'food_sandwich',
    'food_orange',
    'food_broccoli',
    'food_carrot',
    'food_hotdog',
    'food_pizza',
    'food_donut',
    'food_cake',
    'furniture_bench',
    'furniture_chair',
    'furniture_couch',
    'furniture_potted plant',
    'furniture_bed',
    'furniture_dining table',
    'furniture_toilet',
    'furniture_book',
    'furniture_clock',
    'furniture_vase',
    'furniture_teddy bear',
    'tech_tv',
    'tech_laptop',
    'tech_mouse',
    'tech_remote',
    'tech_keyboard',
    'tech_cell phone',
    'kitchen_microwave',
    'kitchen_oven',
    'kitchen_toaster',
    'kitchen_sink',
    'kitchen_refrigerator',
    'kitchen_scissors',
    'personal care_hair drier',
    'personal care_toothbrush'
]

let filterObjectLabels = objectLabels
let chosenLabels = {}

let checkIconPath = ['../assets/icon/unchecked.png', '../assets/icon/check.png'] 

let objFilter = document.getElementById('obj-filter')
let objFilterList = document.getElementById('obj-filter-list')

const handleInputChange = (e, type, idx) => {
    if(type === 'LQ') {
        chosenLabels[idx]["quantity"]["lower"] = e.target.value === "" ? null : e.target.value
    }

    if(type === 'UQ') {
        chosenLabels[idx]["quantity"]["upper"] = e.target.value === "" ? null : e.target.value
    }

    if(type === 'LP') {
        chosenLabels[idx]["proportion"]["lower"] = e.target.value === "" ? null : e.target.value
    }

    if(type === 'UP') {
        chosenLabels[idx]["proportion"]["upper"] = e.target.value === "" ? null : e.target.value
    }
}

const handleCheck = (e, parentDocument, iconDocument, idx, label) => {
    if(iconDocument.getAttribute("src") === checkIconPath[1]) {
        delete chosenLabels[idx]
        
        parentDocument.removeChild(document.getElementById(`obj-filter-LQ-${idx}`))
        parentDocument.removeChild(document.getElementById(`obj-filter-UQ-${idx}`))
        parentDocument.removeChild(document.getElementById(`obj-filter-LP-${idx}`))
        parentDocument.removeChild(document.getElementById(`obj-filter-UP-${idx}`))

        iconDocument.setAttribute("src", checkIconPath[0])
    } else {
        parentDocument.removeChild(iconDocument)

        chosenLabels[idx] = {
            "label": label,
            "quantity": {
                "lower": null,
                "upper": null
            },
            "proportion": {
                "lower": null,
                "upper": null
            }
        }
        let lowerQuantity = document.createElement("input")
        lowerQuantity.setAttribute("type", "number")
        lowerQuantity.setAttribute("id", `obj-filter-LQ-${idx}`)
        lowerQuantity.setAttribute("class", "filter-item-input")
        lowerQuantity.setAttribute("min", 0)
        lowerQuantity.setAttribute("placeholder", "[LQ")
        lowerQuantity.addEventListener('change', e => handleInputChange(e, 'LQ', idx))

        let upperQuantity = document.createElement("input")
        upperQuantity.setAttribute("type", "number")
        upperQuantity.setAttribute("id", `obj-filter-UQ-${idx}`)
        upperQuantity.setAttribute("class", "filter-item-input")
        upperQuantity.setAttribute("min", 0)
        upperQuantity.setAttribute("placeholder", "UQ]")
        upperQuantity.addEventListener('change', e => handleInputChange(e, 'UQ', idx))

        let lowerProportion = document.createElement("input")
        lowerProportion.setAttribute("type", "number")
        lowerProportion.setAttribute("id", `obj-filter-LP-${idx}`)
        lowerProportion.setAttribute("class", "filter-item-input")
        lowerProportion.setAttribute("min", 0)
        lowerProportion.setAttribute("max", 100)
        lowerProportion.setAttribute("placeholder", "[LP")
        lowerProportion.addEventListener('change', e => handleInputChange(e, 'LP', idx))

        let upperProportion = document.createElement("input")
        upperProportion.setAttribute("type", "number")
        upperProportion.setAttribute("id", `obj-filter-UP-${idx}`)
        upperProportion.setAttribute("class", "filter-item-input")
        upperProportion.setAttribute("min", 0)
        upperProportion.setAttribute("max", 100)
        upperProportion.setAttribute("placeholder", "UP]")
        upperProportion.addEventListener('change', e => handleInputChange(e, 'UP', idx))

        parentDocument.appendChild(lowerQuantity)
        parentDocument.appendChild(upperQuantity)
        parentDocument.appendChild(lowerProportion)
        parentDocument.appendChild(upperProportion)

        let checkIcon = document.createElement("img")
        checkIcon.setAttribute("class", "object-filter-check-icon")
        checkIcon.setAttribute("src", checkIconPath[1])
        checkIcon.addEventListener('click', e => handleCheck(e, parentDocument, checkIcon, idx, label))

        parentDocument.appendChild(checkIcon)
    }
}

const showFilterItem = (labelList) => {
    
    while(objFilterList.lastChild) {
        objFilterList.removeChild(objFilterList.lastChild)
    }

    let categoryTemp = []

    labelList.forEach((categoryLabel, objIdx) => {
        let [category, label] = categoryLabel.split("_")
     
        if(!categoryTemp.includes(category)) {
            let categoryItem = document.createElement("span")
            categoryItem.setAttribute("class", "object-filter-category")
            categoryItem.innerHTML = category.charAt(0).toUpperCase() + category.slice(1)
            objFilterList.appendChild(categoryItem)
            categoryTemp.push(category)
        }

        let objItem = document.createElement("span")
        objItem.setAttribute("class", "object-filter-item")
        objItem.innerHTML = label

        let checkIcon = document.createElement("img")
        checkIcon.setAttribute("class", "object-filter-check-icon")
        checkIcon.setAttribute("src", checkIconPath[0])
        checkIcon.addEventListener('click', e => handleCheck(e, objItem, checkIcon, objIdx, label))

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

export default chosenLabels