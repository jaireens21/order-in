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
    //validating req.body using joi (see orderRoutes.js,middleware/joiValidations.js)
    const order=new Order(req.body);
    await order.save();
    return res.status(201).json({
        success: true,
        data:order
    });
});

exports.updateOrderById=catchAsync(async(req,res,next)=>{
    //validating req.body using joi (see dishRoutes.js,middleware/joiValidations.js)
    // console.log(req.body);
    const order=await Order.findByIdAndUpdate(req.params.id, req.body);
    if(!order){
        return next (new myError(404,"Error! Order not found!")); 
    }
    return res.status(201).json({
        success:true,
        //data:order//the found,unmodified order
    });
});
