import express from 'express';
import { BooksController } from './books.controller';
const router = express.Router();

router.post('/', BooksController.createBooks);
router.get('/', BooksController.getAllBooks);
export const BooksRoute = router;
