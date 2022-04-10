import client from '@prisma/client';
const { PrismaClient } = client;
const prisma = new PrismaClient();

export class PostService {
  getAllPosts = async () => {
    return await prisma.post.findMany({
      include: { author: true },
    });
  };

  getPost = async (id) => {
    return await prisma.post.findUnique({
      where: {
        id,
      },
    });
  };

  createPost = async (post) => {
    return await prisma.post.create({
      data: post,
    });
  };

  editPost = async (postId, data) => {
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data,
    });
    return updatedPost;
  };

  deletePost = async (postId) => {
    return await prisma.post.delete({
      where: {
        id: postId,
      },
    });
  };
}
