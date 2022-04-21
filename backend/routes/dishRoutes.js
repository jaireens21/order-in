const express=require('express');
const router=express.Router();
const dishControllers=require("../controllers/dishControllers");

router.route('/').get(dishControllers.getAllDishes).post(dishControllers.addNewDish);

router.route('/:id').put(dishControllers.updateDishById).delete(dishControllers.deleteDishById);

module.exports=router;