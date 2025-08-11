import pool from "../config/db";



//create availablity slot
export const createAvailablity=async(DentistId,dayOfWeek,startTime,endTime)=>{

const result=await pool.query(
    "INSERT INTO availablity(dentist_id,day_of_week,start_time,end_time) VALUES($1,$2,$3,$4) RETURNING *",
    [DentistId,dayOfWeek,startTime,endTime]
)

return result.rows[0];

}

//get Availablity by dentist
export const getAvailablityByDentist=async(DentistId)=>{
    const result=await pool.query(
        "SELECT * FROM availability WHERE dentist_id=$1", 
        [DentistId]
    );
    return result.rows;
}


//update availablity
export const updateAvailablity=async(id,updates)=>{

    //get the keys
    const fields=Object.keys(updates);
    //get the values of the keys
    const values=Object.values(updates);

    //validation 
    if(fields.length==0) throw new Error("No updates available");


    //set the set-clause
    const setClause=fields
    .map((field,index)=>`${field}=$${index+1}`)
    .join(', ');

    //create the query 
    const query=`UPDATE availability SET ${setClause} WHERE id=$${fields.length+1} RETURNING *`;


    const result=await pool.query(query, [...values, id]);
    return result.rows[0];
}



//delete dentist 
export const deleteAvailablity=async(id)=>{
    const result=await pool.query(
        "DELETE FROM availability WHERE id=$1 RETURNING *", 
        [id]
    )
    return result.rows[0];
}