import client from '@prisma/client';
const { PrismaClient } = client;
const prisma = new PrismaClient();

export const getUserByUsername = async (username) => {
  const user = await prisma.user.findFirst({ where: { username } });
  if (user) {
    return user;
  } else {
    return null;
  }
};

export const getUserByEmail = async (email) => {
  const user = await prisma.user.findFirst({ where: { email } });
  if (user) {
    return user;
  } else {
    return null;
  }
};

export const getUserByID = async (id) => {
  const existingUser = await prisma.user.findUnique({ where: { id } });
  if (existingUser) {
    return existingUser;
  } else {
    return null;
  }
};
