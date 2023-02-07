
/**
* Schema for the Order Model will be provided Here
*/

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    userID : {
        type: String,
        required: true,
    },

    sub_total: {
        type: Number,
        required: true
    }, 

    phoneNumber : {
        type : Number , 
        required : true
    }

});

/* These will automatically generates the created and updated fields */
orderSchema.set('timestamps' , true);

module.exports = mongoose.model("Order", orderSchema);
