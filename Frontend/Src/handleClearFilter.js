export default function clearFilter() {
    localStorage.removeItem("syntheticId")
    localStorage.removeItem("ocr")
    localStorage.removeItem("objectDetection")
    localStorage.removeItem("colorFeature")
    localStorage.removeItem("spaceRecognition")
    localStorage.removeItem("summaryTopic")

    document.getElementById("ocr-filter-clear").click()
    document.getElementById("obj-filter-clear").click()
    document.getElementById('color-filter-clear').click()
    document.getElementById('space-filter-clear').click()
    document.getElementById('summary-filter-clear').click()
}