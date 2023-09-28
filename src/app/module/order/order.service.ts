import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';

const createOrder = async (data: [], userId: string): Promise<Order> => {
  const payload = { ...data, userId };

  const result = await prisma.order.create({
    data: payload,
    include: {
      user: true,
    },
  });

  return result;
};

const getAllOrders = async (userData: JwtPayload | null): Promise<Order[]> => {
  if (userData && userData?.role === 'customer') {
    return await prisma.order.findMany({
      where: {
        userId: userData?.userId,
      },
    });
  }

  const result = await prisma.order.findMany();

  return result;
};

const getSingleOrder = async (
  userInfo: Record<string, unknown> | null,
  id: string
) => {
  const result = await prisma.order.findUnique({
    where: { id },
  });

  if (userInfo?.role === 'customer' && result?.userId !== userInfo?.userId) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      'Your request not acceptable'
    );
  }

  return result;
};

export const OrderServices = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
