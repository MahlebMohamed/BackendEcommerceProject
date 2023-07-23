const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({ path: 'config.env' });


const dbConnection = require('./config/database');
const categoryRouter = require('./routes/categoryRoute');
dbConnection();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.NODE_ENV}`);
}

app.use('api/v1/categories', categoryRouter)

app.get('/', (request, response) => {
    response.send('<h1>Hello API<h1/>');
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});