module.exports = (code: number, message: string, data: object) => {
    return {
        code: code,
        message: message,
        data: data
    }
}