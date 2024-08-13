class QueryAPI {
    static query(textQuery, limitQuery) {
        return fetch(
            `http://localhost:8000/query?text=${textQuery}&limit=${limitQuery}`, 
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

    static queryVideo(syntheticId) {
        return fetch(
            `http://localhost:8000/query-video?synthetic-id=${syntheticId}`, 
            {
                method: "GET",
                mode: "cors"
            }
        )
    }

    static queryRelevance(relevanceQuery, limitQuery) {
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
                    limit: limitQuery
                })
            }
        )
    }

    static queryReranking(imageQuery, textQuery, limitQuery) {
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
                    limit: limitQuery
                })
            }
        )
    }
}

export default QueryAPI