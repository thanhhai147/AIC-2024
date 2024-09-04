const topicList = [
    "science & technology_Khoa học & Công nghệ",
    "social & culture_Xã hội & Văn hóa",
    "politics_Chính trị",
    "economy_Kinh tế",
    "sport_Thể thao",
    "education_Giáo dục",
    "healthcare_Y tế",
    "environment_Môi trường",
    "accidents & disasters_Tai nạn & Thiên tai",
    "law & security_Luật & An ninh",
    "travel & food_Du lịch & Ẩm thực",
    "entertainment & art_Giải trí & Nghệ thuật",
]

let filterTopicList = topicList

const checkIconPath = ['../assets/icon/unchecked.png', '../assets/icon/check.png'] 
let chosenTopicList = new Set()
let chosenFilterTopicList = new Set()
let summaryContainer = document.getElementById('summary-filter-list')
let summaryInput = document.getElementById('summary-filter')
let summaryClear = document.getElementById('summary-filter-clear')
let summaryOnly = document.getElementById("summary-filter-only")
let checkOnly = false

const handleCheckTopic = (fullTopic, engTopic, checkIcon) => {
    if (checkIcon.getAttribute("src") === checkIconPath[0]) {
        chosenFilterTopicList.add(fullTopic)
        chosenTopicList.add(engTopic)
        checkIcon.setAttribute("src", checkIconPath[1])
    } else {
        chosenFilterTopicList.delete(fullTopic)
        chosenTopicList.delete(engTopic)
        checkIcon.setAttribute("src", checkIconPath[0])
    }
}

const showTopic = (topicList) => {

    while(summaryContainer.lastChild) summaryContainer.removeChild(summaryContainer.lastChild)
    
    topicList.forEach(topic => {
        let [engTopic, vietTopic] = topic.split("_")
        let topicText = document.createElement("span")
        topicText.className = 'summary-filter-label normal-text'
        let topicReplace = engTopic.replace("_", " ").split("/").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" / ") + " (" + vietTopic.charAt(0).toUpperCase() + vietTopic.slice(1) + ")"
        topicText.innerHTML = topicReplace
    
        let summaryWrapper = document.createElement("div")
        summaryWrapper.className = 'filter-wrapper'
    
        let checkIcon = document.createElement("img")
        checkIcon.className = 'filter-check-icon'
        checkIcon.src = chosenTopicList.has(engTopic) ? checkIconPath[1] : checkIconPath[0]
        checkIcon.addEventListener("click", e => handleCheckTopic(topic, engTopic, checkIcon))
    
        summaryWrapper.appendChild(topicText)
        summaryWrapper.appendChild(checkIcon)
        summaryContainer.appendChild(summaryWrapper)
    })
}

const search = (value) => {
    return topicList.filter((o) =>
        String(o).toLowerCase().includes(value.toLowerCase())
    )
}

showTopic(filterTopicList)

summaryInput.addEventListener("input", e => {
    filterTopicList = search(e.target.value)
    showTopic(filterTopicList)
})

summaryClear.addEventListener("click", e => {
    summaryInput.value = null
    chosenTopicList.clear()
    showTopic(filterTopicList)
})

summaryOnly.addEventListener("click", e => {
    if (!checkOnly) showTopic(chosenFilterTopicList)
    else showTopic(filterTopicList)
    checkOnly = !checkOnly
})

export default chosenTopicList