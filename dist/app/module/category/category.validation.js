"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesValidation = void 0;
const zod_1 = require("zod");
const createCategories = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
    }),
});
const updateCategories = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
    }),
});
exports.CategoriesValidation = {
    createCategories,
    updateCategories,
};
