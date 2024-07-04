const db= require('../db/connection');
const ErrorHandler= require('../utils/errorhandler');

const getExamListMenu=async(next)=>{
    try{
        const query = "SELECT * FROM exam";
        const [rows] = await db.promise().query(query);
        return rows;
    }
    catch(error)
    {
        console.error("Error fetching exam list:", error);
        return next(new ErrorHandler("Error fetching exam list:",500));
    }
}

const addExamTermAndDate=async(examData,next)=>{
   try{
        const {duration,courseCode,courseName,examTerm,examDate}=examData;
        const query="INSERT INTO exam (duration,courseCode,courseName,examTerm,examDate) VALUES (?,?,?,?,?)";
        const [result] = await db.promise().query(query, [duration, courseCode, courseName, examTerm, examDate]);
        return result.insertId;
   }
   catch(error)
   {
      console.error("Error adding new exam term and date",error);
      return next(new ErrorHandler("Error adding new exam term and date",500));
   }
}

const updateExamTermAndDate=async(examId,examData)=>{
    try{
        const { duration, courseCode, courseName, examTerm, examDate } = examData;
        const query = "UPDATE exam SET duration = ?, courseCode = ?, courseName = ?, examTerm = ?, examDate = ? WHERE examId = ?";
        const [result] = await db.promise().query(query, [duration, courseCode, courseName, examTerm, examDate, examId]);
        return result.affectedRows;
    }
    catch(error)
    {
        console.error("Error updating exam term and date:", error);
        return next(new ErrorHandler("Error updating exam term and date:",500));
        
    }
}

const deleteExamTermAndDate=async(examId,next)=>{
    try{
          const query="DELETE FROM exam WHERE examId = ?";
          const [result] = await db.promise().query(query, [examId]);
          return result.affectedRows;
    }
    catch(error)
    {
        console.error("Error deleting exam term and date:", error);
        return next(new ErrorHandler("Error deleting exam term and date:",500));
    }
}

module.exports={
    getExamListMenu,
    addExamTermAndDate,
    updateExamTermAndDate,
    deleteExamTermAndDate
};