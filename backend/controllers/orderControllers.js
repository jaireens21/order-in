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
    let date=new Date(order.date);
    let displayDate=date.toDateString("en-CA");
    let time=order.time;
    let displayTime=  (time>12.5? ((time-12)%1===0?(time-12):(time-12.5)): (time%1===0?time:time-0.5))+":"+ (time%1===0? "00":"30") +" "+ (time>=12?"pm":"am");
    let messageList="";
    for(let i=0;i<order.items.length;++i){
        messageList+=('• '+ order.items[i].qty + ' x ' + order.items[i].name+'\n' );
    }
   let requests=order.comments?order.comments:"--";
    const mailOptions = {
        to: [order.email, 'jaireen.s21@gmail.com'],//send email to user & to the restaurant email id
        from: 'jaireen.s21@gmail.com',
        subject: 'ORDER-IN : Your order has been placed',
        text: `Hello ${order.name},\n\n` +
        `This is a confirmation email. The following order has been placed successfully:\n\n`+ `Method: ${order.method.toUpperCase()} | ${order.name.toUpperCase()} | ${order.phone}\n`+ `Date: ${displayDate}\n` + `Time: ${displayTime}\n\n` + `Items:\n ${messageList}`+ `TOTAL: $ ${order.total}\n\n` + `Special Requests: ${requests.toUpperCase()}\n\n`+'Enjoy!\n' + 'Team Order-In\n'
    };
    
    try{
        await transporter.sendMail(mailOptions);
    }catch(err){
        return res.status(201).json({
            success: true,
            emailSent:false,//to indicate that although order was placed, email could not be sent
            data:order
        });
    }
    
        
    return res.status(201).json({
        success: true,
        emailSent:true,
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
