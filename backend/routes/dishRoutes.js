const express=require('express');
const router=express.Router({mergeParams: true});
const dishControllers=require("../controllers/dishControllers");
const {validateNewDishData,validateEditDishData}=require("../middleware/joiValidations");
const {isLoggedIn}=require("../middleware/isLoggedIn");


router.route('/').get(dishControllers.getAllDishes).post(isLoggedIn, validateNewDishData, dishControllers.addNewDish);

router.route('/:id').put(isLoggedIn, validateEditDishData, dishControllers.updateDishById).delete(isLoggedIn, dishControllers.deleteDishById);

module.exports=router;