const db=require('../db/connection');
const express= require('express');
const examController=require('../controllers/examController');

const router=express.Router();

router.get('/getExamListMenu',examController.getExamListMenu);
router.post('/addExamTermAndDate',examController.addExamTermAndDate);
router.put('/updateExamTermAndDate/:id',examController.updateExamTermAndDate);
router.delete('/deleteExamTermAndDate/:id',examController.deleteExamTermAndDate);

module.exports=router;