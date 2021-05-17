const express=require('express') ;
const app=express() ;
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const User = require('../models/user');

mongoose.connect('mongodb://localhost:27017/covid', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const seedDB=async () => {
    await User.deleteMany({})
    for(let  i=0;i<5;i++){
 const user=new User({
     name:'abc',
     email:'abc@abc.com',
     contact:'999999999',
    vounteeringfor:'plasma',
    availability:'yes',
    alert: 'yes',
    location:'new delhi'
    }) ;
    await user.save() ;
    }
}
seedDB().then(()=>{
    mongoose.connection.close() ;
}) ;