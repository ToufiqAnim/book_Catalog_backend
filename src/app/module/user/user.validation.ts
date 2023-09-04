import { z } from 'zod';
import { UserRole } from './user.constant';

const createUser = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z.enum([...UserRole] as [string, ...string[]], {
      required_error: 'Name is required',
    }),
    contactNo: z.string({
      required_error: 'Contact no is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    profileImg: z.string({
      required_error: 'Profile image is required',
    }),
  }),
});

const updateUser = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

const loginAuth = z.object({
  body: z.object({
    email: z.string().optional(),
    password: z.string().optional(),
  }),
});

export const UserValidation = {
  createUser,
  updateUser,
  loginAuth,
};
