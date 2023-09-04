import express from 'express';
import { CategoryRoute } from '../module/category/category.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/category',
    routes: CategoryRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
