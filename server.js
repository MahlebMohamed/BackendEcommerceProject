const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({ path: 'config.env' });


const dbConnection = require('./config/database');
const categoryRouter = require('./routes/categoryRoute');

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
app.use('/api/v1/categories', categoryRouter)
// app.get('/api/v1/categories', (request, response) => {
//     response.send('Hello World');
// });


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});