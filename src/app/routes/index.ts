import express from 'express';
import { BooksRoute } from '../module/books/books.routes';
import { CategoryRoute } from '../module/category/category.routes';

import { AuthRoutes } from '../module/auth/auth.routes';
import { OrderRoutes } from '../module/order/order.routes';
import { UserRoute } from '../module/user/user.routes';
import { ProfileRoutes } from '../module/userProfile/userProfile.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/users',
    routes: UserRoute,
  },
  {
    path: '/categories',
    routes: CategoryRoute,
  },

  {
    path: '/books',
    routes: BooksRoute,
  },
  {
    path: '/orders',
    routes: OrderRoutes,
  },
  {
    path: '/profile',
    routes: ProfileRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
