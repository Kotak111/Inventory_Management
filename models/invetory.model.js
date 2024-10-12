const { Schema, model, default: mongoose } = require("mongoose");

const InventoryItemSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    lowStockThreshold: { type: Number, default: 10 }, // Default threshold is 10
    isLowStock: { type: Boolean, default: false }, // Flag to indicate low stock status
})
const Inventory=model("Inventory",InventoryItemSchema)
module.exports=Inventory;