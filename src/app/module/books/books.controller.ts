import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';

import { booksFilterableFields } from './books.constant';
import { BooksService } from './books.service';

const createBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksService.createBooks(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successful',
    data: result,
  });
});
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, booksFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await BooksService.getAllBooks(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successful',
    meta: result.meta,
    data: result.data,
  });
});
const getBooksCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksService.getBooksCategories(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrived by category successful',
    data: result,
  });
});
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksService.getSingleBook(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Book retrived successful',
    data: result,
  });
});
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksService.updateBook(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successful',
    data: result,
  });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksService.deleteBook(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successful',
    data: result,
  });
});
export const BooksController = {
  createBooks,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  getBooksCategories,
};
