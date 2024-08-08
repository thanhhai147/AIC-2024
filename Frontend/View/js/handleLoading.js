let container = document.getElementById("container")
let loadingContainer = document.getElementById("loading-container")

const openLoading = () => {
    container.style.filter = 'blur(4px)'
    loadingContainer.style.display = 'block'
}

const closeLoading = () => {
    container.style.filter = null
    loadingContainer.style.display = 'none'
}

export {
    openLoading,
    closeLoading
}