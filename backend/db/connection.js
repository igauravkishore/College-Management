const mysql= require('mysql2');

const connection= mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE
})

connection.connect((err)=>{
    if(err){
        console.error('Error connecting to MySQL:',error);
        return;
    }
    console.log('Connected to MySQL database');
});

const createStudentTableQuery=`
CREATE TABLE IF NOT EXISTS students (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    RollNo VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    fatherName VARCHAR(100),
    qualification VARCHAR(100),
    address VARCHAR(255),
    course VARCHAR(100),
    DOB DATE,
    duration INT
);
`;

connection.query(createStudentTableQuery,(error,results)=>{
     if(error){
        console.error('Error creating students table',error);
     }
     else{
        console.log('students table created or already exists');
     }
});



const createCourseTableQuery=`
CREATE TABLE IF NOT EXISTS course(
    courseId INT AUTO_INCREMENT PRIMARY KEY,
    courseName VARCHAR(100) NOT NULL,
    courseCode VARCHAR(20) NOT NULL,
    description TEXT,
    credits INT,
    department VARCHAR(100),
    semester VARCHAR(20),
    instructor VARCHAR(100),
    capacity INT,
    enrolledStudents INT DEFAULT 0
)`

connection.query(createCourseTableQuery,(error,results)=>{
    if(error){
       console.error('Error creating Course table',error);
    }
    else{
       console.log('Course table created or already exists');
    }
});

const createExamTableQuery=`
CREATE TABLE IF NOT EXISTS exam (
    examId INT AUTO_INCREMENT PRIMARY KEY,
    duration INT NOT NULL,
    courseCode VARCHAR(20) NOT NULL,
    courseName VARCHAR(100) NOT NULL,
    examTerm VARCHAR(50) NOT NULL,
    examDate DATE NOT NULL
)`

connection.query(createExamTableQuery,(error,results)=>{
    if(error){
        console.error('Error creating Exam Table',error);
    }
    else{
        console.log('Exam table created or already exists');
    }
});



const createFeesTableQuery=`
CREATE TABLE IF NOT EXISTS fees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    rollNo VARCHAR(20) NOT NULL,
    fathersName VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    course VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    duration INT NOT NULL,
    totalFees DECIMAL(10, 2) NOT NULL,
    paidFees DECIMAL(10, 2) NOT NULL,
    dueFees DECIMAL(10, 2) NOT NULL 
)`

connection.query(createFeesTableQuery,(error,results)=>{
    if(error){
        console.error('Error creating Fees Table',error);
    }
    else{
        console.log('Fees table created or already exists');
    }
});

const createBooksTableQuery=`
CREATE TABLE IF NOT EXISTS books(
    bookId INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    authorName VARCHAR(255) NOT NULL,
    bookCode VARCHAR(255) NOT NULL UNIQUE,
    publicationYear INT,
    publisher VARCHAR(255),
    availableCopies INT NOT NULL DEFAULT 1,
    totalCopies INT NOT NULL DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL
)`

connection.query(createBooksTableQuery,(error,results)=>{
    if(error){
        console.error('Error creating books Table',error);
    }
    else{
        console.log('books table created or already exists');
    }
});

const createMembersTableQuery=`
CREATE TABLE IF NOT EXISTS members (
    memberId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    address TEXT,
    phoneNumber VARCHAR(15),
    membershipDate DATE NOT NULL
)`

connection.query(createMembersTableQuery,(error,results)=>{
    if(error){
        console.error('Error creating members Table',error);
    }
    else{
        console.log('members table created or already exists');
    }
});

const createBookIssueTableQuery=`
CREATE TABLE IF NOT EXISTS book_issues (
    issueId INT AUTO_INCREMENT PRIMARY KEY,
    memberId INT NOT NULL,
    bookId INT NOT NULL,
    issueDate DATE NOT NULL,
    dueDate DATE NOT NULL,
    returnDate DATE,
    FOREIGN KEY (memberId) REFERENCES members(memberId),
    FOREIGN KEY (bookId) REFERENCES books(bookId)
)`;

connection.query(createBookIssueTableQuery,(error,results)=>{
    if(error){
        console.error('Error creating book_issues Table',error);
    }
    else{
        console.log('book_issues table created or already exists');
    }
});


const createEmployeesTableQuery=`
CREATE TABLE IF NOT EXISTS employees (
    employeeId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phoneNumber VARCHAR(15),
    address TEXT,
    jobTitle VARCHAR(100),
    department VARCHAR(100),
    hireDate DATE NOT NULL,
    salary DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'active'
)`;

connection.query(createEmployeesTableQuery,(error,results)=>{
    if(error){
        console.error('Error creating Employees Table',error);
    }
    else{
        console.log('Employees table created or already exists');
    }
});


module.exports=connection;