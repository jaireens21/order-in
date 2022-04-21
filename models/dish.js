const mongoose=require('mongoose');

const dishSchema= new mongoose.Schema({
    name:String,
    category:String,
    description:String,
    price:Number
});
module.exports=mongoose.model('Dish', dishSchema);