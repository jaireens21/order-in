const Dish=require('../models/dish');
const catchAsync=require('../utils/catchAsync');

exports.getAllDishes=catchAsync(async(req,res,next)=>{
 //res.send("getting all dishes");
 const dishes=await Dish.find({});
 return res.status(201).json({
     success:true,
     data:dishes
 });
});

exports.addNewDish=catchAsync(async(req,res,next)=>{
    //validate incoming data using Joi first
    const dish=new Dish(req.body);
    await dish.save();
    return res.status(201).json({
        success: true,
        data:dish
    });
});

exports.updateDishById=catchAsync(async(req,res,next)=>{
    const dish=await Dish.findById(req.params.id);
    if(!dish){
        //throw error with message: "Error! Could not find that dish!"
    }
    return res.status(201).json({
        success: true,
        data: dish,
    });
})

exports.deleteDishById=catchAsync(async(req,res,next)=>{
    const dish=await Dish.findByIdAndDelete(req.params.id);
    if(!dish){
        //throw error with message: "Error! Could not find that dish!"
    }
    return res.status(201).json({
        success: true,
        data: dish,
    });
})