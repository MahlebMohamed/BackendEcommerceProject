const Mongoose = require("mongoose");

function dbConnection() {
    Mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then((connect) => {
            console.log(`Database Connected : ${connect.connection.host}`);
        })
    // .catch((error) => {
    //     console.log(`Database Error: ${error}`);
    //     process.exit(1);
    // });
}

module.exports = dbConnection;