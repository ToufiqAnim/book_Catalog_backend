import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoriesValidation } from './category.validation';
const router = express.Router();

router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getSingleCategory);
router.post(
  '/create-category',
  validateRequest(CategoriesValidation.createCategories),
  CategoryController.createCategories
);
router.patch(
  '/:id',
  validateRequest(CategoriesValidation.updateCategories),
  CategoryController.updateCategory
);
router.delete('/:id', CategoryController.deleteCategory);

export const CategoryRoute = router;
