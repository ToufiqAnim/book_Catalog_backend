import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const token: string | undefined = req.headers.authorization;

  try {
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Token not provided');
    }

    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    if (verifiedUser.role === 'admin') {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'Only customer can order. Please login as a customer account.'
      );
    }
    const { orderedBooks } = req.body;

    const result = await OrderService.createOrder(
      orderedBooks,
      verifiedUser?.id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const token: string | undefined = req.headers.authorization;

  try {
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Token not provided');
    }

    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const result = await OrderService.getAllOrders(verifiedUser);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const token: string | undefined = req.headers.authorization;

  try {
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Token not provided');
    }

    const verifiedUser = jwtHelpers.verifyToken(
      token as string,
      config.jwt.secret as Secret
    );

    const result = await OrderService.getSingleOrder(
      verifiedUser,
      req.params.id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

export const OrderController = {
  createOrder,
  getAllOrder,
  getSingleOrder,
};
