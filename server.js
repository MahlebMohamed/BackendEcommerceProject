const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({ path: 'config.env' });

const dbConnection = require('./config/database');
const categoryRouter = require('./routes/categoryRoute');
const ApiError = require('./utlis/apiError');
const globalError = require('./middlewares/errorMiddleware');
const subCategoryRouter = require('./routes/subCategoryRoute');
const brandRouter = require('./routes/brandRoute');
const productRouter = require('./routes/productRouter');

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
app.use('/api/v1/subCategories', subCategoryRouter);
app.use('/api/v1/brands', brandRouter);
app.use('/api/v1/products', productRouter);

app.all('*', (request, response, next) => {
    next(new ApiError(`Can't find this route: ${request.originalUrl}`, 400));
});

// Global error handling middleware
app.use(globalError);


const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

process.on('unhandledRejection', (error) => {
    console.log(`UnhandledRejection Errors: ${error.name} | ${error.message}`);
    server.close(() => {
        console.log(`Shutting down...`);
        process.exit(1);
    });
});