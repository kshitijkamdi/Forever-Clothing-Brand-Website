import express from 'express';
import { userLogin, registerUser, adminLogin, getProfile, updateProfile} from '../controllers/userController.js';
import authUser from "../middleware/auth.js";


const userRouter = express.Router();

userRouter.post('/login', userLogin);
userRouter.post('/register', registerUser);
userRouter.post('/admin', adminLogin);
userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile', authUser, updateProfile);

export default userRouter;