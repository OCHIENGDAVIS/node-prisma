import client from '@prisma/client';
const { PrismaClient } = client;
const prisma = new PrismaClient();

export const getUserByID = async (id) => {
  const existingUser = await prisma.user.findUnique({ where: { id } });
  if (existingUser) {
    return existingUser;
  } else {
    return null;
  }
};
