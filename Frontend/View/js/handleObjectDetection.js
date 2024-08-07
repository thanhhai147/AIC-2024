let objectLabels = [
    'person_person_0',
    'traffic_bicycle_1',
    'traffic_car_2',
    'traffic_motorcycle_3',
    'traffic_airplane_4',
    'traffic_bus_5',
    'traffic_train_6',
    'traffic_truck_7',
    'traffic_boat_8',
    'traffic_traffic light_9',
    'traffic_fire hydrant_10',
    'traffic_stop sign_11',
    'traffic_parking meter_12',
    'animal_bird_13',
    'animal_cat_14',
    'animal_dog_15',
    'animal_horse_16',
    'animal_sheep_17',
    'animal_cow_18',
    'animal_elephant_19',
    'animal_bear_20',
    'animal_zebra_21',
    'animal_giraffe_22',
    'accessories_backpack_23',
    'accessories_umbrella_24',
    'accessories_handbag_25',
    'accessories_tie_26',
    'accessories_suitcase_27',
    'sport tools_frisbee_28',
    'sport tools_skis_29',
    'sport tools_snowboard_30',
    'sport tools_sports ball_31',
    'sport tools_kite_32',
    'sport tools_baseball bat_33',
    'sport tools_baseball glove_34',
    'sport tools_skateboard_35',
    'sport tools_surfboard_36',
    'sport tools_tennis racket_37',
    'utensils_bottle_38',
    'utensils_wine glass_39',
    'utensils_cup_40',
    'utensils_fork_41',
    'utensils_knife_42',
    'utensils_spoon_43',
    'utensils_bowl_44',
    'food_banana_45',
    'food_apple_46',
    'food_sandwich_47',
    'food_orange_48',
    'food_broccoli_49',
    'food_carrot_50',
    'food_hotdog_51',
    'food_pizza_52',
    'food_donut_53',
    'food_cake_54',
    'furniture_bench_55',
    'furniture_chair_56',
    'furniture_couch_57',
    'furniture_potted plant_58',
    'furniture_bed_59',
    'furniture_dining table_60',
    'furniture_toilet_61',
    'furniture_book_62',
    'furniture_clock_63',
    'furniture_vase_64',
    'furniture_teddy bear_65',
    'tech_tv_66',
    'tech_laptop_67',
    'tech_mouse_68',
    'tech_remote_69',
    'tech_keyboard_70',
    'tech_cell phone_71',
    'kitchen_microwave_72',
    'kitchen_oven_73',
    'kitchen_toaster_74',
    'kitchen_sink_75',
    'kitchen_refrigerator_76',
    'kitchen_scissors_77',
    'personal care_hair drier_78',
    'personal care_toothbrush_79'
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

const showInput = (parentDocument, iconDocument, idx, label) => {
    parentDocument.removeChild(iconDocument)

    if (!(idx.toString() in chosenLabels)) {
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
    }
    
    let lowerQuantity = document.createElement("input")
    lowerQuantity.setAttribute("type", "number")
    lowerQuantity.setAttribute("id", `obj-filter-LQ-${idx}`)
    lowerQuantity.setAttribute("class", "filter-item-input")
    lowerQuantity.setAttribute("min", 0)
    lowerQuantity.setAttribute("placeholder", "[LQ")
    lowerQuantity.value = chosenLabels[idx]['quantity']['lower']
    lowerQuantity.addEventListener('change', e => handleInputChange(e, 'LQ', idx))

    let upperQuantity = document.createElement("input")
    upperQuantity.setAttribute("type", "number")
    upperQuantity.setAttribute("id", `obj-filter-UQ-${idx}`)
    upperQuantity.setAttribute("class", "filter-item-input")
    upperQuantity.setAttribute("min", 0)
    upperQuantity.setAttribute("placeholder", "UQ]")
    upperQuantity.value = chosenLabels[idx]['quantity']['upper']
    upperQuantity.addEventListener('change', e => handleInputChange(e, 'UQ', idx))

    let lowerProportion = document.createElement("input")
    lowerProportion.setAttribute("type", "number")
    lowerProportion.setAttribute("id", `obj-filter-LP-${idx}`)
    lowerProportion.setAttribute("class", "filter-item-input")
    lowerProportion.setAttribute("min", 0)
    lowerProportion.setAttribute("max", 100)
    lowerProportion.setAttribute("placeholder", "[LP")
    lowerProportion.value = chosenLabels[idx]['proportion']['lower']
    lowerProportion.addEventListener('change', e => handleInputChange(e, 'LP', idx))

    let upperProportion = document.createElement("input")
    upperProportion.setAttribute("type", "number")
    upperProportion.setAttribute("id", `obj-filter-UP-${idx}`)
    upperProportion.setAttribute("class", "filter-item-input")
    upperProportion.setAttribute("min", 0)
    upperProportion.setAttribute("max", 100)
    upperProportion.setAttribute("placeholder", "UP]")
    upperProportion.value = chosenLabels[idx]['proportion']['upper']
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

const handleCheck = (e, parentDocument, iconDocument, idx, label) => {
    if(iconDocument.getAttribute("src") === checkIconPath[1]) {
        delete chosenLabels[idx]
        
        parentDocument.removeChild(document.getElementById(`obj-filter-LQ-${idx}`))
        parentDocument.removeChild(document.getElementById(`obj-filter-UQ-${idx}`))
        parentDocument.removeChild(document.getElementById(`obj-filter-LP-${idx}`))
        parentDocument.removeChild(document.getElementById(`obj-filter-UP-${idx}`))

        iconDocument.setAttribute("src", checkIconPath[0])
    } else {
        showInput(parentDocument, iconDocument, idx, label)
    }
}

const showFilterItem = (labelList) => {
    
    while(objFilterList.lastChild) {
        objFilterList.removeChild(objFilterList.lastChild)
    }

    let categoryTemp = []

    labelList.forEach(categoryLabel => {
        let [category, label, objIdx] = categoryLabel.split("_")
     
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
        checkIcon.setAttribute("src", objIdx.toString() in chosenLabels ? checkIconPath[1] : checkIconPath[0])
        checkIcon.addEventListener('click', e => handleCheck(e, objItem, checkIcon, objIdx, label))

        objItem.appendChild(checkIcon)
        objFilterList.appendChild(objItem)

        if(objIdx.toString() in  chosenLabels) showInput(objItem, checkIcon, objIdx, label)
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
    if (!checkOnly) showFilterItem(Object.keys(chosenLabels).map(idx => objectLabels[idx]))
    else showFilterItem(filterObjectLabels)
    checkOnly = !checkOnly
})

let ObjFilterClear = document.getElementById("obj-filter-clear")
ObjFilterClear.addEventListener("click", e => {
    for (let item in chosenLabels) delete chosenLabels[item]
    showFilterItem(filterObjectLabels)
})

export default chosenLabels