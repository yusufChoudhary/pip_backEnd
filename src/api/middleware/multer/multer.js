import multer from "multer";
import statusCodes from "http-status-codes";


const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {      
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(statusCodes.BAD_REQUEST).json({
                status: false,
                message: "File too large. Maximum size is 5MB",
                error: "LIMIT_FILE_SIZE"
            });
        }
        
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(statusCodes.BAD_REQUEST).json({
                status: false,
                message: `Unexpected field '${err.field}'. Expected file field name is 'filename'`,
                error: "LIMIT_UNEXPECTED_FILE",
                receivedField: err.field,
                expectedField: "filename"
            });
        }
        
        if (err.code === "LIMIT_FIELD_COUNT") {
            return res.status(statusCodes.BAD_REQUEST).json({
                status: false,
                message: "Too many fields provided",
                error: "LIMIT_FIELD_COUNT"
            });
        }
        
        return res.status(statusCodes.BAD_REQUEST).json({
            status: false,
            message: err.message,
            error: err.code
        });
    }
    
    if (err) {
        return res.status(statusCodes.BAD_REQUEST).json({
            status: false,
            message: err.message,
            error: "FILE_FILTER_ERROR"
        });
    }
    
    next();
};

export default handleMulterError;