const express =require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config()

const app = express();

app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/**
 * Setup the mongodb connection 
 */
// console.log(process.env.DB_URL);
mongoose.set('strictQuery', true);
 mongoose.connect(process.env.DB_URL, ()=>{
    console.log("MongoDB connected ");
    
});


app.listen(process.env.PORT, () => {
    console.log(`Secure-user-order-Server has started on the port http://localhost:${process.env.PORT}` );
})