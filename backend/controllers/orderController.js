import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay";

// Gateway configuration
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// Global variables
const currency = "inr";
const deliveryCharges = 50;

// 1. Placing order using COD
const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            status: "Order Placed",
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order placed successfully." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// 2. Placing order using Razorpay
const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            status: "Order Placed",
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
        };

        await razorpay.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error });
            }
            res.json({ success: true, order });
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// 3. Verify Razorpay Payment
const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body;

        const orderInfo = await razorpay.orders.fetch(razorpay_order_id);

        if (orderInfo.status === "paid") {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {
                payment: true,
                status: "Payment Completed",
            });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true, message: "Payment verified successfully." });
        } else {
            res.json({ success: false, message: "Payment failed." });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// 4. Placing order using Stripe
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const origin = req.headers.origin;

        const orderData = {
            userId,
            items,
            amount,
            address,
            status: "Order Placed",
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: { name: item.name },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: { name: "Shipping Charges" },
                unit_amount: deliveryCharges * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment",
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// 5. Verify Stripe Payment
const verifyPayment = async (req, res) => {
    const { success, orderId, userId } = req.body; // Changed from query to body to match token logic

    try {
        if (success === "true" || success === true) {
            await orderModel.findByIdAndUpdate(orderId, {
                payment: true,
                status: "Payment Completed",
            });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true, message: "Payment verified successfully." });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment verification failed." });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// 6. All orders for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// 7. User orders data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId }).sort({ date: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// 8. Updating order status for Admin Panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Order status updated successfully." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    placeOrderCOD,
    placeOrderRazorpay,
    placeOrderStripe,
    allOrders,
    userOrders,
    updateStatus,
    verifyPayment,
    verifyRazorpay,
};