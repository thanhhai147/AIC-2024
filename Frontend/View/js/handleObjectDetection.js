let objectLabels = [
    "person_person_con người_con người_0",
    "traffic_bicycle_giao thông_xe đạp_1",
    "traffic_car_giao thông_ô tô_2",
    "traffic_motorcycle_giao thông_xe máy_3",
    "traffic_airplane_giao thông_máy bay_4",
    "traffic_bus_giao thông_xe buýt_5",
    "traffic_train_giao thông_tàu hỏa_6",
    "traffic_truck_giao thông_xe tải_7",
    "traffic_boat_giao thông_thuyền_8",
    "traffic_traffic light_giao thông_đèn giao thông_9",
    "traffic_fire hydrant_giao thông_trạm nước cứu hỏa_10",
    "traffic_stop sign_giao thông_biển báo dừng_11",
    "traffic_parking meter_giao thông_đồng hồ đỗ xe_12",
    "animal_bird_động vật_chim_13",
    "animal_cat_động vật_mèo_14",
    "animal_dog_động vật_chó_15",
    "animal_horse_động vật_ngựa_16",
    "animal_sheep_động vật_cừu_17",
    "animal_cow_động vật_bò_18",
    "animal_elephant_động vật_voi_19",
    "animal_bear_động vật_gấu_20",
    "animal_zebra_động vật_ngựa vằn_21",
    "animal_giraffe_động vật_hươu cao cổ_22",
    "accessories_backpack_phụ kiện_ba lô_23",
    "accessories_umbrella_phụ kiện_ô (dù)_24",
    "accessories_handbag_phụ kiện_túi xách_25",
    "accessories_tie_phụ kiện_cà vạt_26",
    "accessories_suitcase_phụ kiện_vali_27",
    "sport tools_frisbee_dụng cụ thể thao_đĩa bay_28",
    "sport tools_skis_dụng cụ thể thao_ván trượt tuyết đôi_29",
    "sport tools_snowboard_dụng cụ thể thao_ván trượt tuyết_30",
    "sport tools_sports ball_dụng cụ thể thao_bóng thể thao_31",
    "sport tools_kite_dụng cụ thể thao_diều_32",
    "sport tools_baseball bat_dụng cụ thể thao_gậy bóng chày_33",
    "sport tools_baseball glove_dụng cụ thể thao_găng tay bóng chày_34",
    "sport tools_skateboard_dụng cụ thể thao_ván trượt_35",
    "sport tools_surfboard_dụng cụ thể thao_ván lướt sóng_36",
    "sport tools_tennis racket_dụng cụ thể thao_vợt tennis_37",
    "utensils_bottle_dụng cụ ăn uống_chai_38",
    "utensils_wine glass_dụng cụ ăn uống_ly rượu_39",
    "utensils_cup_dụng cụ ăn uống_cốc_40",
    "utensils_fork_dụng cụ ăn uống_dĩa (nĩa)_41",
    "utensils_knife_dụng cụ ăn uống_dao_42",
    "utensils_spoon_dụng cụ ăn uống_thìa (muỗng)_43",
    "utensils_bowl_dụng cụ ăn uống_bát (tô)_44",
    "food_banana_thức ăn_chuối_45",
    "food_apple_thức ăn_táo_46",
    "food_sandwich_thức ăn_bánh sandwich_47",
    "food_orange_thức ăn_cam_48",
    "food_broccoli_thức ăn_bông cải xanh_49",
    "food_carrot_thức ăn_cà rốt_50",
    "food_hotdog_thức ăn_bánh mì xúc xích_51",
    "food_pizza_thức ăn_pizza_52",
    "food_donut_thức ăn_bánh rán_53",
    "food_cake_thức ăn_bánh ngọt_54",
    "furniture_bench_nội thất_ghế dài_55",
    "furniture_chair_nội thất_ghế_56",
    "furniture_couch_nội thất_ghế sofa_57",
    "furniture_potted plant_nội thất_cây cảnh trong chậu_58",
    "furniture_bed_nội thất_giường_59",
    "furniture_dining table_nội thất_bàn ăn_60",
    "furniture_toilet_nội thất_nhà vệ sinh_61",
    "furniture_book_nội thất_sách_62",
    "furniture_clock_nội thất_đồng hồ_63",
    "furniture_vase_nội thất_bình hoa_64",
    "furniture_teddy bear_nội thất_gấu bông_65",
    "tech_tv_công nghệ_tivi_66",
    "tech_laptop_công nghệ_máy tính xách tay_67",
    "tech_mouse_công nghệ_chuột_68",
    "tech_remote_công nghệ_điều khiển từ xa_69",
    "tech_keyboard_công nghệ_bàn phím_70",
    "tech_cell phone_công nghệ_điện thoại di động_71",
    "kitchen_microwave_bếp_lò vi sóng_72",
    "kitchen_oven_bếp_lò nướng_73",
    "kitchen_toaster_bếp_máy nướng bánh mì_74",
    "kitchen_sink_bếp_bồn rửa_75",
    "kitchen_refrigerator_bếp_tủ lạnh_76",
    "kitchen_scissors_bếp_kéo_77",
    "personal care_hair drier_chăm sóc cá nhân_máy sấy tóc_78",
    "personal care_toothbrush_chăm sóc cá nhân_bàn chải đánh răng_79",
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
        let [engCategory, engLabel, vietCategory, vietLabel, objIdx] = categoryLabel.split("_")
     
        if(!categoryTemp.includes(engCategory)) {
            let categoryItem = document.createElement("span")
            categoryItem.setAttribute("class", "object-filter-category")
            categoryItem.innerHTML = engCategory.charAt(0).toUpperCase() + engCategory.slice(1) + " (" + vietCategory.charAt(0).toUpperCase() + vietCategory.slice(1) + ")"
            objFilterList.appendChild(categoryItem)
            categoryTemp.push(engCategory)
        }

        let objItem = document.createElement("span")
        objItem.setAttribute("class", "object-filter-item")
        objItem.innerHTML = engLabel + " (" + vietLabel + ")"

        let checkIcon = document.createElement("img")
        checkIcon.setAttribute("class", "object-filter-check-icon")
        checkIcon.setAttribute("src", objIdx.toString() in chosenLabels ? checkIconPath[1] : checkIconPath[0])
        checkIcon.addEventListener('click', e => handleCheck(e, objItem, checkIcon, objIdx, engLabel))

        objItem.appendChild(checkIcon)
        objFilterList.appendChild(objItem)

        if(objIdx.toString() in chosenLabels) showInput(objItem, checkIcon, objIdx, engLabel)
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