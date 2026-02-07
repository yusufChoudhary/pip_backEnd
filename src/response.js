import StatusCodes from 'http-status-codes';
import messageHandler from './utils/message.js';

class ResponseHandler {
  static buildResponse({
    status,
    message,
    data = {},
    err = null,
    page,
    limit,
    total,
    employeeId,
  }) {
    const result = { status, message, data };

    if (err) result.err = err;
    if (employeeId) result.employeeId = employeeId;

    if (page) {
      result.extra = {
        page: page || 1,
        limit: limit || 20,
        total: total || 0,
      };
    }

    return result;
  }


  static success({
    res,
    servicesResponse = {},
    page,
    limit,
    total,
    statusCode,
    message,
    status,
    employeeId,
  }) {
    const data = {
      status: status ?? true,
      message: message,
      data: servicesResponse || {},
      page,
      limit,
      total,
    };
    if (employeeId) {
      data.employeeId = employeeId;
    }
    const result = this.buildResponse(data);

    return res.status(statusCode || StatusCodes.OK).json(result);
  }

  static error({
    res,
    message = messageHandler.internalServerError,
    statusCode,
    page,
    limit,
    total,
  }) {
    const result = this.buildResponse({
      status: false,
      message,
      page,
      limit,
      total,
    });

    return res.status(statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(result);
  }

  static catchError({ res, err, page, limit, total, statusCode }) {
    const result = this.buildResponse({
      status: false,
      message: messageHandler.internalServerError,
      err: err?.message || err,
      page,
      limit,
      total,
    });

    return res.status(statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(result);
  }
}

export default ResponseHandler;
