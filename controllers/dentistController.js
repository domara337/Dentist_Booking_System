import { createDentist,getDentistById,getAllDentist,updateDentist,deleteDentist } from "../models/dentistmodel";



//create a new dentist
export const createDentist=(req,res)=>{
    try{
        const userid=req.user.userId;

        const {specialization,
            clinic_name,
            clinic_address

        }=req.body;


        const newDentist=createDentist(userid,specialization,clinic_name,clinic_address);

        if(!newDentist) return res.status(404).json({message:'User was not created'});


        return res.status(201).json({
            message: 'Dentist profile created successfully, waiting for admin approval',
            dentist:newDentist
        })





    }
    catch(err){
        res.status(501).json({error:err.message,
            message:'Server error, could not create dentist'
        })
    }
}