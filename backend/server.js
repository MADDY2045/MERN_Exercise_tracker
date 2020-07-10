//step 1 in creating server
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());

//step 2 in creating server
//db connection
mongoose.connect('mongodb://localhost/exercisetrackerpoc', {useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
    if(!err){
        console.log('db connected successfully!')
    }
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
