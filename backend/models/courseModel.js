const db=require('../db/connection');
const ErrorHandler= require('../utils/errorhandler');

const getCourseList=async(req,res,next)=>{
    try{
        const query="SELECT * FROM course";
        const [rows]= await db.promise().query(query);
        return rows;
    }
    catch(error)
    {
        console.error("Error fetching courseList: ",error);
        return next(new ErrorHandler("Error fetching course List:",error));
    }
}

const addCourse= async(courseData,next)=>{
    try{
          const { courseName, courseCode, description, credits, department, semester, instructor, capacity,enrolledStudents}=courseData;
          const query="INSERT INTO course (courseName, courseCode, description,credits,department,semester,instructor,capacity,enrolledStudents) VALUES (?,?,?,?,?,?,?,?,?)";
          const [result]=await db.promise().query(query,[courseName, courseCode, description, credits, department,semester, instructor,capacity,enrolledStudents]);
          console.log(result.insertId);
          return result.insertId;

    }
    catch(error)
    {
         console.error("Error adding new courses",error);
         return next(new ErrorHandler("Error adding new courses",error));

    }
}

const getCourseListMenu=async(req,res,next)=>{
    try{
        const query="SELECT courseId,courseName FROM course";
        const [rows]= await db.promise().query(query);
        return rows;
    }
    catch(error)
    {
        console.error("Error fetching courseList: ",error);
        return next(new ErrorHandler("Error fetching course List:",error));
    }
}

const updateCourse=async(courseId,courseData,next)=>{
    try {
        const { courseName, courseCode, description, credits, department, semester, instructor, capacity, enrolledStudents } = courseData;
        const query = `
            UPDATE course 
            SET 
                courseName = ?, 
                courseCode = ?, 
                description = ?, 
                credits = ?, 
                department = ?, 
                semester = ?, 
                instructor = ?, 
                capacity = ?, 
                enrolledStudents = ?
            WHERE 
                courseId = ?
        `;
        const [result] = await db.promise().query(query, [
            courseName, courseCode, description, credits, department, semester, instructor, capacity, enrolledStudents, courseId
        ]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating course:", error);
        return next(new ErrorHandler("Internal Server Error",500));
    }
}

const deleteCourse=async(id,next)=>{
    try{
         const query='DELETE FROM course WHERE courseId =?';
         const [result]= await db.promise().query(query,[id]);
         return result.affectedRows;
    }
    catch(error)
    {
        console.error("Error deleting course record",error);
        return next(new ErrorHandler("Error deleting course record",500));
    }
}

module.exports={
    getCourseList,
    addCourse,
    getCourseListMenu,
    updateCourse,
    deleteCourse
}