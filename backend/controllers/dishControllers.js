const Dish=require('../models/dish');
const catchAsync=require('../utils/catchAsync');
const myError=require('../utils/myError');

exports.getAllDishes=catchAsync(async(req,res,next)=>{
 const dishes=await Dish.find({});
 if(!dishes){
    return next (new myError(404,"Error! No dishes found!")); //calling the custom error handler defined in server.js
 }
 return res.status(201).json({
     success:true,
     data:dishes
 });
});

exports.addNewDish=catchAsync(async(req,res,next)=>{
    //VALIDATE incoming data using Joi first
    const dish=new Dish(req.body);
    await dish.save();
    return res.status(201).json({
        success: true,
        data:dish
    });
});

exports.updateDishById=catchAsync(async(req,res,next)=>{
    const dish=await Dish.findById(req.params.id);// Find the dish with the given `id`, or `null` if not found
    if(!dish){
        return next(new myError(404,"Error! Could not find that dish!"));
    }
    return res.status(201).json({
        success: true,
        data: dish,
    });
})

exports.deleteDishById=catchAsync(async(req,res,next)=>{
    const dish=await Dish.findByIdAndDelete(req.params.id);
    if(!dish){
        return next(new myError(404,"Error! Could not find that dish!"));
    }
    return res.status(201).json({
        success: true,
        data: dish,
    });
})