import pool from "../config/db";



//create appointment
export const createAppointment=async(patientId,dentistId,date,status)=>{
    const result=await pool.query(
        "INSERT INTO appointments(patient_id,dentist_id,date,appointment_status) VALUES($1,$2,$3,$4) RETURNING *",
        [patientId,dentistId,date,status]
    )
    return result.rows[0];
}

//get appointment by id
export const getAppointmentById=async(app_id)=>{
    const result=await pool.query(
        "SELECT * FROM appointments WHERE id=$1", 
        [app_id]
    )
    return result.rows[0];
}

//get appointment by user
export const getAppointmentsByuser=async(patientId)=>{
    const result=await pool.query("SELECT * FROM appointments WHERE patient_id=$1",
        [patientId]
    )

    return result.rows[0]
}

//get appointments by date
export const getAppointmentsBydate=async(date)=>{
    const result=await pool.query("SELECT * FROM appointments WHERE date=$1",
        [date]
    )
}

//get all appointments
export const getAllApointments=async()=>{
    const result=await pool.query("SELECT * FROM appointments");
    return result.rows[0];
}


//get appointment by dentist
export const getAppointmentByDentist=async(dentistId)=>{
    const result=await pool.query(
        "SELECT * FROM appointments WHERE dentist_id=$1",
        [dentistId]
    )
    return result.rows[0]
}

//update appointment 
export const updateAppointment=async(id,updates)=>{
    const fields=Object.keys(updates);
    const values=Object.values(updates);

    if(fields.length==0) throw new Error("No updates available")

    //set clause
    const setClause=fields
    .map((field,index)=> `${field} = $${index+1}`)
    .join(', ');

    const query=`UPDATE appointments SET ${setClause} WHERE id=$${fields.length+1} RETURNING *`;

    const result=await pool.query(query, [...values, id]);
    return result.rows[0];


    }


//Delete appointment
export const deleteAppointment=async(id)=>{
    const result=await pool.query(
        "DELETE FROM appointments WHERE id=$1 RETURNING *", 
        [id]
    );
    return result.rows[0]
}