class QueryAPI {
    static query(textQuery, folderID, videoID, keyframeID, limit) {
        return fetch(`http://localhost:8000/query?text=${textQuery}&folder=${folderID}&video=${videoID}&keyframe=${keyframeID}&limit=${limit}`)
    }
}

export default QueryAPI