import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserProfileService } from './userProfile.service';

const userProfile = catchAsync(async (req: Request, res: Response) => {
  const token: string | undefined = req.headers.authorization;

  try {
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Token not provided');
    }
    const varifiedUser = jwtHelpers.verifyToken(
      token as string,
      config.jwt.secret as Secret
    );

    const result = await UserProfileService.userProfile(varifiedUser?.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});
export const userProfileController = {
  userProfile,
};
