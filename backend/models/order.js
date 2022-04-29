const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    comments:String,
    method:String,
    date:Date,
    time:Number,
    total:Number,
    completed:Boolean,
    items:[{
        name:String,
        category:String,
        description:String,
        price:Number,
        qty:Number,
        _id: false,
    }],
    

});

module.exports=mongoose.model('Order', orderSchema);