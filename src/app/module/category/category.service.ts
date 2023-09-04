import { Category } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createCategories = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};
const getAllCategories = async () => {
  const result = await prisma.category.findMany();
  return result;
};
const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  return result;
};
const updateCategory = async (
  id: string,
  data: Category
): Promise<Category | null> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data,
    include: {
      books: true,
    },
  });
  return result;
};
const deleteCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },

    include: {
      books: true,
    },
  });
  return result;
};
export const CategoyService = {
  createCategories,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
