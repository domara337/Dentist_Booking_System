import { createAppointment,getAppointmentsByuser,getAppointmentsBydate,getAllApointments,
    getAppointmentByDentist,updateAppointment,
    deleteAppointment
 } from "../models/appointmentsmodel";



 //create appointment 
 export const create_Appointment=async(req,res)=>{

    try{
        //get the id's from the req.params
         const {patientId,dentistId}=req.params;

        //get the values from the req.body
        const {date,status}=req.body;


        //db query to insert & create an appointment
        const appointment=await createAppointment(patientId,dentistId,date,status);



        if(!appointment) return res.status(400).json({message:"New appointment was not created"});


        res.status(201).json({message:"Appointment was created successfully" , 
            appointment:appointment
        })


    }


    catch(err){


        res.status(500).json({message:"Internal server error", 
            error:err.message
        })



    }




 }

 //get all appointments
 export const get_all_appointments=async(req,res)=>{

  try {
    const query = `
      SELECT 
        a.id AS appointment_id,
        a.date,
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

    const appointments = await db.query(query);

    res.status(200).json({ appointments: appointments.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching appointments" });
  }



 }