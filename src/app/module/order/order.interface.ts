import { OrderStatus } from '@prisma/client';

export type IOrderData = {
  id: string;
  userId: string;
  status: OrderStatus;
  orderedBooks: IOrderedBook[];
};

export type IOrderedBook = {
  Id: string;
  bookId: string;
  quantity: number;
};
