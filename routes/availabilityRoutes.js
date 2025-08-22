import express from "express";

import { create_Availability,getAvailability,update_availability,delete_availability, } from "../controllers/availabilityController";



const router=express.Router();


//routes
router.post('/',create_Availability);
router.get('/:id',getAvailability);
router.put('/update',update_availability);
router.delete('/delete',delete_availability);



export default router;