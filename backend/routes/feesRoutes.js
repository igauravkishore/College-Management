const db=require('../db/connection');
const express= require('express');
const feesController=require('../controllers/feesController');

const router=express.Router();

router.get('/getFeesList',feesController.getFeesList);
router.post('/addStudent',feesController.addStudent);
router.put('/updateFee/:id',feesController.updateFee);
router.delete('/deleteFee/:id',feesController.deleteFee);
module.exports=router;
