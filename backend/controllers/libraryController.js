const ErrorHandler= require('../utils/errorhandler');
const libraryModel= require('../models/libraryModel');

const listLibraryMenu= async(req,res,next)=>{
    try{
         const books= await libraryModel.listLibraryMenu(next);
         res.status(200).json({success: true, books });
    }
    catch(error)
    {
        console.error("Error in listLibraryMenu controller:", error);
        return next(new ErrorHandler("Internal Server Error",500));
    }
};

const addNewBook = async (req, res, next) => {
    try {
        const bookData = req.body;
        const { title, authorName, bookCode, publicationYear, publisher, availableCopies, totalCopies, price } = bookData;
        if( !title||!authorName||!bookCode||!publicationYear||!publisher||!availableCopies||!totalCopies||!price )
        return next(new ErrorHandler("All fields are required",500));  
        const newBookId = await libraryModel.addNewBook(bookData);
        res.status(201).json({success: true,message: 'Book added successfully',bookId: newBookId
        });
    } catch (error) {
        console.error("Error in addNewBook controller:", error);
       return next(new ErrorHandler("Internal Server Error",500));
    }
};


const updateBookRecord = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const bookData = req.body;
        const { title, authorName, bookCode, publicationYear, publisher, availableCopies, totalCopies, price } = bookData;
        
        if(!title||!authorName||!bookCode||!publicationYear||!publisher||!availableCopies||!totalCopies||!price)
        return res.status(404).json({success: false, message: 'All fields are required'}); 
        
        const updatedRows = await libraryModel.updateBookRecord(bookId, bookData);
        if (updatedRows === 0) {
            return res.status(404).json({success: false, message: 'Book not found'});
        }
        res.status(200).json({success: true,message: 'Book updated successfully'
        });
    } catch (error) {
        console.error("Error in updateBookRecord controller:", error);
        return next(new ErrorHandler("Internal Server Error",500));
        
    }
};

const deleteBook=async(req,res,next)=>{
    try {
        const bookId = req.params.id;
        const affectedRows = await libraryModel.deleteBook(bookId,next);
        if (affectedRows > 0) {
            res.status(200).json({ success:true,message: "book record deleted successfully" });
        } else {
            res.status(404).json({success:true, message: "book record not found" });
        }
    } catch (error) {
        console.error("Error in deleteBook controller:", error);
        return next(new ErrorHandler("Internal Server Error",500));
    } 
}

const getMembersList=async(req,res,next)=>{
    try{
        const membersList=await libraryModel.getMembersList();
        res.json({success:true,membersList });
    }
    catch(error)
    {
       console.error(error);
       return next(new ErrorHandler('Internal Server Error',500));
    }
}

const addMember=async(req,res,next)=>{
    try{
        const {name,email,address,phoneNumber,membershipDate}=req.body;
    if(!name || !email ||!address ||!phoneNumber||!membershipDate){
        return next(new ErrorHandler('name,email,address,phoneNumber,membershipDate are required',400));
    }

    const result =await libraryModel.addMember(name,email,address,phoneNumber,membershipDate,next);
    res.status(201).json({success:true, message:"member record added successfully",memberId:result.insertId});
    }
    catch(error)
    {
        console.error("Error in addMember controller:",error);
        return next(new ErrorHandler('Internal server error',500));
    }
}

const deleteMember=async(req,res,next)=>{
    try{
          const {id}=req.params;

          const affectedRows= await libraryModel.deleteMember(id,next);
          if(affectedRows===0)
            {
                return res.status(404).json({message:"Member not found"});
            }
          res.status(200).json({success:true, message:"Member record deleted successfully"});  
    }
    catch(error)
    {
      console.error("Error in deleteMember Controller",error);
      return next(new ErrorHandler("Internal server error",500));
    }
}

const issueBook = async (req, res, next) => {
    try {
        console.log("hello");
        const bookIssueData = req.body;
        const { memberId, bookId, issueDate, dueDate} = bookIssueData;
        if(!memberId||!bookId||!issueDate||!dueDate)
       return next(new ErrorHandler('memberId,bookId,issueDate,dueDate and returnDate are required',400));
        
        const newIssueId = await libraryModel.issueBook(bookIssueData,next);
        if(newIssueId)
        res.status(201).json({
            success: true,
            message: 'Book issued successfully',
            issueId: newIssueId
        });
    } catch (error) {
        console.error("Error in issueBook controller:", error);

          if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            // Determine if it's a bookId or memberId foreign key failure
            if (error.sqlMessage.includes('`bookId`')) {
                return res.status(400).json({
                    success: false,
                    message: "Book with provided bookId does not exist."
                });
            } else if (error.sqlMessage.includes('`memberId`')) {
                return res.status(400).json({
                    success: false,
                    message: "Member with provided memberId does not exist."
                });
            }
        }
        else
        return next(new ErrorHandler("Internal server error",500));
    }
};

const returnBook = async (req, res, next) => {
    const { issueId, returnDate } = req.body;

    try {
        const result = await libraryModel.returnBook(issueId, returnDate);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "No record found with the given issueId."
            });
        }

        res.status(200).json({
            success: true,
            message: 'Book returned successfully',
            issueId: issueId,
            returnDate: returnDate
        });
    } catch (error) {
        console.error("Error in returnBook controller:", error);

        return next(new ErrorHandler("Internal server error",500));
    }
};

const listIssuedBooks = async (req, res, next) => {
    try {
        const issuedBooks = await libraryModel.getIssuedBooks();
        res.status(200).json({
            success: true,
            data: issuedBooks
        });
    } catch (error) {
        console.error("Error in listIssuedBooks controller:", error);
        return next(new ErrorHandler("Internal server error",500));
    }
};


module.exports={
    listLibraryMenu,
    addNewBook,
    updateBookRecord,
    deleteBook,
    getMembersList,
    addMember,
    deleteMember,
    issueBook,
    returnBook,
    listIssuedBooks
}