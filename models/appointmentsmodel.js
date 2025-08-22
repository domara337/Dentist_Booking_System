import pool from "../config/db";

// Create appointment
export const createAppointment = async (patientId, dentistId, date, status) => {
  const result = await pool.query(
    "INSERT INTO appointments(patient_id, dentist_id, date, appointment_status) VALUES($1,$2,$3,$4) RETURNING *",
    [patientId, dentistId, date, status]
  );
  return result.rows[0];
};

// Get appointment by ID with JOIN to patient and dentist
export const getAppointmentById = async (appId) => {
  const query = `
    SELECT 
      a.id AS appointment_id,
      a.date,
      a.appointment_status AS status,
      p.id AS patient_id,
      p.name AS patient_name,
      p.email AS patient_email,
      d.id AS dentist_id,
      d.name AS dentist_name,
      d.specialty AS dentist_specialty
    FROM appointments a
    JOIN patients p ON a.patient_id = p.id
    JOIN dentists d ON a.dentist_id = d.id
    WHERE a.id = $1
  `;
  const result = await pool.query(query, [appId]);
  return result.rows[0]; // single appointment
};

// Get all appointments
export const getAllAppointments = async () => {
  const query = `
    SELECT 
      a.id AS appointment_id,
      a.date,
      a.appointment_status AS status,
      p.id AS patient_id,
      p.name AS patient_name,
      p.email AS patient_email,
      d.id AS dentist_id,
      d.name AS dentist_name,
      d.specialty AS dentist_specialty
    FROM appointments a
    JOIN patients p ON a.patient_id = p.id
    JOIN dentists d ON a.dentist_id = d.id
  `;
  const result = await pool.query(query);
  return result.rows; // return all appointments
};

// Get appointments by patient
export const getAppointmentsByPatient = async (patientId) => {
  const query = `
    SELECT 
      a.id AS appointment_id,
      a.date,
      a.appointment_status AS status,
      d.id AS dentist_id,
      d.name AS dentist_name,
      d.specialty AS dentist_specialty
    FROM appointments a
    JOIN dentists d ON a.dentist_id = d.id
    WHERE a.patient_id = $1
  `;
  const result = await pool.query(query, [patientId]);
  return result.rows; // can be multiple
};

// Get appointments by dentist
export const getAppointmentsByDentist = async (dentistId) => {
  const query = `
    SELECT 
      a.id AS appointment_id,
      a.date,
      a.appointment_status AS status,
      p.id AS patient_id,
      p.name AS patient_name,
      p.email AS patient_email
    FROM appointments a
    JOIN patients p ON a.patient_id = p.id
    WHERE a.dentist_id = $1
  `;
  const result = await pool.query(query, [dentistId]);
  return result.rows; // can be multiple
};

// Get appointments by date
export const getAppointmentsByDate = async (date) => {
  const query = `
    SELECT 
      a.id AS appointment_id,
      a.date,
      a.appointment_status AS status,
      p.id AS patient_id,
      p.name AS patient_name,
      d.id AS dentist_id,
      d.name AS dentist_name
    FROM appointments a
    JOIN patients p ON a.patient_id = p.id
    JOIN dentists d ON a.dentist_id = d.id
    WHERE a.date = $1
  `;
  const result = await pool.query(query, [date]);
  return result.rows;
};

// Update appointment
export const updateAppointment = async (id, updates) => {
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  if (fields.length === 0) throw new Error("No updates provided");

  const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(", ");
  const query = `UPDATE appointments SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`;

  const result = await pool.query(query, [...values, id]);
  return result.rows[0]; // updated appointment
};

// Delete appointment
export const deleteAppointment = async (id) => {
  const result = await pool.query("DELETE FROM appointments WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};
