const express=require('express');
const router=express.Router();
const dishControllers=require("../controllers/dishControllers");
const {validateNewDishData,validateEditDishData}=require("../middleware");

router.route('/').get(dishControllers.getAllDishes).post(validateNewDishData, dishControllers.addNewDish);

router.route('/:id').put(validateEditDishData, dishControllers.updateDishById).delete(dishControllers.deleteDishById);

module.exports=router;