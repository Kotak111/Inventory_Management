const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require("dotenv").config();
const cookiePraser=require("cookie-parser");
app.use(cookiePraser());
require("./config/db")
const port = process.env.PORT
const InventoryRoutes=require("./routes/inventory.route")
const SupplierRoutes=require("./routes/supplier.route")
app.use("/api/inventory",InventoryRoutes)
app.use("/api/supplier",SupplierRoutes)
app.get("/",(req,res)=>{
    res.send("<center><h1>Inventory_Management All apis</h1><br>Get All Apis Use My Link <a href=https://github.com/Kotak111/Inventory_Management target=_blank>Repository :- Inventory_Management</a></center>")
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))