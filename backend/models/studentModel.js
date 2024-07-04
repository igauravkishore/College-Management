const db=require('../db/connection');
const ErrorHandler= require('../utils/errorhandler');

const getStudentList=async()=>{
    try{
      const query='SELECT * FROM students';
      const [rows]= await db.promise().query(query);
      return rows;
    }
    catch(error){
        console.error('Error fetching student list',error);
        return next(new ErrorHandler("Error getting studentList",error));
    }
};

const addStudent=async(RollNo,Name,FatherName,Qualification,Address,Course,DOB,Duration,next)=>{
    try{
        const query="INSERT INTO students(RollNo,name,fatherName,qualification,address,course,DOB,duration) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
        const [result]=await db.promise().query(query,[RollNo,Name,FatherName,Qualification,Address,Course,DOB,Duration]);
        return result;
    }
    catch(error)
    {
        console.error("Error adding new student record;",error);
        return next(new ErrorHandler("Error adding new student record:",error));
    }
}

const getStudentById=async(id,next)=>{
    try{
          const query="SELECT * FROM students WHERE userId = ?";
          const [rows]= await db.promise().query(query,[id]);

          return rows.length ? rows[0] :null;
    }
    catch(error)
    {
        console.error('Error fetching student by ID:',error);
        return next(new ErrorHandler("Error fetching student by ID",error));

    }
}

const updateStudent=async(id,updateData,next)=>{
    try{
          const {RollNo, Name,FatherName,Qualification,Address,Course,DOB,Duration}=updateData;
          const query='UPDATE students SET RollNo=?, name=?, fatherName=?,qualification=?, address=?, course=?, DOB=?, duration=? WHERE userId=?';
          const [result]=await db.promise().query(query,[RollNo,Name,FatherName,Qualification,Address,Course,DOB,Duration,id]);
          return result.affectedRows;
    }
    catch(error)
    {
      console.error('Error updating student record',error);
      return next(new ErrorHandler("Error updating student record",500));
    }
}

const deleteStudent=async(id,next)=>{
    try{
         const query='DELETE FROM students WHERE userId =?';
         const [result]= await db.promise().query(query,[id]);
         return result.affectedRows;
    }
    catch(error)
    {
        console.error("Error deleting student record",error);
        return next(new ErrorHandler("Error deleting student record",500));
    }
}

const getStudentByCourse=async(course,next)=>{
    try{
          const query="SELECT * FROM students WHERE course = ?";
          const [rows]= await db.promise().query(query,[course]);

          return rows.length ? rows[0] :null;
    }
    catch(error)
    {
        console.error('Error fetching student by Course:',error);
        return next(new ErrorHandler("Error fetching student by Course",error));

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