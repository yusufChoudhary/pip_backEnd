import Product from "../models/Product.js";
import message from "../utils/message.js";
import StatusCode from "http-status-codes"

class ProductService {

    static async getProducts(skip, limit) {
        try {
            const [total, products] = await Promise.all([
                Product.countDocuments(),
                Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean()]);
            return {
                status: total > 0,
                message: total > 0 ? message.success("Products") : message.notFound("Products"),
                data: products,
                statusCode: total > 0 ? StatusCode.OK : StatusCode.NOT_FOUND
            }
        } catch (error) {
            return {
                status: false,
                message: error.message,
                statusCode: StatusCode.INTERNAL_SERVER_ERROR
            };
        }
    }

    static async createProduct(productData) {
        try {
            await Product.create(productData);
            return {
                status: true,
                message: message.created("Product"),
                statusCode: StatusCode.CREATED
            };
        } catch (error) {
            return {
                status: false,
                message: error.message,
                error: error.name,
                statusCode: StatusCode.INTERNAL_SERVER_ERROR    
            };
        }
    }

    static async updateProduct(id, updateData) {
        try {
            const updated = await Product.findByIdAndUpdate(id, updateData, {
                new: true,
                runValidators: true,
            });

            if (!updated) {
                return {
                    status: false,
                    message: message.notFound("Product"),
                    statusCode: StatusCode.NOT_FOUND
                };
            }

            return {
                status: true,
                message: message.updated("Product"),
                statusCode: StatusCode.OK
            };
        } catch (error) {
            return {
                status: false,
                message: error.message,
                statusCode: StatusCode.INTERNAL_SERVER_ERROR
            };
        }
    }

    static async deleteProduct(id) {
        try {
            const deleted = await Product.findByIdAndDelete(id);

            if (!deleted) {
                return {
                    status: false,
                    message: message.notFound("Product"),
                    statusCode: StatusCode.NOT_FOUND
                };
            }

            return {
                status: true,
                message: message.delete("Product"),
                statusCode: StatusCode.OK
            };
        } catch (error) {
            return {
                status: false,
                message: error.message,
                statusCode: StatusCode.INTERNAL_SERVER_ERROR
            };
        }
    }
}

export default ProductService;