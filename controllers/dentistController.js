import { createDentist,getDentistById,getAllDentist,updateDentist,deleteDentist } from "../models/dentistmodel";



//create a new dentist
export const createDentist=async(req,res)=>{
    try{
        const userid=req.user.userId;

        const {specialization,
            clinic_name,
            clinic_address

        }=req.body;


        const newDentist=await createDentist(userid,specialization,clinic_name,clinic_address);

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


//get all dentists 
export const get_All_dentists=async(req,res)=>{
    try{

        //query db for all dentist
        const getDents=await getAllDentist();

        if(!getDents) return res.status(404).json({message:'Could not get dentists'});

        res.status(201).json({message:'Operation retrieving dentists successful' , getDents})


    }
    catch(err){
        res.status(501).json({
            error:err.message,
            message:"Internal server error"
        })



    }
}