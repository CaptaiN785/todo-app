const express = require('express');
require('dotenv').config({path: __dirname + '/.env' })
const cors = require('cors')

const PORT = process.env.PORT || 4000;

// middleware to parse data
const app = express()
app.use(express.json())
app.use(cors());

// let allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Headers', "*");
//     next();
// }
// app.use(allowCrossDomain);

// import routes for todo API
const todoRoutes = require("./routes/todo")

app.use("/api/v1", todoRoutes);

app.listen(PORT, () => {
    console.log("App is listening at port " + PORT);
})

const dbConnect = require("./config/database")
dbConnect();

app.get("/", (req, res)=> {
    res.send("this is home page.")
})