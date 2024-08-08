// Query Visibility
let queryVisibilityIcon = document.getElementById("query-visibility-icon")
let queryVisibilityIconPath = ['../assets/icon/down.png', '../assets/icon/up.png']
let queryContainer = document.getElementById("query-container")
let relevanceContainer = document.getElementById("relevance-container")

document.getElementsByTagName("body")[0].addEventListener("load", e => {
    queryVisibilityIcon.setAttribute("src", queryVisibilityIconPath[0])
    queryContainer.style.display = 'flex'
})

document.getElementById("multiple-results").addEventListener("wheel", e => {
    queryVisibilityIcon.setAttribute("src", queryVisibilityIconPath[1])
    queryContainer.style.display = 'none'
    relevanceContainer.style.display = 'none'
})

queryVisibilityIcon.addEventListener("click", e => {
    if (queryVisibilityIcon.getAttribute('src') === queryVisibilityIconPath[0]) {
        queryVisibilityIcon.setAttribute("src", queryVisibilityIconPath[1])
        queryContainer.style.display = 'none'
        relevanceContainer.style.display = 'none'
    } else {
        queryVisibilityIcon.setAttribute("src", queryVisibilityIconPath[0])
        queryContainer.style.display = 'flex'
        relevanceContainer.style.display = 'flex'
    }
})

// Filter Visibility
let filterVisibilityIcon = document.getElementById("filter-visibility-icon")
let filterLabel = document.getElementById("filter-label-container")
let filterVisibilityIconPath = ['../assets/icon/down.png', '../assets/icon/up.png']
let filterContainer = document.getElementById("filter-container")

document.getElementsByTagName("body")[0].addEventListener("load", e => {
    filterVisibilityIcon.setAttribute("src", filterVisibilityIconPath[0])
    filterContainer.style.display = 'flex'
    filterLabel.style.marginBottom = '8px'
})

document.getElementById("multiple-results").addEventListener("wheel", e => {
    filterVisibilityIcon.setAttribute("src", filterVisibilityIconPath[1])
    filterContainer.style.display = 'none'
    filterLabel.style.marginBottom = 0
})

filterVisibilityIcon.addEventListener("click", e => {
    if (filterVisibilityIcon.getAttribute('src') === filterVisibilityIconPath[0]) {
        filterVisibilityIcon.setAttribute("src", filterVisibilityIconPath[1])
        filterContainer.style.display = 'none'
        filterLabel.style.marginBottom = 0
    } else {
        filterVisibilityIcon.setAttribute("src", filterVisibilityIconPath[0])
        filterContainer.style.display = 'flex'
        filterLabel.style.marginBottom = '8px'
    }
})

