const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

/** AUthentication 
 * 
 *       Check if the the token is valid or not
 * 
 *  1. If No token is Passed In the Request Header - - NOT ALLOWED
 *  2. If Token is Paased : Authenticatd 
 *      If correct ALLOWS , else REJECT
 */

 function verifyToken(req, res , next){

    /**
     * Read the token from the Header
     */
    const token = req.headers["x-access-token"];

    if( !token ){
        return res.status(403).send({
            message : "No token Provided"
        })
    }

    // If the Token was provided , we need to verify it
    jwt.verify(token, process.env.SECRET , (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message : "UnAuthorised"
            });
        }

        // I will try to read the UserID from the decoded token and store it in req object
        req.userID = decoded.id;
        next();

    })
};


const authJWT = {
    verifyToken : verifyToken,
}

module.exports = authJWT;
