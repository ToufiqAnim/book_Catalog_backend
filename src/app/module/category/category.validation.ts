import { z } from 'zod';

const createCategories = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

const updateCategories = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const CategoriesValidation = {
  createCategories,
  updateCategories,
};
