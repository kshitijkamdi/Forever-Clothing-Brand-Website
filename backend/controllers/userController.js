import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// route for user login
const userLogin = async (req, res) => { 
    try {
        const { email, password } = req.body;

        // check if user exists
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.json({success:false, message:"Invalid credentials"})
        }
        else{
            const token = generateToken(user._id);
            res.json({success:true, token})
        }

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    
    }
};

// route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if user already exists
        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "User already exists." });
        }
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Password must be at least 8 characters.",
            });
        }

        // password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        const token = generateToken(user._id);

        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Internal Server Error" });
    }
};

// for updating user profile
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, password } = req.body;
        
        // Dynamic update object
        const updateData = {};

        if (name) updateData.name = name;
        if (phone) updateData.phone = phone;

        // Update specific address sub-fields without overwriting existing ones
        if (address) {
            const parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;
            Object.keys(parsedAddress).forEach((key) => {
                updateData[`address.${key}`] = parsedAddress[key];
            });
        }

        if (password) {
            if (password.length < 8) {
                return res.json({ success: false, message: "Password must be at least 8 characters" });
            }
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        // Apply partial update
        const updatedUser = await userModel.findByIdAndUpdate(
            userId, 
            { $set: updateData }, 
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "Profile updated exquisitely", user: updatedUser });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const { userId } = req.body; // Attached by authUser middleware
        const user = await userModel.findById(userId).select("-password");

        if (!user) {
            console.log(error.message);
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// route for admin login
const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success:true, token});
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
 };

export { userLogin, registerUser, updateProfile, adminLogin, getProfile };
