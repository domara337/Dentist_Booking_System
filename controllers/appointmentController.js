
import {
  createAppointment,
  getAppointmentById,
  getAllAppointments,
  getAppointmentsByPatient,
  getAppointmentsByDentist,
  getAppointmentsByDate,
  updateAppointment,
  deleteAppointment
} from "../models/appointmentsmodel";







//create appointment
export const create_Appointment = async (req, res) => {
  try {
    const { patientId, dentistId } = req.params;
    const { date, status } = req.body;

    const appointment = await createAppointment(patientId, dentistId, date, status);

    if (!appointment) {
      return res.status(400).json({ message: "New appointment was not created" });
    }

    res.status(201).json({
      message: "Appointment created successfully",
      appointment
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};







//get all appointments
export const get_all_appointments = async (req, res) => {
  try {
    const appointments = await getAllAppointments();
    res.status(200).json({ appointments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching appointments", error: err.message });
  }
};






//get appointment by id
export const get_appointment_byId = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await getAppointmentById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};


// Get Appointments By Patient
export const get_appointments_byPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointments = await getAppointmentsByPatient(patientId);

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this patient" });
    }

    res.status(200).json({ appointments });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};





// Get Appointments By Dentist
export const get_appointments_byDentist = async (req, res) => {
  try {
    const { dentistId } = req.params;
    const appointments = await getAppointmentsByDentist(dentistId);

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this dentist" });
    }

    res.status(200).json({ appointments });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};





// Get Appointments By Date
export const get_appointments_byDate = async (req, res) => {
  try {
    const { date } = req.params;
    const appointments = await getAppointmentsByDate(date);

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this date" });
    }

    res.status(200).json({ appointments });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};









// Update Appointment
export const update_appointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedAppointment = await updateAppointment(id, updates);

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ updatedAppointment });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};









// Delete Appointment

export const delete_appointment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAppointment = await deleteAppointment(id);

    if (!deletedAppointment) {
      return res.status(404).json({ message: "Deletion failed or appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
