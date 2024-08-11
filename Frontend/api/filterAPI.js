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

    static filterByColorFeature(syntheticId, colorFeature) {
        return fetch(
            `http://localhost:8000/filter-by-color-feature`, 
            {
                method: "POST",
                mode: "cors",
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    syntheticId: syntheticId,
                    colorFeature: colorFeature
                })
            }
        )
    }

    static filterBySpaceRecognition(syntheticId, spaceRecognition) {
        return fetch(
            `http://localhost:8000/filter-by-space-recognition`, 
            {
                method: "POST",
                mode: "cors",
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    syntheticId: syntheticId,
                    spaceRecognition: spaceRecognition
                })
            }
        )
    }

    static filterBySummary(syntheticId, summaryTopic) {
        return fetch(
            `http://localhost:8000/filter-by-summary`, 
            {
                method: "POST",
                mode: "cors",
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    syntheticId: syntheticId,
                    summaryTopic: summaryTopic
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

    static filterByAllModels(syntheticId, ocr, objectDetection, colorFeature, spaceRecognition, summaryTopic) {
        return fetch(
            `http://localhost:8000/filter-by-all-models`, 
            {
                method: "POST",
                mode: "cors",
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    syntheticId: syntheticId,
                    ocr,
                    objectDetection,
                    colorFeature,
                    spaceRecognition,
                    summaryTopic
                })
            }
        )
    }
}

export default FilterAPI