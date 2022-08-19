const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const tasks = require("./router/tasks");

const app = express();

mongoose
.connect("mongodb://localhost:27017/playgroud")
.then(() => console.log("connected to database"))
.catch((err) => console.log("abcxyz", err));


const TaskSchema = new mongoose.Schema({
    name: { type: String , required: true},
    status:{ type: String , default:" To Do" },
    createdAt: {type: Date, default: Date.now},
    userId: {type: String}
});
 
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true 
    },
    password: { type:String,
        min: 6,
    }
});


app.use(express.json());



app.use ("/api/tasks", tasks);



app.listen(3000, () => console.log("listen on post 3000"));