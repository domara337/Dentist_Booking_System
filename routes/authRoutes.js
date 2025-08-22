import express from "express"
import { login,register } from "../controllers/authController"
import authMiddleware from "../middleware/authMiddleware"


const router=express.Router();



//routes
router.post('/register',register);
router.post('/login',login);
router.get('/me',authMiddleware)



export default router;