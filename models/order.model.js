
/**
* Schema for the Order Model will be provided Here
*/

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    user_id: { 
        type: mongoose.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },

    sub_total: { 
        type: Number, 
        required: true 
    },

    phone_number: { 
        type: String, 
        required: true 
    },
  });