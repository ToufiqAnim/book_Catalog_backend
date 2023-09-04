import express from 'express';
import { BooksRoute } from '../module/books/books.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/books',
    routes: BooksRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
