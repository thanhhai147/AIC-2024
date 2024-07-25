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