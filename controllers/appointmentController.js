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