const Order=require('../models/order');
const catchAsync=require('../utils/catchAsync');
const myError=require('../utils/myError');
const nodemailer = require('nodemailer');

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

    //send confirmation email to inform that order has been placed
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
          user:process.env.EMAIL_ADDRESS,
          pass:process.env.EMAIL_PASSWORD
        },
    });
    let time=order.time;
    let displayTime=  (time>12.5? ((time-12)%1===0?(time-12):(time-12.5)): (time%1===0?time:time-0.5))+":"+ (time%1===0? "00":"30") +" "+ (time>=12?"pm":"am");
    let messageList=('<ol>');
    for(let i=0;i<order.items.length;++i){
        messageList+=('<li>'+ order.item.qty + 'x' + order.item.name +'</li>');
    }
    messageList+=('</ol>');
    const mailOptions = {
        to: order.email,
        from: 'jaireen.s21@gmail.com',
        subject: 'ORDER-IN : Your order has been placed',
        text: `Hello ${order.name},\n\n` +
        `This is a confirmation email. The following order has been placed successfully:\n\n`+ `Date: ${order.date.toLocaleDatString("en-CA")}\n` + `Time: ${displayTime}\n\n` + `Method: ${order.method}\n`+ `Items:\n ${messageList}\n`+ `Total: $ ${messageList}\n\n` + 'Enjoy!\n'
    };
    transporter.sendMail(mailOptions,(err)=>{
        if(err){
            return next (new myError(500,"Error sending confirmation email! Please contact restaurant at (123) 456-7890 to confirm your order!")); //calling the custom error handler defined in server.js
        }
    });

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
