const Dish=require('../models/dish');
const catchAsync=require('../utils/catchAsync');
const myError=require('../utils/myError');

exports.getAllDishes=catchAsync(async(req,res,next)=>{
    const dishes=await Dish.find({});
    if(!dishes){
        return next (new myError(404,"Error! No dishes found!")); //calling the custom error handler defined in server.js
    }else{
        return res.status(201).json({
        success:true,
        data:dishes
        });
    }
});

exports.addNewDish=catchAsync(async(req,res,next)=>{
    //validating req.body using joi (see dishRoutes.js,middleware/joiValidations.js)
    const dish=new Dish(req.body);
    await dish.save();
    return res.status(201).json({
        success: true,
        data:dish//the new dish
    });
});

exports.updateDishById=catchAsync(async(req,res,next)=>{
    //validating req.body using joi (see dishRoutes.js,middleware/joiValidations.js)
    // console.log(req.body);
    const dish=await Dish.findByIdAndUpdate(req.params.id, req.body);// Find the dish with the given `id`, or `null` if not found
    if(!dish){
        return next(new myError(404,"Error! Could not find that dish!"));
    }else{
        return res.status(201).json({
        success: true,
        //data:dish //the found,unmodified dish
        });
    }
})

exports.deleteDishById=catchAsync(async(req,res,next)=>{
    const dish=await Dish.findByIdAndDelete(req.params.id);
    if(!dish){
        return next(new myError(404,"Error! Could not find that dish!"));
    }else{
        return res.status(201).json({
            success: true,
            data: dish,//the found dish
        });
    }
})