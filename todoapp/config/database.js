const mongoose = require('mongoose')
require('dotenv').config()


const url = "mongodb+srv://captain785:Mukesh785@todo-cluster.8b9mp43.mongodb.net/?retryWrites=true&w=majority"
const localUrl = "mongodb://127.0.0.1:27017/todo"
const DATABASE_URL = process.env.DATABASE_URL || url

const dbConnect = () => {
    mongoose.connect( DATABASE_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => {
        console.log("Database connected!!");
    })
    .catch(err => {
        console.log("Issue in database connections");
        console.log(err);
        process.exit(1);
    })
}

module.exports = dbConnect;