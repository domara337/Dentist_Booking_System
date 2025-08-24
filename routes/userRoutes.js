import express from "express";
import { getMe, getUsers, getUserByEmail, getUserByPhone, findUserbyId, updateMe, deleteMe, delUserbyId } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/me', authMiddleware, getMe); // usually requires auth
router.put('/update/:id', authMiddleware, updateMe);
router.delete('/delete', authMiddleware, deleteMe);
router.delete('/delete/:id', authMiddleware, delUserbyId);
router.get('/getall', authMiddleware, getUsers);
router.get('/by-email', getUserByEmail);
router.get('/by-phone', getUserByPhone);
router.get('/:id', findUserbyId);

export default router;
