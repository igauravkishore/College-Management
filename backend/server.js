const app=require("./app");
const connection=require("./db/connection");
const studentRoutes=require('./routes/studentRoutes');
const courseRoutes=require('./routes/courseRoutes');
const examRoutes=require('./routes/examRoutes');
const feesRoutes=require('./routes/feesRoutes');
const libraryRoutes=require('./routes/libraryRoutes');
const employeesRoutes=require('./routes/employeesRoutes');
const errorHandlerMiddleware = require('./middleware/error'); 

app.get("/",(req,res)=>{
    res.send("hello dear");
});
app.use('/student',studentRoutes);
app.use('/course',courseRoutes);
app.use('/exam',examRoutes);
app.use('/fees',feesRoutes);
app.use('/library',libraryRoutes);
app.use('/employees',employeesRoutes);
app.use(errorHandlerMiddleware);


const port=3000;
app.listen(port,()=>{console.log(`server is running on port ${port}`)});