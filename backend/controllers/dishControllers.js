const Dish=require('../models/dish');
const catchAsync=require('../utils/catchAsync');

exports.getAllDishes=catchAsync(async(req,res,next)=>{
 res.send("getting all dishes");
});

exports.addNewDish=catchAsync(async(req,res,next)=>{
    // res.send("adding a new dish");

    //validate incoming data using Joi first
    const dish=await Dish.create(req.body);
    return res.status(201).json({
        success: true,
        data: dish,
    });
});

exports.updateDishById=catchAsync(async(req,res,next)=>{
    res.send("updating a dish by id");
})

exports.deleteDishById=catchAsync(async(req,res,next)=>{
    res.send("deleting a dish by id");
})