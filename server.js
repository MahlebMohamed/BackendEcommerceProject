const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({ path: 'config.env' });

const dbConnection = require('./config/database');
const categoryRouter = require('./routes/categoryRoute');
const ApiError = require('./utlis/apiError');
const globalError = require('./middlewares/errorMiddleware');

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
    next(new ApiError(`Can't find this route: ${request.originalUrl}`, 400));
});

// Global error handling middleware
app.use(globalError);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});