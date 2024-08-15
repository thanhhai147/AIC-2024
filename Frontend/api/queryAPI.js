class QueryAPI {
    static query(textQuery, limitQuery, bertProportion, clipProportion) {
        return fetch(
            `http://localhost:8000/query?text=${textQuery}&limit=${limitQuery}&bert=${bertProportion}&clip=${clipProportion}`, 
            {
                method: "GET",
                mode: "cors"
            }
        )
    }

    static queryImage(syntheticId) {
        return fetch(
            `http://localhost:8000/query-image?synthetic-id=${syntheticId}`, 
            {
                method: "GET",
                mode: "cors"
            }
        )
    }

    static queryVideo(syntheticId, startTime, endTime) {
        return fetch(
            `http://localhost:8000/query-video?synthetic-id=${syntheticId}&start-time=${startTime}&end-time=${endTime}`, 
            {
                method: "GET",
                mode: "cors"
            }
        )
    }

    static queryRelevance(relevanceQuery, limitQuery, bertProportion, clipProportion) {
        return fetch(
            `http://localhost:8000/query-relevance`, 
            {
                method: "POST",
                mode: "cors",
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    relevanceQuery: relevanceQuery,
                    limit: limitQuery,
                    bertProportion: bertProportion,
                    clipProportion: clipProportion
                })
            }
        )
    }

    static queryReranking(imageQuery, textQuery, limitQuery, bertProportion, clipProportion) {
        return fetch(
            `http://localhost:8000/query-reranking`, 
            {
                method: "POST",
                mode: "cors",
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    imageQuery: imageQuery,
                    textQuery: textQuery,
                    limit: limitQuery,
                    bertProportion: bertProportion,
                    clipProportion: clipProportion
                })
            }
        )
    }
}

export default QueryAPI