const express=require('express');
const router=express.Router({mergeParams: true});
const orderControllers=require("../controllers/orderControllers");
const {validateNewOrderData, validateEditOrderData} =require("../middleware/joiValidations");
const {isLoggedIn}=require("../middleware/isLoggedIn");

router.route('/')
    .get(isLoggedIn, orderControllers.getAllOrders)
    .post(validateNewOrderData, orderControllers.addNewOrder);

router.route('/:id').put(validateEditOrderData, orderControllers.updateOrderById);

module.exports=router;