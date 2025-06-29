import express from 'express';
import {
    placeOrderCOD,
    placeOrderRazorpay,
    placeOrderStripe,
    allOrders,
    userOrders,
    updateOrderStatus
} from '../controllers/orderController.js';
import authUser from '../middleware/auth.js';   
import adminAuth from '../middleware/userAuth.js';

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateOrderStatus);

//payment features
orderRouter.post('/place', authUser, placeOrderCOD);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);
orderRouter.post('/stripe', authUser, placeOrderStripe);

// User Features
orderRouter.post('/userOrders', authUser, userOrders);

export default orderRouter;