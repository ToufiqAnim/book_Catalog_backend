"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const books_controller_1 = require("./books.controller");
const books_validation_1 = require("./books.validation");
const router = express_1.default.Router();
router.post('/create-book', (0, validateRequest_1.default)(books_validation_1.BooksValidation.createBooks), books_controller_1.BooksController.createBooks);
router.get('/', books_controller_1.BooksController.getAllBooks);
router.get('/:id/category', books_controller_1.BooksController.getBooksCategories);
router.get('/:id', books_controller_1.BooksController.getSingleBook);
router.patch('/:id', (0, validateRequest_1.default)(books_validation_1.BooksValidation.updateBooks), books_controller_1.BooksController.updateBook);
router.delete('/:id', books_controller_1.BooksController.deleteBook);
exports.BooksRoute = router;
