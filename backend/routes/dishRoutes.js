const express=require('express');
const router=express.Router({mergeParams: true});
const dishControllers=require("../controllers/dishControllers");
const {validateNewDishData,validateEditDishData}=require("../middleware/joiValidations");

router.route('/').get(dishControllers.getAllDishes).post(validateNewDishData, dishControllers.addNewDish);

router.route('/:id').put(validateEditDishData, dishControllers.updateDishById).delete(dishControllers.deleteDishById);

module.exports=router;