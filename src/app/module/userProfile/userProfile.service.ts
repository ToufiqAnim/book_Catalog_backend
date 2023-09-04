import { prisma } from '../../../shared/prisma';

const userProfile = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};
export const UserProfileService = {
  userProfile,
};
