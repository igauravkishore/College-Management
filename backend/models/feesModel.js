const db= require('../db/connection');
const ErrorHandler= require('../utils/errorhandler');

const getFeesList=async(next)=>{
    try{
        const query = "SELECT * FROM fees";
        const [results] = await db.promise().query(query);
        return results;
    }
    catch(error)
    {
        console.error("Error fetching fee list:", error);
        return next(new ErrorHandler("Error fetching fee list",500));
    }
}

const addStudent=async(studentData,next)=>{
    try {
        const { name, rollNo, fathersName, address, course, dob, duration, totalFees, paidFees } = studentData;
        const query = "INSERT INTO fees (name, rollNo, fathersName, address, course, dob, duration, totalFees, paidFees, dueFees) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const dueFees = totalFees - paidFees;
        const [result] = await db.promise().query(query, [name, rollNo, fathersName, address, course, dob, duration, totalFees, paidFees, dueFees]);
        return result.insertId;
    } catch (error) {
        console.error("Error adding new student:", error);
        return next(new ErrorHandler("Error adding new student:",500));
    }
}

const updateFee=async(feeId,feeData,next)=>{
    try {
        const { totalFees, paidFees } = feeData;
        const dueFees = totalFees - paidFees;
        const query = "UPDATE fees SET totalFees = ?, paidFees = ?, dueFees = ? WHERE id = ?";
        const [result] = await db.promise().query(query, [totalFees, paidFees, dueFees, feeId]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating fee record:", error);
        return next(new ErrorHandler("Error updating fee record",500));
    }
}

const deleteFee=async(feeId,next)=>{
    try {
        const query = "DELETE FROM fees WHERE id = ?";
        const [result] = await db.promise().query(query, [feeId]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting fee record:", error);
        return next(new ErrorHandler("Error deleting fee record:",500));  
    }
}
module.exports={
    getFeesList,
    addStudent,
    updateFee,
    deleteFee
}