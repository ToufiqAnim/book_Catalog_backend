import express from 'express';
import { BooksRoute } from '../module/books/books.routes';
import { CategoryRoute } from '../module/category/category.routes';
import { UserRoute } from '../module/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/users',
    routes: UserRoute,
  },
  {
    path: '/category',
    routes: CategoryRoute,
  },
  {
    path: '/books',
    routes: BooksRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
