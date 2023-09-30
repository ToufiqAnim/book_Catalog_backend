import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthServices } from './auth.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await AuthServices.createUser(user);
  const { password, ...otherData } = result;
  console.log(password);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: otherData,
  });
});

const loginAuth = catchAsync(async (req: Request, res: Response) => {
  const { token } = await AuthServices.loginAuth(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    token,
  });
});
export const AuthController = {
  createUser,
  loginAuth,
};
