const Inventory = require("../models/invetory.model");
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const checkLowStock = (item) => {
    return item.quantity < item.lowStockThreshold;
};

//create inventory
exports.CreateInventory=async(req,res)=>{
    try {
        const {name,description,quantity,price,supplier , lowStockThreshold = 10}=req.body;
        const isLowStock = checkLowStock({ quantity, lowStockThreshold });
    
        const inventory=await Inventory.create({
            name,
            description,
            quantity,
            price,
            supplier,
            lowStockThreshold,
            isLowStock
        })
        if(!inventory){
            return res.status(400).json({
                success:false,
                message:"Inventory Insert Error"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Inventory Inserted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Sever Error")
        
    }
}
//Get all inventory
exports.GetAllInventory=async(req,res)=>{
    try {
        const find=await Inventory.find().populate("supplier").exec();
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        return res.status(200).json({
            success:true,
            inventory:find
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Sever Error")
    }
}
//get by id inventory
exports.GetByIdInventory=async(req,res)=>{
    try {
        const find=await Inventory.findById(req.params.id).populate("supplier").exec();
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        return res.status(200).json({
            success:true,
            inventory:find
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Sever Error")
    }
}
//delete inventory
exports.DeleteInventory=async(req,res)=>{
    try {
        const find=await Inventory.findByIdAndDelete(req.params.id)
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Inventory deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Sever Error")
    }
}

//update inventory
exports.UpdateInventory=async(req,res)=>{
    try {
        const { quantity, lowStockThreshold } = req.body;

        const isLowStock = checkLowStock({ quantity, lowStockThreshold });
        const find=await Inventory.findByIdAndUpdate(req.params.id,  { ...req.body, isLowStock },{new:true})
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Inventory Updated"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Sever Error")
    }
}


// Export inventory data as CSV
exports.ExportInventory= async (req, res) => {
    try {
        const items = await Inventory.find().populate('supplier').lean();
        
        items.forEach(item => {
            if (item.supplier && !mongoose.Types.ObjectId.isValid(item.supplier)) {
                console.error(`Invalid supplier ObjectId: ${item.supplier}`);
            }
        });
        const fields = ['_id', 'name', 'description', 'quantity', 'price', 'supplier.name'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(items);

       
        const exportDir = path.join(__dirname, '../exports/inventory_export.csv');
        const filePath = path.join(exportDir, 'inventory_export.csv');

        
        if (!fs.existsSync(exportDir)) {
            fs.mkdirSync(exportDir, { recursive: true });
        }
        fs.writeFileSync(filePath, csv);

        res.download(filePath, 'inventory_export.csv', (err) => {
            if (err) {
                res.status(500).json({ message: 'File download failed' });
            }
            fs.unlinkSync(filePath); // Delete file after download
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Import inventory data from CSV
exports.ImportCsv= async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = req.file.path;
        const inventoryItems = [];

        // Parse the CSV file
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                inventoryItems.push(row);
            })
            .on('end', async () => {
                // Process and update the database
                for (const item of inventoryItems) {
                    const { _id, name, description, quantity, price, supplierId , lowStockThreshold } = item;
                    const isLowStock = checkLowStock({ quantity, lowStockThreshold });
                    if (_id) {
                        // Update existing item
                        await Inventory.findByIdAndUpdate(_id, {
                            name,
                            description,
                            quantity,
                            price,
                            supplier: supplierId,
                            lowStockThreshold,
                            isLowStock
                        }, { new: true });
                    } else {
                        // Create new item
                        const newItem = new Inventory({
                            name,
                            description,
                            quantity,
                            price,
                            supplier: supplierId,
                            lowStockThreshold,
                            isLowStock
                        });
                        await newItem.save();
                    }
                }

                // Clean up the uploaded file
                // fs.unlinkSync(filePath);
                res.json({ message: 'CSV file imported successfully' });
            });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.GetLowStockItems = async (req, res) => {
    try {
        const lowStockItems = await Inventory.find({ isLowStock: true }).populate('supplier');
        res.status(200).json({
            success: true,
            inventory: lowStockItems
        });
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
};

