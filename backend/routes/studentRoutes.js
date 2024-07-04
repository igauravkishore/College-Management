const db=require('../db/connection');
const express= require('express');
const studentController= require('../controllers/studentController');

const router=express.Router();

router.get('/getStudentList',studentController.getStudentList);
router.post('/addStudent',studentController.addStudent);
router.get('/getStudentById/:id',studentController.getStudentById);
router.put('/updateStudent/:id',studentController.updateStudent);
router.delete('/deleteStudent/:id',studentController.deleteStudent);
router.get('/getStudentByCourse',studentController.getStudentByCourse);
module.exports=router;



