import express from "express";

import { create_Availability,getAvailability,update_availability,delete_availability, } from "../controllers/availabilityController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router=express.Router();


//routes
router.post('/',authMiddleware,create_Availability);
router.get('/dentist/:id',getAvailability);
router.put('/update/:id',authMiddleware,update_availability);
router.delete('/delete/:id',authMiddleware,delete_availability);



export default router;