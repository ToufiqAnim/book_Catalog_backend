import { OrderedBook } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../../../shared/prisma';

const createOrder = async (payload: OrderedBook[], id: string) => {
  const createdOrder: any = await prisma.$transaction(
    async orderTransaction => {
      const order = await orderTransaction.order.create({
        data: {
          userId: id,
        },
      });

      for (let i = 0; i < payload.length; i++) {
        await orderTransaction.orderedBook.create({
          data: {
            orderId: order.id,
            bookId: payload[i].bookId,
            quantity: payload[i].quantity,
          },
        });
      }
      return order;
    }
  );

  const result = await prisma.order.findMany({
    where: {
      id: createdOrder.id,
    },
    include: {
      orderedBooks: true,
    },
  });

  return result;
};

const getAllOrders = async (user: JwtPayload) => {
  if (user.role === 'customer') {
    const result = await prisma.order.findMany({
      where: { userId: user.id },
    });
    return result;
  } else {
    const result = user.role === 'admin' && (await prisma.order.findMany({}));
    return result;
  }
};
const getSingleOrder = async (user: JwtPayload, id: string) => {
  if (user.role === 'customer') {
    const result = await prisma.order.findUnique({
      where: {
        userId: user.id,
        id,
      },
    });
    return result;
  }
  const result = await prisma.order.findUnique({
    where: { id },
  });
  return result;
};
export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
