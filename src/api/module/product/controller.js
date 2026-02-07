import ResponseHandler from "../../../response.js";
import productService from "../../../service/product.js";

class ProductController {

  static async getProducts(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    try {
      const servicesResponse = await productService.getProducts(skip, limit);
      if (servicesResponse.data && Array.isArray(servicesResponse.data)) {
        const host = `${req.protocol}://${req.get("host")}`;
        servicesResponse.data = servicesResponse.data.map((p) => ({
          ...p,
          image: p.image && p.image.startsWith("/") ? `${host}${p.image}` : p.image,
        }));
      }

      return ResponseHandler.success({ res, message: servicesResponse.message, servicesResponse: servicesResponse.data, statusCode: servicesResponse.statusCode });
    } catch (err) {
      ResponseHandler.catchError({ res, err })
    }
  }

  static async createProduct(req, res) {
    try {
      const { title, description, price, rating } = req.body;

      if (!req.file) {
        return ResponseHandler.missingField({ res, missingField: "filename" });
      }

      const productData = {
        title,
        description,
        price,
        rating: rating || 0,
        image: `/uploads/products/${req.file.filename}`
      };

      const serviceResponse = await productService.createProduct(productData);

      if (!serviceResponse.status) {
        return ResponseHandler.error({
          res,
          message: serviceResponse.message,
          statusCode: serviceResponse.statusCode
        });
      }

      return ResponseHandler.success({
        res,
        message: serviceResponse.message,
        statusCode: serviceResponse.statusCode
      });
    } catch (err) {
      return ResponseHandler.error({ res, err });
    }
  }

  static async updateProduct(req, res) {
    try {
      const { title, description, price, rating } = req.body;
      const updateData = { title, description, price, rating };

      if (req.file) {
        updateData.image = `/uploads/products/${req.file.filename}`;
      }

      Object.keys(updateData).forEach(key =>
        updateData[key] === undefined && delete updateData[key]
      );

      const serviceResponse = await productService.updateProduct(req.params.id, updateData);

      if (!serviceResponse.status) {
        return ResponseHandler.error({ res, message: serviceResponse.message, statusCode: serviceResponse.statusCode });
      }

      return ResponseHandler.success({
        res,
        servicesResponse: serviceResponse.data,
        message: serviceResponse.message
      });
    } catch (err) {
      return ResponseHandler.error({ res, err });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const serviceResponse = await productService.deleteProduct(req.params.id);

      if (!serviceResponse.status) {
        return ResponseHandler.error({ res, message: serviceResponse.message, statusCode: serviceResponse.statusCode });
      }

      return ResponseHandler.success({ res, message: serviceResponse.message });
    } catch (err) {
      return ResponseHandler.error({ res, err });
    }
  }

}

export default ProductController;