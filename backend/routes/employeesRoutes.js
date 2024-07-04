const db=require('../db/connection');
const express= require('express');

const employeesController=require('../controllers/EmployeesController')

const router=express.Router();

router.get('/employeesList',employeesController.getEmployeesList);
router.post('/addEmployee',employeesController.addEmployee);
router.put('/updateEmployee/:id',employeesController.updateEmployee);
router.get('/getEmployeeById/:id',employeesController.getEmployeeById);
router.delete('/deleteEmployee/:id',employeesController.deleteEmployee);

module.exports=router;


