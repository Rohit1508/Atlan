export const processQuery = (query, schema) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(schema)
        }, 1000)
    })
}