const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const mongoose = require('mongoose');

const express = require('express');
const router = require('./routes/workoutRoutes');
const userRouter = require('./routes/userRoutes');

let app = express();
app.use(express.json());

const reqLogger = (req,res,next)=>{
    console.log(req.path, req.method);
    next();
}
app.use(reqLogger);
app.use('/workout',router);
app.use('',userRouter);

mongoose.connect(process.env.MONGO_URL)
.then((conn)=>{
    app.listen(process.env.PORT,()=>{
        console.log("DB connected & App Started..");
    })
})
.catch((err)=>{
    console.log(err);
})

