import { createAvailablity,getAvailablityByDentist,updateAvailablity,deleteAvailablity } from "../models/availabilitymodel";




//get availablity by the dentist id
export const getAvailability=async(req,res)=>{
    try{
        //get the dentist id 
        const dentId=req.params.id;

        //query db for all availablity slots where dentId=dentistId
        const Availablity=await getAvailablityByDentist(dentId);

        //return error if there are no availablities

        if(!Availablity)   return res.status(404).json({message:'User not found'});


        //return the list of the availablity
        res.status(200).json({
            message:"operation successful", 
            Availablity
        })






    }
    catch(err){
        res.status(501).json({

        })
    }
}