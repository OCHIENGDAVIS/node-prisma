import client from '@prisma/client';
const { PrismaClient } = client;

const prisma = new PrismaClient();

export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
    });
    return res
      .status(200)
      .json({ type: 'sucess', msg: 'data fetched Sucessfully', posts });
  } catch (error) {
    return res.status(500).json({
      type: 'error',
      msg: error.message,
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            username: 'q123',
          },
        },
      },
    });
    return res.status(200).json({ msg: 'sucesss', post });
  } catch (error) {
    return res.status(500).json({ msg: 'error', error: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = Number(req.params.id);

    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!existingPost) {
      return res
        .status(500)
        .json({ type: 'error', msg: `Post with id ${postId} does not exists` });
    }
    return res.status(200).json({ msg: 'sucess', post: existingPost });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'error', error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = Number(req.params.id);
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return res
        .status(400)
        .json({ type: 'error', msg: `Post with id ${postId} does not exists` });
    }
    const { title, content } = req.body;
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
      },
    });
    return res.status(200).json({ msg: 'sucess', post: updatedPost });
  } catch (error) {
    return res.status(500).json({ type: 'error', error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = Number(req.params.id);
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return res
        .status(400)
        .json({ type: 'error', msg: `Post with id ${postId} does not exists` });
    }
    await prisma.post.delete({
      where: { id: postId },
    });
    return res
      .status(200)
      .json({ type: 'sucess', msg: 'Post sucessfully deleted' });
  } catch (error) {
    return res.status(500).json({ type: 'error', error: error.message });
  }
};
