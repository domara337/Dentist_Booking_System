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


//get dentist by id
export const get_dentist_byId=async(req,res)=>{
    try{
     const dentId=req.params.id;

     const dentist=await getDentistById(dentId);

     if(!dentist) return res.status(404).json({message:"dentist was not found"});

     res.status(201).json({
        message:"dentist was retrieved successfully", 
        dentist
     })





    }
    catch(err){
        res.status(501).json({message:"Internal server error", 
            error:err.message
        })
    }
}
//update dentist profile
export const update_Dentist = async (req, res) => {
  try {
    const dentId = req.params.id;
    const allowedUpdates = ["specialization", "clinic_name", "clinic_address"];
    const updates = Object.keys(req.body);

    // check if all requested updates are allowed
    const isValid = updates.every(field => allowedUpdates.includes(field));
    if (!isValid) {
      return res.status(400).json({ message: "Invalid fields in update." });
    }

    // find dentist
    const dentist = await getDentistById(dentId);
    if (!dentist) {
      return res.status(404).json({ message: "Dentist not found." });
    }

    // apply updates
    updates.forEach(field => {
      dentist[field] = req.body[field];
    });

    // save updated record
     const updatedDentist=await updateDentist(dentId,updates);

    res.status(200).json({
      message: "Dentist updated successfully.",
      dentist:updatedDentist,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal server error",
    });
  }
};
