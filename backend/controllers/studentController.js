const ErrorHandler= require('../utils/errorhandler');
const studentModel=require('../models/studentModel');

const getStudentList=async(req,res,next)=>{
    try{
         const studentList=await studentModel.getStudentList();
         res.json({success:true,studentList });
    }
    catch(error)
    {
       console.error(error);
       return next(new ErrorHandler('Internal Server Error',500));
    }
}

const addStudent=async(req,res,next)=>{
    try{
        const {RollNo,Name,FatherName,Qualification,Address,Course,DOB,Duration}=req.body;
    if(!RollNo || !Name ||!Course ||!DOB){
        return next(new ErrorHandler('RollNo,name course,and DOB are required',400));
    }

    const result =await studentModel.addStudent(RollNo,Name,FatherName,Qualification, Address, Course, DOB, Duration,next);
    res.status(201).json({success:true, message:"Student record added successfully",studentId:result.insertId});
    }
    catch(error)
    {
        console.error("Error in addStudent controller:",error);
        return next(new ErrorHandler('Internal server error',500));
    }
}

const getStudentById=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const student=await studentModel.getStudentById(id,next);

        if(!student)
            {
                return next(new ErrorHandler('student not found',404));
            }
          
         res.status(200).json({success:true,student});   
    }
    catch(error)
    {
        console.error("Error in getStudentById controller",error);
        return next(new ErrorHandler("Internal server error",500));
    }

}

const updateStudent= async(req,res,next)=>{
    try{
         const {id}=req.params;
         const updateData=req.body;

         const {RollNo, Name,Course,DOB}=updateData;
         if(!RollNo ||!Name||!Course ||!DOB){
            return next(new ErrorHandler('RollNo,Name Course,and DOB are required',400));
         }

         const affectedRows= await studentModel.updateStudent(id,updateData,next);
         if(affectedRows===0)
            {
                return res.status(404).json({success:false, message:"student not found"});

            }
         res.status(200).json({success:true,message:"student record updated successfully"});   
    }
    catch(error)
    {
        console.error("Error in updateStudent controller",error);
       return next(new ErrorHandler("Internal server error",500));
    }
}

const deleteStudent=async(req,res,next)=>{
    try{
          const {id}=req.params;

          const affectedRows= await studentModel.deleteStudent(id);
          if(affectedRows===0)
            {
                return res.status(404).json({message:"Student not found"});
            }
          res.status(200).json({success:true, message:"student record deleted successfully"});  
    }
    catch(error)
    {
      console.error("Error in deleteStudent Controller",error);
      return next(new ErrorHandler("Internal server error",500));
    }
}

const getStudentByCourse=async(req,res,next)=>{
    try{
        const {course}=req.body;
        const student=await studentModel.getStudentByCourse(course,next);

        if(!student)
            {
                return next(new ErrorHandler('student not found',404));
            }
          
         res.status(200).json({success:true,student});   
    }
    catch(error)
    {
        console.error("Error in getStudentByCourse controller",error);
        return next(new ErrorHandler("Internal server error",500));
    }

}

module.exports={
    getStudentList,
    addStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
    getStudentByCourse
};

