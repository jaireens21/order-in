const express=require('express');
const router=express.Router();
const orderControllers=require("../controllers/orderControllers");
const {validateNewOrderData, validateEditOrderData} =require("../middleware");

router.route('/')
    .get(orderControllers.getAllOrders)
    .post(validateNewOrderData, orderControllers.addNewOrder);

router.route('/:id').put(validateEditOrderData, orderControllers.updateOrderById);

module.exports=router;