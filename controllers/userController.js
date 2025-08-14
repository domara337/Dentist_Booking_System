import { findUserbyEmail, findUserByPhone, CreateUser, getAllUsers, DeleteUser, getUserById, updateUserById } from "../models/usermodel";
import bcrypt from 'bcrypt';


//get the user by id function 
export const getMe=async(req,res)=>{

    try{
        //get user id from the req.user
        const getId=req.user.userId;

        //db query to get the user by id
         const user=await getUserById(getId);

         if(!user){
            return res.status(404).json({message:'User not found'});
         }
         //return the user
         return res.status(200).json({user})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

//get all users
export const getUsers=async(req,res)=>{
    try{

        //db query to get all the users 
        const users=await getAllUsers();

        return res.status(200).json({users});


    }
    catch(err){
        res.status(501).json({message:'Internal server error',
            error:err.message}
        )
    }
}

export const updateMe = async (req, res) => {
    try {
        const userId = req.user.userId;
        const allowedUpdates = ['name', 'email', 'password', 'phone'];
        const updates = Object.keys(req.body);

        //check for valid fields 
        const isValid = updates.every(field => allowedUpdates.includes(field));
        if (!isValid) {
            return res.status(400).json({ message: 'Invalid fields in update' });
        }

       
       
       //check for a valid user
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

       
       //go through the req.body data and update the array
        const updatedData = {};
        for (let key of updates) {
            updatedData[key] = req.body[key];
        }

        //if the update includes password,hash it.
        if (req.body.password) {
            updatedData.password = await bcrypt.hash(req.body.password, 10);
        }

        const newUserData = await updateUserById(userId, updatedData);

        delete newUserData.password; // remove before sending
        res.status(200).json({ user: newUserData });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

//delete-user
export const deleteMe=async(req,res)=>{
  
    try{

  //get user id from the req.user
        const getId=req.user.userId;

        //delete user from the db
        const DelUser=await DeleteUser(getId);

        //send confirmation message
        if(DelUser){
            return res.status(200).json({message:"Deleting user operation successful"})

        }


    }
    catch(err){
    
    res.status(501).json({
        message: 'Internal server error', 
        error:err.message
    })

    }
}


//get user by id(admin-use)
export const findUserbyId=async(req,res)=>{

try{

    const userId=req.params.id;

    const user=await getUserById(userId);

    if(!user){
        return res.status(404).json({message: 'User not found'});
    }

    //confirmation message
    return res.status(200).json({user})



}
catch(err){
    res.status(500).json({
        message:'Internal server error', 
        error:err.message
    })
}



}





//delete user by id(admin-use)