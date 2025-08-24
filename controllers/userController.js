import { findUserbyEmail, findUserByPhone, CreateUser, getAllUsers, DeleteUser, getUserById, updateUserbyId } from "../models/usermodel.js";
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

// Find user by email
export const getUserByEmail = async (req, res) => {
    try {
        const get_email = req.body.email;
        if (!get_email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await findUserbyEmail(get_email);

        if (!user) {
            return res.status(404).json({ message: 'Could not find the user' });
        }

        res.status(200).json({
            message: "User retrieved successfully",
            user
        });

    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err.message
        });
    }
};

// Find user by phone
export const getUserByPhone = async (req, res) => {
    try {
        const get_phone = req.body.phone;
        if (!get_phone) {
            return res.status(400).json({ message: 'Phone is required' });
        }

        const user = await findUserByPhone(get_phone);

        if (!user) {
            return res.status(404).json({ message: 'Could not find the user' });
        }

        res.status(200).json({
            message: 'User retrieved successfully',
            user
        });

    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err.message
        });
    }
};



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

//create user function 
export const create_user=async(req,res)=>{
    try{
        //define the body variables
        const {user_name,
            user_email, 
            password,
            user_role,
            user_phone
        }=req.body;

        const userCreated=await CreateUser(user_name,user_email,password,user_role,user_phone);

        if(!userCreated) return res.status(404).json({message:'user not created'})


        res.status(200).json({message:'user is created successfully', userCreated})







    


    }
    catch(err){
        res.status(501).json({
            message: 'Internal server error', 
            error:err.message

        })
    }
}

export const updateMe = async (req, res) => {
    try {
        const userId = req.user.userId;
        const allowedUpdates = ['name', 'email', 'role','password', 'phone'];
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

        const newUserData = await updateUserbyId(userId, updatedData);

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


        if (!DelUser) {
    return res.status(404).json({ message: "User not found or could not be deleted" });
}


        //send confirmation message
        
            return res.status(200).json({message:"Deleting user operation successful"})

    


    }
    catch(err){
    
    res.status(501).json({
        message: 'Internal server error', 
        error:err.message
    })

    }
}

//delete user by id(admin-use)
export const delUserbyId=async(req,res)=>{
    try{

        const getId=req.params.id;

        //query to delete the user 
        const deletedUser=await DeleteUser(getId);


        if(!deletedUser){
            return res.status(404).json({message:"operation failec"})
        }

        return res.status(200).json({message:"User deleted successfully"})



    }
    catch(err){
        res.status(501).json({
            message:'Internal server error', 
            error:err.message
        })
    }
}