"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        token: data.token || null,
        meta: data.meta || null || undefined,
        data: data.data || null || undefined,
    };
    if (responseData.token === null || responseData.token === undefined) {
        delete responseData.token;
    }
    res.status(data.statusCode).json(responseData);
};
exports.default = sendResponse;
