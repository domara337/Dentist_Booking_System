import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserbyEmail,CreateUser} from '../models/usermodel';


const saltedRounds=10;


//register
export const register=async(req,res)=>{

const {name,email,password}=req.body;


try{

const existing=await findUserbyEmail(email);

if(existing) return res.status(400).json({message: 'user already exists'});


const hashed_password=await bcrypt.hash(password,saltedRounds);

const newUser=await CreateUser(name,email,hashed_password);


res.status(201).json({id:newUser.id, email: newUser.email});

}



catch(err){
    res.status(500).json({error:err.message})
}


}


//login
export const login=async(req,res)=>{
    
    const {email,password}=req.body;


    try{

        const user=findUserbyEmail(email);

        if(!user) return res.status(401).json({message:'Invalid user'});

        const match=await bcrypt.compare(password,user.hashed_password);


        if(!match) return res.status(401).json({message: 'Invalid credentials'})


        const token=jwt.sign({userId:user.id} , process.env.JWT_SECRET,{expiresIn:'1h'});
        res.json({token})






    }
    catch(err){


    res.status(500).json({message: "internal server error", error: err.message})

    }
}