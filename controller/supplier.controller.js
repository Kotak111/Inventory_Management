const Supplier = require("../models/supplier.model");


//create supplier
exports.CreateSupplier=async(req,res)=>{
    try {
        const {name,contact,address}=req.body;
    
        const supplier=await Supplier.create({
            name,
            contact,
            address
        })
        if(!supplier){
            return res.status(400).json({
                success:false,
                message:"supplier Insert Error"
            })
        }
        return res.status(200).json({
            success:true,
            message:"supplier Inserted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Sever Error")
        
    }
}
//Get all supplier
exports.GetAllSuppllier=async(req,res)=>{
    try {
        const find=await Supplier.find();
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        return res.status(200).json({
            success:true,
            supplier:find
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Sever Error")
    }
}
//get by id supplier
exports.GetByIdSupplier=async(req,res)=>{
    try {
        const find=await Supplier.findById(req.params.id);
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        return res.status(200).json({
            success:true,
            supplier:find
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Sever Error")
    }
}
//delete inventory
exports.DeleteSupplier=async(req,res)=>{
    try {
        const find=await Supplier.findByIdAndDelete(req.params.id)
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Supplier deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Sever Error")
    }
}

//update inventory
exports.UpdateSupplier=async(req,res)=>{
    try {
        const find=await Supplier.findByIdAndUpdate(req.params.id, req.body,{new:true})
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Supplier Updated"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Sever Error")
    }
}
