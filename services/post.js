import client from '@prisma/client';
const { PrismaClient } = client;
const prisma = new PrismaClient();

export class PostService {
  getAllPosts = async () => {
    const allPosts = await prisma.post.findMany();
    return allPosts;
  };

  createPost = async (post) => {
    const post = await prisma.post.create({
      data: post,
    });
    return post;
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
    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return deletedPost;
  };
}
