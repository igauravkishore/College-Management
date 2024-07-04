const db=require('../db/connection');
const express= require('express');
const courseController=require('../controllers/courseController');

const router=express.Router();

router.get('/getCourseList',courseController.getCourseList);
router.get('/getCourseListMenu',courseController.getCourseListMenu);
router.post('/addCourse',courseController.addCourse);
router.put('/updateCourse/:id',courseController.updateCourse);
router.delete('/deleteCourse/:id',courseController.deleteCourse);
module.exports=router;