const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config()

const app = express();

app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Setup the mongodb connection 
 */
mongoose.set('strictQuery', false);
mongoose.connect(
    process.env.DB_URL,

)
    .then(() => console.log('MongoDB connected'))
    .catch(e => console.log(e));


const authRouter = require('./routes/auth.routes');
const orderRouter = require('./routes/order.routes');

app.use('/api/v1', authRouter);
app.use('/api/v1', orderRouter );


app.listen(process.env.PORT, () => {
    console.log(`Secure-user-order-Server has started on the port http://localhost:${process.env.PORT}`);
})