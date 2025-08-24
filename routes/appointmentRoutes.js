import express from "express";


import { create_Appointment,get_all_appointments,get_appointment_byId,get_appointments_byDate,get_appointments_byPatientId,get_appointments_byDentist,
    update_appointment,delete_appointment, } from "../controllers/appointmentController";



const router=express.Router();


router.post("/",create_Appointment);
router.get("/",get_all_appointments);
router.get("/:id",get_appointment_byId);
router.get("/date",get_appointments_byDate);
router.get("/:patientId",get_appointments_byPatientId)
router.get("/:dentistId",get_appointments_byDentist)
router.put("/",update_appointment);
router.delete("/delete",delete_appointment);