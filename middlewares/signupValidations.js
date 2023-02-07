/**
 *  custom middleware for verifying the request body
 */

const User = require("../models/user.model");

validateRequest = async (req, res, next) => {

    //Validate if userName exists
    if (!req.body.name) {
        console.log(res);
        return res.status(400).send(
            "Name is not provided"
        )
    }


    //Validate if the userID exists
    if (!req.body.userID) {
        return res.status(400).send(
            "UserID is not provided"
        )
    }

    /**
    * Valiate if the userID is already not preset
    */
    const user = await User.findOne({ userID : req.body.userID });
    if (user != null) {
        return res.status(400).send("UserID already exists")
    }


    //Validate if the userId exists
    const phoneNumber = req.body.phoneNumber;
    const phoneNumberRegex = /^\d{10}$/;

    if (!phoneNumber) {
        return res.status(400).send(
            "Phone Number is not provided"
        )
    }

    if (phoneNumber.toString().length !== 10) {
        res.status(400).send('Phone number must be a number of length 10');
    }

    if (!phoneNumberRegex.test(phoneNumber)) {
        res.status(400).send('Invalid phone number ');
    }

    /**
    * Valiate if the phoneNumber is already not preset
    */
    const userPhone = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (userPhone != null) {
        return res.status(400).send("phoneNumber already exists")
    }

    /** validate the "password" if it Exists */
    if (!req.body.password) {
        return res.status(400).send("Password is not provided")
    }

    //    /** validate the Password */
    //    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

    //    // message : "Password must have at least 1 upper case, 1 lower case, 1 digit, 1 special characters, and should be 8 characters in length."
    //    if( !passwordPattern.test( req.body.password )){
    //        return res.status(400).send( `Password must have at least - 1 upper case, 1 lower case,  1 digit, 1 special characters,  and should be 8 characters in length.`)
    //    }

    next(); // give the controll to the controller
}

module.exports = {
    validateRequest
}