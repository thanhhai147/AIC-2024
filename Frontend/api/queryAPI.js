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
}

export default QueryAPI