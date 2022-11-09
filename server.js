require('dotenv').config()
const express = require("express");
const { json } = require("express")
const app = express();
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const routes = require('./routes/todoRoutes')
const port = process.env.PORT || 3500

connectDB();

app.use(json());

app.use("/", routes);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
})
