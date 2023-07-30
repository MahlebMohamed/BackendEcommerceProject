function globalError(error, request, response, next) {
    statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorForDev(error, response);
    } else {
        sendErrorForProd(error, response);
    }
}

function sendErrorForDev(error, response) {
    return response.status(400).json({
        status: error.status,
        error,
        message: error.message,
        stack: error.stack
    });
}

function sendErrorForProd(error, response) {
    return response.status(400).json({
        status: error.status,
        message: error.message,
    });
}

module.exports = globalError;