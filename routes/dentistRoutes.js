import express from "express";
import { create_Dentist,get_All_dentists,get_dentist_byId,update_Dentist,delete_dentist } from "../controllers/dentistController.js";
import authMiddleware from "../middleware/authMiddleware.js";



const router=express.Router();


//routes
router.post('/',authMiddleware,create_Dentist)
router.get('/',get_All_dentists);
router.get('/:id',get_dentist_byId);
router.put('/update/:id',authMiddleware,update_Dentist);
router.delete('/delete/:id',authMiddleware,delete_dentist)




export default router;