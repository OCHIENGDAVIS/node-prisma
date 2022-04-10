import client from '@prisma/client';
const { PrismaClient } = client;

const prisma = new PrismaClient();

export class UserService {
  getAllusers = async () => {
    const allUsers = await prisma.user.findMany({ include: { posts: true } });
    return allUsers;
  };
  createUser = async (user) => {
    const createdUser = await prisma.user.create({
      data: user,
    });
    return createdUser;
  };
  updateUser = async (userId, data) => {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
      include: { posts: true },
    });
    return updatedUser;
  };

  emailIsUnique = async (email) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return false;
    }
    return true;
  };
  usernameIsUnique = async (username) => {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (user) {
      return false;
    }
    return true;
  };

  deleteUser = async (id) => {
    return await prisma.user.delete({
      where: { id },
    });
  };

  getUserById = async (id) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      return user;
    }
    return null;
  };
}
