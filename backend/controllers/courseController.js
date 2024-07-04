const ErrorHandler= require('../utils/errorhandler');
const courseModel= require('../models/courseModel');

const getCourseList=async(req,res,next)=>{
    try{
        const courseList=await courseModel.getCourseList();
        res.status(200).json({success:true,courseList});
    }
    catch(error)
    {
        console.error("Error in getCourseList controller:",error);
        return next(new ErrorHandler("Internal server error",500));
    }
}

const addCourse=async(req,res,next)=>{
    try{
          const courseData=req.body;
          const {courseName, courseCode,description, credits,department,semester,instructor,capacity,enrolledStudents}=courseData;
          if(!courseName || !courseCode ||!description||! credits||!department ||!semester||!instructor||!capacity||!enrolledStudents)
            {
                return res.status(400).json({message:"courseName, courseCode,description, credits,department,semester,instructor,capacity and enrolledStudents are required"});
            }
         const courseId= await courseModel.addCourse(courseData,next);  
         res.status(200).json({success:true,courseId});

    }
    catch(error)
    {
         console.error("Error in addCourse controller",error);
         return next(new ErrorHandler("Internal server error",500));
    }
};

const getCourseListMenu=async(req,res,next)=>{
    try{
       
           const courseList=await courseModel.getCourseListMenu();
           res.status(200).json({success:true,courseList});
    }
    catch(error)
    {
         console.error("Error in getCourseList controller:",error);
         return next(new(ErrorHandler("Internal server error",500)));
    }
}

const updateCourse=async(req,res,next)=>{
    try{
        const courseId = req.params.id;
        const courseData = req.body;

        const { courseName, courseCode, credits, department, semester, instructor, capacity, enrolledStudents } = courseData;
        if (!courseName || !courseCode || !credits || !department || !semester || !instructor || !capacity || !enrolledStudents) {
            return res.status(400).json({ success:false,message: "All fields are required" });
        }

        const affectedRows = await courseModel.updateCourse(courseId, courseData ,next);
        if (affectedRows === 0) {
            return res.status(404).json({ success:false,message: "Course not found" });
        }

        res.status(200).json({ success:true,message: "Course updated successfully" });
    }
    catch(error)
    {
        console.error("Error in updateCourse controller:", error);
        return next(new ErrorHandler("Internal server error",500));
    }
}

const deleteCourse=async(req,res,next)=>{
    try{
          const {id}=req.params;

          const affectedRows= await courseModel.deleteCourse(id,next);
          if(affectedRows===0)
            {
                return res.status(404).json({message:"course not found"});
            }
          res.status(200).json({success:true, message:"course record deleted successfully"});  
    }
    catch(error)
    {
      console.error("Error in deleteCourse Controller",error);
      return next(new ErrorHandler("Internal server error",500));
    }
}

module.exports={
    getCourseList,
    addCourse,
    getCourseListMenu,
    updateCourse,
    deleteCourse
}