import pool from "../config/db";




//write a function to find the user by the email 
export const findUserbyEmail=async (email)=>{
    const result=await pool.query("SELECT * FROM users WHERE email=$1", 
        [email]
    )

    return result.rows[0];
}

//function to find the user by phone number
export const findUserByPhone=async(user_phone)=>{
    const result=await pool.query("SELECT * FROM users WHERE phone=$1", 
        [user_phone]
    )
    return result.rows[0]
}


//write the function to insert into the users table
export const CreateUser=async(user_name,user_email,password,user_role,user_phone)=>{
    const result=await pool.query("INSERT INTO users(name,email,password,role,phone) VALUES ($1,$2,$3,$4,$5) RETURNING *", 
        [user_name,user_email,password,user_role,user_phone]
    );

    return result.rows[0];
}



//function to get all the users
export const getAllUsers=async()=>{
    const result=await pool.query("SELECT * FROM USERS");
    return result.rows;
}


//function to delete the user by id
export const DeleteUser=async(userId)=>{
    const result=await pool.query("DELETE FROM users WHERE id=$1 RETURNING *" , 
        [userId]

    )
    return result.rows[0];
}



export const getUserById=async(id)=>{
    const result=await pool.query("SELECT * FROM users WHERE id=$1",
     [id]   
    )
    return result.rows[0];
}

export const updateUserbyId = async (id, updates) => {
    const fields = Object.keys(updates);
    const values = Object.values(updates);

    if (fields.length === 0) {
        throw new Error("No updates provided");
    }

    const setClause = fields
        .map((field, index) => `${field}=$${index + 1}`)
        .join(', ');

    const query = `UPDATE users SET ${setClause} WHERE id=$${fields.length + 1} RETURNING *`;

    const result = await pool.query(query, [...values, id]);
    return result.rows[0];
}
