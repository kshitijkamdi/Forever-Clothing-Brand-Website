import express from 'express';
import {
    placeOrderCOD,
    placeOrderRazorpay,
    placeOrderStripe,
    allOrders,
    userOrders,
    updateStatus
} from '../controllers/orderController.js';
import authUser from '../middleware/auth.js';   
import adminAuth from '../middleware/userAuth.js';
import { verifyPayment, verifyRazorpay } from '../controllers/orderController.js';

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

//payment features
orderRouter.post('/place', authUser, placeOrderCOD);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);
orderRouter.post('/stripe', authUser, placeOrderStripe);

// User Features
orderRouter.post('/userOrders', authUser, userOrders);

//verify payment
orderRouter.post('/verifyPayment', authUser, verifyPayment); //stripe
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay); //razorpay


export default orderRouter;