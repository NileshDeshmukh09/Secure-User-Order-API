const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
/** Registration Controller  for the User  */

exports.signup = async (req, res) => {

    const UserDetailsStoredInDB = {
        name: req.body.name,
        userID: req.body.userID,
        phoneNumber: req.body.phoneNumber,
        // Hash the password
        password: bcrypt.hashSync(req.body.password, 8),
    }

    /**
     * Create the New User and Added to the database
    */
    try {
        const newUser = await User.create(UserDetailsStoredInDB);
        await newUser.save();

        /**
        *  response
        */
        const ResponseOfNewUser = {
            name: newUser.name,
            userID: newUser.userID,
            phoneNumber: newUser.phoneNumber,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        }

        console.log(ResponseOfNewUser);
        return res.status(201).send({
            success: true,
            message: `${newUser.userID} , Added Successully !`,
            user: ResponseOfNewUser
        });
    } catch (err) {

        console.log(err.message);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error ,when Insert User !"
        })
    }

}



/**
 * signin Controller
 */
exports.signin = async (req, res) => {

    //Search the user if it exists 
    try {
        var user = await User.findOne({ phoneNumber: req.body.phoneNumber });



        if (user == null) {
            return res.status(400).send("phoneNumber Doesn't Exist !")
        }

        //User is exists , check for the valid password
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send("Invalid Password")
        }

        //** Successfull login */
        //I need to generate access token now
        console.log("userID :", user.userID);
        const token = jwt.sign({ id: user.userID }, process.env.SECRET, {
            expiresIn: '2h'
        });

        //Send the response back 
        return res.status(200).send({
            status: 200,
            message: `${user.name} login Successfully !`,
            user: {
                name: user.name,
                userID: user.userID,
                phoneNumber: user.phoneNumber,
                accessToken: token
            }
        })
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error ,when Insert User !"
        })
    }

};