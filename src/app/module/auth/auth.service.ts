import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { prisma } from '../../../shared/prisma';
import { ILoginUser } from './auth.interface';

const createUser = async (data: User) => {
  const result = await prisma.user.create({
    data,
  });
  const isUserExist = await prisma.user.findFirst({
    where: {
      id: result.id,
    },
  });
  if (isUserExist) {
    const { id, role } = isUserExist;
    const accessToken = jwtHelpers.createToken(
      { id, role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    const refreshToken = jwtHelpers.createToken(
      { id, role },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    );
    return {
      accessToken,
      refreshToken,
    };
  } else {
    throw new Error('User does not exist');
  }
};

const loginAuth = async (data: ILoginUser) => {
  const isUserExist = await prisma.user.findFirst({
    where: { email: data.email },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (data?.password !== isUserExist?.password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password did not match');
  }

  const { id: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken,
  };
};
export const AuthServices = {
  createUser,
  loginAuth,
};
