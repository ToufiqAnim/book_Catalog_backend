"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRelationalFieldsMapper = exports.booksRelationalFields = exports.booksFilterableFields = exports.booksSearchableFields = void 0;
exports.booksSearchableFields = ['title', 'author', 'genre'];
exports.booksFilterableFields = [
    'searchTerm',
    'minPrice',
    'maxPrice',
    'categoryId',
];
exports.booksRelationalFields = ['categoryId'];
exports.booksRelationalFieldsMapper = {
    categoryId: 'category',
};
