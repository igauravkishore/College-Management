const feesModel= require('../models/feesModel');
const ErrorHandler= require('../utils/errorhandler');

const getFeesList=async(req,res,next)=>{
    try{
        const feeList = await feesModel.getFeesList(next);
        res.status(200).json({success:true, feeList});
    }
    catch(error)
    {
       console.error("error in getFeesList Controller",error);
       return next(new ErrorHandler("Internal Server Error",500));
    }
}

const addStudent=async(req,res,next)=>{
    try{
        const studentData = req.body;
        const { name, rollNo, fathersName, address, course, dob, duration, totalFees, paidFees } = studentData;
        
        if(!name||!rollNo||!fathersName||!address||!course|| !dob|| !duration|| !totalFees||!paidFees )
        return next(new ErrorHandler("All fields are required",400));  
       
        const studentId = await feesModel.addStudent(studentData,next);
        res.status(201).json({ success:true,message: "Student admitted successfully", studentId });
    }
    catch(error)
    {
        console.error("Error in addStudent controller:", error);
        return next(new ErrorHandler("Internal Server Error",500));
    }
}

const updateFee=async(req,res,next)=>{
    try {
        const feeId = req.params.id;
        const feeData = req.body;
        const { totalFees, paidFees } = feeData;

        if(!totalFees||!paidFees)
        return next(new ErrorHandler("both totalFees and paidFees are required",400)); 
        
        const affectedRows = await feesModel.updateFee(feeId, feeData,next);
        if (affectedRows > 0) {
            res.status(200).json({ success:true,message: "Fee record updated successfully" });
        } else {
            res.status(404).json({ success:false,message: "Fee record not found" });
        }
    } catch (error) {
        console.error("Error in updateFee controller:", error);
        return next(new ErrorHandler("Internal Server Error",500));
    }
}


const deleteFee=async(req,res,next)=>{
    try {
        const feeId = req.params.id;
        const affectedRows = await feesModel.deleteFee(feeId);
        if (affectedRows > 0) {
            res.status(200).json({ success:true,message: "Fee record deleted successfully" });
        } else {
            res.status(404).json({success:true, message: "Fee record not found" });
        }
    } catch (error) {
        console.error("Error in deleteFee controller:", error);
        return next(new ErrorHandler("Internal Server Error",500));
    } 
}


module.exports={
    getFeesList,
    addStudent,
    updateFee,
    deleteFee
}
