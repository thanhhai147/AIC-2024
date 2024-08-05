class FilterAPI {
    static filterByObjectDetection(syntheticId, objectDetection) {
        return fetch(
            `http://localhost:8000/filter-by-object-detection`, 
            {
                method: "POST",
                mode: "cors",
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    syntheticId: syntheticId,
                    objectDetection: objectDetection
                })
            }
        )
    }

    static filterByOCR(syntheticId, ocr) {
        return fetch(
            `http://localhost:8000/filter-by-ocr`, 
            {
                method: "POST",
                mode: "cors",
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    syntheticId: syntheticId,
                    ocr: ocr
                })
            }
        )
    }

    static filterBySyntheticId(syntheticId) {
        return fetch(
            `http://localhost:8000/filter-by-synthetic-id`, 
            {
                method: "POST",
                mode: "cors",
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    syntheticId: syntheticId
                })
            }
        )
    }
}

export default FilterAPI