export const booksSearchableFields = ['title', 'author', 'genre'];

export const booksFilterableFields: string[] = [
  'searchTerm',
  'minPrice',
  'maxPrice',
  'categoryId',
];

export const booksRelationalFields = ['categoryId'];

export const booksRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};
