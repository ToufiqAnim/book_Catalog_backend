import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import {
  booksRelationalFields,
  booksRelationalFieldsMapper,
  booksSearchableFields,
} from './books.constant';
import { IBookFilterRequest } from './books.interface';

const createBooks = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};
const getAllBooks = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
) => {
  const { searchTerm, minPrice, maxPrice, ...filterData } = filters;
  const { skip, page, limit } = paginationHelpers.calculatePagination(options);
  const andConditions = [];

  const parsedMinPrice = minPrice ? parseFloat(minPrice) : undefined;
  const parsedMaxPrice = maxPrice ? parseFloat(maxPrice) : undefined;
  if (parsedMinPrice !== undefined) {
    andConditions.push({
      price: {
        gte: parsedMinPrice,
      },
    });
  }
  if (parsedMaxPrice !== undefined) {
    andConditions.push({
      price: {
        lte: parsedMaxPrice,
      },
    });
  }

  if (searchTerm) {
    andConditions.push({
      OR: booksSearchableFields.map(field => ({
        [field]: {
          contains: 'searchTerm',
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (booksRelationalFields.includes(key)) {
          return {
            [booksRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }
  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            publicationDate: 'desc',
          },
  });

  const total = await prisma.book.count();
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      total,
      page,
      limit,
      totalPage,
    },
    data: result,
  };
};
const getSingleBook = async (id: string) => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  return result;
};
const getBooksCategories = async (id: string) => {
  const result = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
  });

  return result;
};
const updateBook = async (id: string, data: Partial<Book>) => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data,
    include: {
      category: true,
    },
  });

  return result;
};
const deleteBook = async (id: string) => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });

  return result;
};
export const BooksService = {
  createBooks,
  getAllBooks,
  getSingleBook,
  getBooksCategories,
  updateBook,
  deleteBook,
};
