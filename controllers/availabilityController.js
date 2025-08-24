import { createAvailablity,getAvailablityByDentist,updateAvailablity,deleteAvailablity } from "../models/availabilitymodel";







//create availabilityslot
export const create_Availability=async(req,res)=>{

try{

    //get dentist id from the req.params
    const dentId=req.params.id;

    //get the variables from the req.body
    const{
        day_of_week,start_time,end_time
    }=req.body




    ///insert new availability in db
    const NewAvailability=await createAvailablity(dentId,day_of_week,start_time,end_time);

    if(NewAvailability) return res.status(201).json({
        message:"availability slot was created successfully",
    NewAvailability})








}
catch(err){
    res.status(500).json({
        error:err.message,
        message:"Internal server error"
    })
}





}

//get availablity by the dentist id
export const getAvailability=async(req,res)=>{
    try{
        //get the dentist id 
        const {id}=req.params.id;

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
            message:'Internal server error', 
            error:err.message
        })
    }
}


//update dentist
export const update_availability=async(req,res)=>{
    try{
        //get availability id from the req.params
        const availabilityId=req.params.id;
        const allowedUpdates=['day_of_week','start_time','end_time'];
        const updates=Object.keys(req.body);



        //check for invalid fields
        const isValid=updates.every(field=>allowedUpdates.includes(field));

        if(!isValid){
            return res.status(404).json({message:'Invalid fields in updates'})
        }


        //udpate the availability
        const updatedAvailability=await updateAvailablity(availabilityId,updates);


        if(!updatedAvailability){
            return res.status(404).json({message:"Availability not updated"})


        }

        //return successful message
        res.status(200).json({
            message:'Availability updated successfully', 
            availability:updatedAvailability
        })








    }
    catch(err){
        res.status(500).json({error:err.message, 
            message:"Internal server error"
        })
    }
}


//delete availability function 
export const delete_availability=async(req,res)=>{

try{

    //get the availability id from req.params
    const availabilityId=req.params.id;


    //use the db query to delete the availability 
    const DeletedAvailability=await deleteAvailablity(availabilityId);



    //check if the operation is successful
    if(!deleteAvailablity){
        res.status(404).json({message: "Deletion operation failed"})
    }


    res.status(200).json({message:"availability deleted successfuly"})



}
catch(err){

res.status(500).json({
    error: err.message, 
    message: "Internal server error"
})






}













}