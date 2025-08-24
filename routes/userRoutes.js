import express from "express"

import { getMe,getUsers,getUserByEmail,getUserByPhone,findUserbyId,create_user,updateMe,deleteMe,delUserbyId } from "../controllers/userController"

import authMiddleware from "../middleware/authMiddleware"

const router=express.Router();



router.get('/me', getMe);
router.put('/update',authMiddleware, updateMe);
router.delete('/delete',authMiddleware,deleteMe);
router.delete('/delete/:id',authMiddleware,delUserbyId);
router.get('/getall',authMiddleware,getUsers);
router.get('/by-email',getUserByEmail);
router.get('/by-phone',getUserByPhone);
router.get('/:id',findUserbyId);
router.post('/register',create_user);



export default router;