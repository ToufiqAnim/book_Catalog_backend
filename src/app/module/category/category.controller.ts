import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoyService } from './category.service';

const createCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoyService.createCategories(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successful',
    data: result,
  });
});
const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoyService.getAllCategories();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrived successful',
    data: result,
  });
});
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoyService.getSingleCategory(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Category retrived successful',
    data: result,
  });
});
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoyService.updateCategory(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successful',
    data: result,
  });
});
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoyService.deleteCategory(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successful',
    data: result,
  });
});
export const CategoryController = {
  createCategories,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
