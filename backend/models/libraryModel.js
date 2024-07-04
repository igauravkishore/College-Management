const db= require('../db/connection');
const ErrorHandler= require('../utils/errorhandler');

const listLibraryMenu=async(next)=>{
try{
    const query = "SELECT * FROM books";
    const [rows] = await db.promise().query(query);
    return rows;
    }
catch(error)
   {
       console.error("Error in listLibraryMenu",error);
       return next(new ErrorHandler("Error in listLibraryMenu",500));
   }
}

const addNewBook=async(bookData,next)=>{
    try{
       const { title, authorName, bookCode, publicationYear, publisher, availableCopies, totalCopies, price } = bookData;
       const query = "INSERT INTO books (title, authorName, bookCode, publicationYear, publisher, availableCopies, totalCopies, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
       const [result] = await db.promise().query(query, [title, authorName, bookCode, publicationYear, publisher, availableCopies, totalCopies, price]);
       return result.insertId;
    }
    catch(error)
    {
        console.error("Error in addBook in librayModel");
        return next(new ErrorHandler("Error in addBook in librayModel",500));
    }
}

const updateBookRecord=async(bookId,bookData,next)=>{
    try{
        const { title, authorName, bookCode, publicationYear, publisher, availableCopies, totalCopies, price } = bookData;
        const query = "UPDATE books SET title = ?, authorName = ?, bookCode = ?, publicationYear = ?, publisher = ?, availableCopies = ?, totalCopies = ?, price = ? WHERE bookId = ?";
        const [result] = await db.promise().query(query, [title, authorName, bookCode, publicationYear, publisher, availableCopies, totalCopies, price, bookId]);
        return result.affectedRows;
    }
    catch(error)
    {
         console.error("error in updating book record",error);
         return next(new ErrorHandler("Error in updateBookRecord"));
    }
}

const deleteBook=async(bookId,next)=>{
    try {
        const query = "DELETE FROM books WHERE bookId = ?";
        const [result] = await db.promise().query(query, [bookId]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting book record:", error);
        return next(new ErrorHandler("Error deleting book record:",500));  
    }
}

const getMembersList=async(next)=>{
    try{
        const query='SELECT * FROM members';
        const [rows]= await db.promise().query(query);
        return rows;
    }
    catch(error)
    {
        console.error('Error fetching members list',error);
        return next(new ErrorHandler("Error fetching members list",500));
    }
}

const addMember=async(name,email,address,phoneNumber,membershipDate,next)=>{
    try{
        const query = "INSERT INTO members (name, email, address, phoneNumber, membershipDate) VALUES (?, ?, ?, ?, ?)";
        const [result] = await db.promise().query(query, [name, email, address, phoneNumber, membershipDate]);
        return result.insertId;
    }
    catch(error)
    {
        console.error("Error adding new member record;",error);
        return next(new ErrorHandler("Error adding new member record:",error));
    }
}

const deleteMember=async(id,next)=>{
    try{
        const query='DELETE FROM members WHERE memberId =?';
        const [result]= await db.promise().query(query,[id]);
        return result.affectedRows;
   }
   catch(error)
   {
       console.error("Error deleting member record",error);
       return next(new ErrorHandler("Error deleting member record",500));
   }
}

const issueBook=async(bookIssueData,next)=>{
    try{
        const { memberId, bookId, issueDate, dueDate} = bookIssueData;
        const query = "INSERT INTO book_issues (memberId, bookId, issueDate, dueDate) VALUES (?, ?, ?, ?)";
        const [result] = await db.promise().query(query, [memberId, bookId, issueDate, dueDate]);
        return result.insertId;
    }
    catch(error)
    {
        console.error("hello, Error in issueBook",error);
        console.error("hlw i am here in error");
       
       return next(new ErrorHandler("Error in issueBookk",500));
    }
}

const returnBook = async (issueId, returnDate) => {
    try{
        const query = "UPDATE book_issues SET returnDate = ? WHERE issueId = ?";
        const [result] = await db.promise().query(query, [returnDate, issueId]);
        return result;
    }
    catch(error)
    {
        console.error("Error in returnBook",error);
       return next(new ErrorHandler("Error in returnbook",500));
    }
};

const getIssuedBooks = async () => {
    try {
        const query = `
        SELECT book_issues.issueId, members.name AS memberName, books.title AS bookTitle, book_issues.issueDate, book_issues.dueDate, book_issues.returnDate
        FROM book_issues
        JOIN members ON book_issues.memberId = members.memberId
        JOIN books ON book_issues.bookId = books.bookId;
    `;
        const [rows] = await db.promise().query(query);
        return rows;
    } catch (error) {
        console.error("Error in getIssuedBooks model:", error);
        return next(new ErrorHandler("Error in returnbook",500));
    }
};

module.exports={
    listLibraryMenu,
    addNewBook,
    deleteBook,
    updateBookRecord,
    getMembersList,
    addMember,
    deleteMember,
    issueBook,
    returnBook,
    getIssuedBooks
}