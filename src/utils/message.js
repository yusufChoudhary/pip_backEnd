class message {
    static success(data) {
        return `${data} fetched successfully`
    }

    static created(data) {
        return `${data} created successfully`
    }

    static notFound(data) {
        return `${data} not found`
    }

    static updated(data) {
        return `${data} updated successfully`
    }

    static badRequest(data) {
        return `${data} not created`
    }

    static internalServerError() {
        return `Internal server error`
    }

    static fileTooLarge() {
        return `File too large. Maximum size is 5MB`
    }

    static delete(data) {
        return `${data} deleted successfully`   
    }
}

export default message;