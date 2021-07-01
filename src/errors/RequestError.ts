class RequestError {
    message: string
    statusCode: number

    constructor(message: string, statusCode?: number) {
        this.message = message
        if(statusCode) {
            this.statusCode = statusCode
        } else {
            this.statusCode = 400
        }
    }
}

export { RequestError }