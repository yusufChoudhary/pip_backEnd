import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes'

function formValidation(req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const customErrors = {
            success: false,
            message: errors.array()[0].msg,
            errors: errors.array({ onlyFirstError: true }),
            code: StatusCodes.UNPROCESSABLE_ENTITY,
            resCode: StatusCodes.UNPROCESSABLE_ENTITY,
        };
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
            .type('json')
            .send(`${JSON.stringify(customErrors, null, 2)}\n`);
    } else {
        next();
    }
}

export default formValidation;