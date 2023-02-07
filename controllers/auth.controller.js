const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
/** Registration Controller  for the User  */

exports.signup = async ( req, res ) => {

    const UserDetailsStoredInDB = {
        name: req.body.name,
        phoneNumber : req.body.phoneNumber,
        password: bcrypt.hashSync(req.body.password, 8),
    }

     /**
     * Create the New User and Added to the database
     */
      try {
        const newUser = await User.create(UserDetailsStoredInDB);

         /**
         *  response
         */
          const ResponseOfNewUser = {
            name: newUser.name,
            phoneNumber: newUser.phoneNumber,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        }

        res.status(201).send({
            success: true,
            message: `${newUser.name} , Added Successully !`,
            user: ResponseOfNewUser
        });
    } catch (err) {

        console.log( err.message);
        res.status(500).send({
            message: "Internal Server Error ,when Insert User !"
        })
    }

}
