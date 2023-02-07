
// RESTFULL -APIs for Authentication
const express = require("express");
const orderController = require("../controllers/order.controller");
const {  JWTAuth } = require("../middlewares");
const router = express.Router();



/** ADD-ORDER - POST */
router.post("/add-order", [JWTAuth.verifyToken] , orderController.addOrder );

//  /** GET-ORDER - POST */
router.get("/get-order/:userID",  orderController.getOrderByUserID );

module.exports = router
   