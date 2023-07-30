const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({ path: 'config.env' });


const dbConnection = require('./config/database');
const categoryRouter = require('./routes/categoryRoute');
const ApiError = require('./utlis/apiError');

// DATABASE
dbConnection();

const app = express();

app.use(express.json());

// Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.NODE_ENV}`);
}

// Router
app.use('/api/v1/categories', categoryRouter);

app.all('*', (request, response, next) => {
    // const error = new Error(`Can't find this route: ${request.originalUrl}`);
    // next(error.message);

    next(new ApiError(`Can't find this route: ${request.originalUrl}`, 400));
});

// Global error handling middleware
app.use((error, request, response, next) => {
    statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    response.status(400).json({
        status: error.status,
        error,
        message: error.message,
        stack: error.stack
    });
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});