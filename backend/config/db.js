const mongoose = require('mongoose') ;
const config=require('config') ;
const dbUrl=config.get('mongoURI') 

const db= async ()  => {
    try{
    await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}) ;
    
console.log('MonoDB Connected')
    } catch(err){
    console.log(err.message)
     process.exit(1)
} ;

} ;

module.exports=db ;