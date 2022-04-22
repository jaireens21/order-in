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
    // res.send("adding a new dish");

    //validate incoming data using Joi first
    const dish=await Dish.create(req.body);
    return res.status(201).json({
        success: true,
        data: dish,
    });
});

exports.updateDishById=catchAsync(async(req,res,next)=>{
    //res.send("updating a dish by id");
    const dish=await Dish.findById(req.params.id);
    if(!dish){
        return res.status(500).json({
            success:false,
            data:"Error! Could not find that dish!"
        })
    }
    return res.status(201).json({
        success: true,
        data: dish,
    });

})

exports.deleteDishById=catchAsync(async(req,res,next)=>{
    res.send("deleting a dish by id");
})