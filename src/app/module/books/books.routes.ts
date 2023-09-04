import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BooksController } from './books.controller';
import { BooksValidation } from './books.validation';
const router = express.Router();

router.post(
  '/create-book',
  validateRequest(BooksValidation.createBooks),
  BooksController.createBooks
);
router.get('/', BooksController.getAllBooks);

router.get('/:id/category', BooksController.getBooksCategories);
router.get('/:id', BooksController.getSingleBook);
router.patch(
  '/:id',
  validateRequest(BooksValidation.updateBooks),
  BooksController.updateBook
);
router.delete('/:id', BooksController.deleteBook);

export const BooksRoute = router;
