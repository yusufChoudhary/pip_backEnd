import express from "express";
import controller from "./controller.js";
import validations from "../../middleware/validation/product.js";
import upload from "../../middleware/upload.js";
import handleMulterError from "../../middleware/multer/multer.js";

const router = express.Router();

router.get("/", validations.list, controller.getProducts);
router.post("/", upload.single("filename"), handleMulterError, validations.save, controller.createProduct);
router.put("/:id", upload.single("filename"), handleMulterError, validations.edit, controller.updateProduct);
router.delete("/:id", validations.edit, controller.deleteProduct);

export default router;