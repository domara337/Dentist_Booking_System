import { createAvailablity,getAvailablityByDentist,updateAvailablity,deleteAvailablity } from "../models/availabilitymodel";







//create availabilityslot
export const createAvailability=async(req,res)=>{

try{

    //get dentist id from the req.params
    const dentId=req.params.id;

    //get the variables from the req.body
    const{
        day_of_week,start_time,end_time
    }=req.body




    ///insert new availability in db
    const NewAvailability=await createAvailability(dentId,day_of_week,start_time,end_time);

    if(NewAvailability) return res.status(201).json({
        message:"availability slot was created successfully",
    NewAvailability})








}
catch(err){
    res.status(501).json({
        error:err.message,
        message:"Internal server error"
    })
}













}










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


