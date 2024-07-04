const ErrorHandler= require('../utils/errorhandler');
const employeesModel=require('../models/employeesModel');

const getEmployeesList=async(req,res,next)=>{
    try{
         const employeestList=await employeesModel.getEmployeesList();
         res.json({success:true,employeestList });
    }
    catch(error)
    {
       console.error(error);
       return next(new ErrorHandler('Internal Server Error',500));
    }
}

const addEmployee=async(req,res,next)=>{
    try{
        const { name, email, phoneNumber, address, jobTitle, department, hireDate, salary, status}=req.body;
    if(!name||!email||!phoneNumber||!address||!jobTitle||!department||!hireDate||!salary){
        return next(new ErrorHandler('name, email, phoneNumber, address, jobTitle, department, hireDate, salary are required',400));
    }

    const result =await employeesModel.addEmployee(name, email, phoneNumber, address, jobTitle, department, hireDate, salary, status,next);
    res.status(201).json({success:true, message:"Employee record added successfully",EmployeeId:result.insertId});
    }
    catch(error)
    {
        console.error("Error in addEmployee controller:",error);
        return next(new ErrorHandler('Internal server error',500));
    }
}

const updateEmployee= async(req,res,next)=>{
    try{
         const {id}=req.params;
         const updateData=req.body;

         const {name, email, phoneNumber, address, jobTitle, department, hireDate, salary}=updateData;
         if(!name||!email||!phoneNumber||!address||!jobTitle||!department||!hireDate||!salary){
            return next(new ErrorHandler('name, email, phoneNumber, address, jobTitle, department, hireDate, salary are required',400));
         }

         const affectedRows= await employeesModel.updateEmployee(id,updateData,next);
         if(affectedRows===0)
            {
                return res.status(404).json({success:false, message:"Employee not found"});

            }
         res.status(200).json({success:true,message:"Employee record updated successfully"});   
    }
    catch(error)
    {
        console.error("Error in updateEmployee controller",error);
       return next(new ErrorHandler("Internal server error",500));
    }
}

const getEmployeeById=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const employee=await employeesModel.getEmployeeById(id,next);

        if(!employee)
            {
                return next(new ErrorHandler('employee not found',404));
            }
          
         res.status(200).json({success:true,employee});   
    }
    catch(error)
    {
        console.error("Error in getEmployeeById controller",error);
        return next(new ErrorHandler("Internal server error",500));
    }

}

const deleteEmployee=async(req,res,next)=>{
    try{
          const {id}=req.params;

          const affectedRows= await employeesModel.deleteEmployee(id,next);
          if(affectedRows===0)
            {
                return res.status(404).json({message:"Employee not found"});
            }
          res.status(200).json({success:true, message:"employee record deleted successfully"});  
    }
    catch(error)
    {
      console.error("Error in deleteEmployee Controller",error);
      return next(new ErrorHandler("Internal server error",500));
    }
}



module.exports={
    getEmployeesList,
    addEmployee,
    updateEmployee,
    getEmployeeById,
    deleteEmployee
}