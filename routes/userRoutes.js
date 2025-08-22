import express from "express"

import { getMe,getUsers,getUserByEmail,getUserByPhone,findUserbyId,create_user,updateMe,deleteMe,delUserbyId } from "../controllers/userController"

import authMiddleware from "../middleware/authMiddleware"

const router=express.Router();



router.get('/', getMe);
router.put('/update', updateMe);
router.delete('/delete',authMiddleware,deleteMe);
router.delete('delete/:id',authMiddleware,delUserbyId);
router.get('/getall',getUsers);
router.get('/getuseremail',getUserByEmail);
router.get('/getuserphone',getUserByPhone);
router.get('/:id',findUserbyId);
router.post('/create-user',create_user);



export default router;