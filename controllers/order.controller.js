const User = require("../models/user.model");
const Order = require("../models/order.model");


exports.addOrder = async (req, res) => {

    /** User ID of reported must be present in x-access-token */
    const user = await User.findOne({
        userID: req.userID
    });

    console.log("getUser :", user);

    const orderObj = {
        sub_total: req.body.sub_total,
        phoneNumber: user.phoneNumber,
        userID: req.userID,
    }

    try {
        const newOrder = await Order.create(orderObj);

        return res.status(201).send({
            message: "Order created Successfully !",
            ticket: newOrder
        })

    } catch (error) {

        console.log(error);
        return res.status(400).send({
            message: error.message
        })

    }

}


exports.getOrderByUserID = async (req, res) => {
    /**
 * Controller to fetch the Order based on ID's 
 */

    const order = await Order.find({
        userID: req.params.userID
    });

     return res.status(200).send({
        status: 200,
        message: "Order get successfully !",
        orderDetail: order
    });
}


