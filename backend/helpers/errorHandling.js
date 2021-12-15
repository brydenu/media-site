/**
 * Specific error handling based on type of error.
 */

class ErrorHandling extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

/**
 * NotFoundError: Used for 404 errors.
 */

class NotFoundError extends ErrorHandling {
    constructor(message) {
        super(message, 404);
    }
}

/**
 * UnauthorizedError: Used for 401 errors.
 */

class UnauthorizedError extends ErrorHandling {
    constructor(message) {
        super(message, 401);
    }
}

/**
 * BadRequestError: Used for 400 errors.
 */

class BadRequestError extends ErrorHandling {
    constructor(message) {
        super(message, 400);
    }
}

module.exports = {
    ErrorHandling,
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
};
