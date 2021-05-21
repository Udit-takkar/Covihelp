const express=require('express') ;
const connectDB=require('./config/db')

const app=express() ;

// connect database
connectDB() ;

// Init Middleware
app.use(express.json({extended:false})) ;
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));

const PORT=process.env.PORT || 8000

app.get('/',(req,res)=>{
    res.json({msg:'hello'})
})

// Define Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/users',require('./routes/users'))
app.use('/api/cars',require('./routes/cars'))

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))
