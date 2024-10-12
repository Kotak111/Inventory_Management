const { default: mongoose } = require("mongoose");

exports.db=mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("Database connected");
    
}).catch((err)=>{
    console.log("database error");
    
})