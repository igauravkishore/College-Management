const examModel= require('../models/examModel');
const ErrorHandler= require('../utils/errorhandler');

const getExamListMenu=async(req,res,next)=>{
   try{
       const examList= await examModel.getExamListMenu();
       res.status(200).json({success:true,examList});
   } 
   catch(error)
   {
      console.error("Error in getExamList controller",error);
      return next(new ErrorHandler("Internal Server Error",500));

   }
}

const addExamTermAndDate=async(req,res,next)=>{
    try{
        const examData=req.body;
        const {duration, courseCode, courseName, examTerm, examDate}=examData;
        if(!duration || !courseCode || !courseName || !examTerm || !examDate) {
            return res.status(400).json({message:"All fields are required"});
        }
        const examId = await examModel.addExamTermAndDate(examData,next);
        res.status(201).json({ success:true,message:`Exam term and date added successfully with examId ${examId}` });
    }
    catch(error){
        console.error("Error in addExamTermAndDate controller",error);
        return next(new ErrorHandler("Internal Server Error",500));
    }

}

const updateExamTermAndDate=async(req,res,next)=>{
    try{
          const examId=req.params.id;
          const examData=req.body;

          const {duration, courseCode,courseName,examTerm,examDate}=examData;
          if(!duration || ! courseCode || ! courseName|| !examTerm || !examDate){
            return res.status(400).json({message:"All fields are required"});
          }

          const affectedRows=await examModel.updateExamTermAndDate(examId,examData);
          if(affectedRows===0)
            {
                return res.status(404).json({ message: "Exam not found" });
            }
        
        res.status(200).json({ success:true,message: "Exam term and date updated successfully" });
    }
    catch(error)
    {
        console.error("Error in updateExamTermAndDate controller:", error);
        return next(new ErrorHandler("Internal Server Error",500));
    }
}

const deleteExamTermAndDate=async(req,res,next)=>{
    try{
        const examId = req.params.id;
        const affectedRows = await examModel.deleteExamTermAndDate(examId,next);
        if(affectedRows===0)
            {
                return res.status(404).json({message: "Exam not found"});

            }
        res.status(200).json({success:true, message: "Exam term and date deleted successfully" });    
    }
    catch(error)
    {
        console.error("Error in deleteExamTermAndDate controller:", error);
        return next(new ErrorHandler("Internal Server Error",500));
    }
}


module.exports={
    getExamListMenu,
    addExamTermAndDate,
    updateExamTermAndDate,
    deleteExamTermAndDate
};