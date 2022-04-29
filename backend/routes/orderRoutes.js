const express=require('express');
const router=express.Router();
const orderControllers=require("../controllers/orderControllers");

router.route('/')
    .get(orderControllers.getAllOrders)
    .post(orderControllers.addNewOrder);

router.route('/:id').put(orderControllers.updateOrderById);

module.exports=router;