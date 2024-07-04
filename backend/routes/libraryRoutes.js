const db=require('../db/connection');
const express= require('express');
const libraryController=require('../controllers/libraryController');

const router=express.Router();

router.get('/listLibraryMenu',libraryController.listLibraryMenu);
router.post('/addNewBook',libraryController.addNewBook);
router.delete('/deleteBook/:id',libraryController.deleteBook);
router.put('/updateBook/:id',libraryController.updateBookRecord);
router.get('/getMembersList',libraryController.getMembersList);
router.post('/addNewMember',libraryController.addMember);
router.delete('/deleteMember/:id',libraryController.deleteMember);
router.post('/issue-book', libraryController.issueBook);
router.put('/return-book', libraryController.returnBook);
router.get('/issued-books', libraryController.listIssuedBooks);


module.exports=router; 