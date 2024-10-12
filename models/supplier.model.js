const { Schema, model } = require("mongoose");

const supplierSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
})
const Supplier=model("Supplier",supplierSchema)
module.exports=Supplier;