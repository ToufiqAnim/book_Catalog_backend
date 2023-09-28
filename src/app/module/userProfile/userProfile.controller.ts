import { User } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileServices } from './userProfile.service';

const getUserProfile: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.user?.userId;
  const result = await ProfileServices.getUserProfile(userId);

  sendResponse<User | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile fetched successfully',
    data: result,
  });
});

export const ProfileControllers = {
  getUserProfile,
};
