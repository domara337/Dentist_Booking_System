import pool from "../config/db.js";



//create a new doctor record
export const createDentist=async(userid,specialization,clinic_name,clinic_address,dentist_name)=>{
    const result=await pool.query("INSERT INTO dentist(user_id,specialization,clinic_name,clinic_address,dentist_name) VALUES($1,$2,$3,$4,$5) RETURNING *", 
        [userid,specialization,clinic_name,clinic_address,dentist_name]
    );

    return result.rows[0];
}


//get dentist by id
export const getDentistById=async(id)=>{
    const result=await pool.query("SELECT * FROM dentist WHERE id=$1",
        [id]
    )
    return result.rows[0];
}






//get all dentists function 
export const getAllDentist=async()=>{
    const result=await pool.query("SELECT * FROM dentist")
    return result.rows;
}


//update dentist 
export const updateDentist=async(id,updates)=>{
    const fields=Object.keys(updates);
    const values=Object.values(updates);


    if(fields.length==0) throw new Error("No updates provided")

    const setClause=fields.map((field,index) => `${field}=$${index+1}`)
    .join(', ')

    //write the query
    const query=`UPDATE dentist SET ${setClause} WHERE id=$${fields.length+1} RETURNING *`;

    const result=await pool.query(query,[...values, id]);
    return result.rows[0];
}


//delete dentist 
export const deleteDentist=async(id)=>{
    const result=pool.query(
        "DELETE FROM dentist WHERE id=$1 RETURNING *",
        [id]
    )
}