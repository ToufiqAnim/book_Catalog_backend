"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_routes_1 = require("../module/books/books.routes");
const category_routes_1 = require("../module/category/category.routes");
const auth_routes_1 = require("../module/auth/auth.routes");
const order_routes_1 = require("../module/order/order.routes");
const user_routes_1 = require("../module/user/user.routes");
const userProfile_routes_1 = require("../module/userProfile/userProfile.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        routes: auth_routes_1.AuthRoutes,
    },
    {
        path: '/users',
        routes: user_routes_1.UserRoute,
    },
    {
        path: '/categories',
        routes: category_routes_1.CategoryRoute,
    },
    {
        path: '/books',
        routes: books_routes_1.BooksRoute,
    },
    {
        path: '/orders',
        routes: order_routes_1.OrderRoutes,
    },
    {
        path: '/profile',
        routes: userProfile_routes_1.ProfileRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
