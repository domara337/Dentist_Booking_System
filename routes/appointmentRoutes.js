import express from "express";
import {
  create_Appointment,
  get_all_appointments,
  get_appointment_byId,
  get_appointments_byDate,
  get_appointments_byPatientId,
  get_appointments_byDentist,
  update_appointment,
  delete_appointment,
} from "../controllers/appointmentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create appointment
router.post("/", authMiddleware, create_Appointment);

// Get all appointments (admin only)
router.get("/", authMiddleware, get_all_appointments);

// Get appointments by date (via query param: ?day=2025-08-24)
router.get("/date", get_appointments_byDate);

// Get appointments by patient
router.get("/patient/:patientId", get_appointments_byPatientId);

// Get appointments by dentist
router.get("/dentist/:dentistId", get_appointments_byDentist);

// Get appointment by ID (keep this last!)
router.get("/:id", get_appointment_byId);

// Update appointment by ID
router.put("/:id", authMiddleware, update_appointment);

// Delete appointment by ID
router.delete("/:id", authMiddleware, delete_appointment);

export default router;
