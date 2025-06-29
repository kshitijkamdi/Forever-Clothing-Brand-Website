// placing order using COD
const placeOrderCOD = async (req, res) => {

    try {
        
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            status: "Order Placed.",
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {orderData: {}})

        res.json({ success: true, message: "Order placed successfully." });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message }); 
        
    }
}

// placing order using Razorpay
const placeOrderRazorpay = async (req, res) => {}

// placing order using Stripe
const placeOrderStripe = async (req, res) => {}

// All orders for Admin Panel
const allOrders = async (req, res) => {}

// user orders data for frontend
const userOrders = async (req, res) => {}

// updating order status for Admin Panel
const updateOrderStatus = async (req, res) => {}

export {
    placeOrderCOD,
    placeOrderRazorpay,
    placeOrderStripe,
    allOrders,
    userOrders,
    updateOrderStatus
};