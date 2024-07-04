const db=require('../db/connection');
const ErrorHandler= require('../utils/errorhandler');

const getEmployeesList=async()=>{
    try{
      const query='SELECT * FROM employees';
      const [rows]= await db.promise().query(query);
      return rows;
    }
    catch(error){
        console.error('Error fetching student list',error);
        return next(new ErrorHandler("Error getting employeesList",error));
    }
};

const addEmployee=async(name, email, phoneNumber, address, jobTitle, department, hireDate, salary, status,next)=>{
    try{
        const query="INSERT INTO employees(name, email, phoneNumber, address, jobTitle, department, hireDate, salary, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const [result]=await db.promise().query(query,[name, email, phoneNumber, address, jobTitle, department, hireDate, salary, status]);
        return result;
    }
    catch(error)
    {
        console.error("Error adding new employee record;",error);
        return next(new ErrorHandler("Error adding new employee record:",error));
    }
}

const updateEmployee=async(id,updateData,next)=>{
    try{
          const {name, email, phoneNumber, address, jobTitle, department, hireDate, salary, status}=updateData;
          const query='UPDATE employees SET name=?, email=?, phoneNumber=?,address=?, jobTitle=?, department=?, hireDate=?, salary=?, status=? WHERE employeeId=?';
          const [result]=await db.promise().query(query,[name, email, phoneNumber, address, jobTitle, department, hireDate, salary, status,id]);
          return result.affectedRows;
    }
    catch(error)
    {
      console.error('Error updating Employee record',error);
      return next(new ErrorHandler("Error updating Employee record",500));
    }
}

const getEmployeeById=async(id,next)=>{
    try{
          const query="SELECT * FROM employees WHERE employeeId = ?";
          const [rows]= await db.promise().query(query,[id]);

          return rows.length ? rows[0] :null;
    }
    catch(error)
    {
        console.error('Error fetching employee by ID:',error);
        return next(new ErrorHandler("Error fetching employee by ID",error));

    }
}


const deleteEmployee=async(id,next)=>{
    try{
         const query='DELETE FROM employees WHERE employeeId =?';
         const [result]= await db.promise().query(query,[id]);
         return result.affectedRows;
    }
    catch(error)
    {
        console.error("Error deleting employee record",error);
        return next(new ErrorHandler("Error deleting employee record",500));
    }
}




module.exports={
    getEmployeesList,
    addEmployee,
    updateEmployee,
    getEmployeeById,
    deleteEmployee
}