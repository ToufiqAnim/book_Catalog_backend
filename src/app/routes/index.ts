import express from 'express';
import { BooksRoute } from '../module/books/books.routes';
import { CategoryRoute } from '../module/category/category.routes';
import { OrderRoute } from '../module/order/order.routes';
import { UserRoute } from '../module/user/user.routes';
import { UserProfileRoute } from '../module/userProfile/userProfile.routes';

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
  {
    path: '/books',
    routes: BooksRoute,
  },
  {
    path: '/orders',
    routes: OrderRoute,
  },
  {
    path: '/profile',
    routes: UserProfileRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
