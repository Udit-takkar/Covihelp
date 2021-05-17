const express=require('express') ;
const app=express() ;
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const User = require('./models/user');
const users=require('./routes/users')

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


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/users',users)

// home page
app.get('/',(req,res)=>{
    res.render('home')
})



app.listen(8080,()=>{
    console.log('serving on port 8080')
})