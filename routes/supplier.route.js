const router=require("express").Router();
const SupplierController=require("../controller/supplier.controller")
router.post("/addsupplier",SupplierController.CreateSupplier)
router.get("/",SupplierController.GetAllSuppllier)
router.get("/:id",SupplierController.GetByIdSupplier)
router.delete("/:id",SupplierController.DeleteSupplier)
router.patch("/:id",SupplierController.UpdateSupplier)
module.exports=router;