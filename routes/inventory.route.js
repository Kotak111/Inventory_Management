const router=require("express").Router();
const InventoryController=require("../controller/invetory.controller")
const upload=require("../utils/csv.add");
router.post("/addinventory",InventoryController.CreateInventory)
router.get("/viewinventory",InventoryController.GetAllInventory)
router.get("/:id",InventoryController.GetByIdInventory)
router.delete("/:id",InventoryController.DeleteInventory)
router.patch("/:id",InventoryController.UpdateInventory)
router.get("/export",InventoryController.ExportInventory)
router.post("/import",upload.single("file"),InventoryController.ImportCsv)
router.get("/getlowstock",InventoryController.GetLowStockItems)

module.exports=router;