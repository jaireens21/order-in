const Order=require('../models/order');
const catchAsync=require('../utils/catchAsync');
const myError=require('../utils/myError');

exports.getAllOrders=catchAsync(async(req,res,next)=>{
 const orders=await Order.find({});
 if(!orders){
    return next (new myError(404,"Error! No orders found!")); //calling the custom error handler defined in server.js
 }
 return res.status(201).json({
    success:true,
    data:orders
    });
});

exports.addNewOrder=catchAsync(async(req,res,next)=>{
    //VALIDATE incoming data using Joi first
    const order=new Order(req.body);
    await order.save();
    return res.status(201).json({
        success: true,
        data:order
    });
});
