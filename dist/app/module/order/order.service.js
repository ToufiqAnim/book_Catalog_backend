"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = require("../../../shared/prisma");
const createOrder = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = Object.assign(Object.assign({}, data), { userId });
    const result = yield prisma_1.prisma.order.create({
        data: payload,
        include: {
            user: true,
        },
    });
    return result;
});
const getAllOrders = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (userData && (userData === null || userData === void 0 ? void 0 : userData.role) === 'customer') {
        return yield prisma_1.prisma.order.findMany({
            where: {
                userId: userData === null || userData === void 0 ? void 0 : userData.userId,
            },
        });
    }
    const result = yield prisma_1.prisma.order.findMany();
    return result;
});
const getSingleOrder = (userInfo, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.order.findUnique({
        where: { id },
    });
    if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.role) === 'customer' && (result === null || result === void 0 ? void 0 : result.userId) !== (userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId)) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Your request not acceptable');
    }
    return result;
});
exports.OrderServices = {
    createOrder,
    getAllOrders,
    getSingleOrder,
};
