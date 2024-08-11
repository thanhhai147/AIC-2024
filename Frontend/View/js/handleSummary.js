const topicList = [
    "Science & Technology_Khoa học & Công nghệ",
    "Social & Culture_Xã hội & Văn hóa",
    "Politics_Chính trị",
    "Economics_Kinh tế",
    "Sport_Thể thao",
    "Education_Giáo dục",
    "Healthcare_Y tế",
    "Environment_Môi trường",
    "Accident & Disaster_Tai nạn & Thiên tai",
    "Law & Security_Luật & An ninh",
    "Travel & Food_Du lịch & Ẩm thực",
    "Entertainment & Art_Giải trí & Nghệ thuật",
]

let filterTopicList = topicList

const checkIconPath = ['../assets/icon/unchecked.png', '../assets/icon/check.png'] 
let chosenTopicList = new Set()
let summaryContainer = document.getElementById('summary-filter-list')
let summaryInput = document.getElementById('summary-filter')
let summaryClear = document.getElementById('summary-filter-clear')

const handleCheckTopic = (topic, checkIcon) => {
    if (checkIcon.getAttribute("src") === checkIconPath[0]) {
        chosenTopicList.add(topic)
        checkIcon.setAttribute("src", checkIconPath[1])
    } else {
        chosenTopicList.delete(topic)
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
        checkIcon.addEventListener("click", e => handleCheckTopic(engTopic, checkIcon))
    
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
    chosenTopicList.clear()
    showTopic(filterTopicList)
})

export default chosenTopicList