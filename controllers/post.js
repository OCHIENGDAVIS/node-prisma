import { PostService } from '../services/post.js';

const postService = new PostService();

export const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
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
    const info = {
      title,
      content,
      author: {
        connect: {
          username: 'q123',
        },
      },
    };
    const newPost = await postService.createPost(info);
    return res.status(200).json({ msg: 'sucesss', newPost });
  } catch (error) {
    return res.status(500).json({ msg: 'error', error: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = Number(req.params.id);

    const existingPost = await postService.getPost(postId);
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
    const post = await postService.getPost(postId);
    if (!post) {
      return res
        .status(400)
        .json({ type: 'error', msg: `Post with id ${postId} does not exists` });
    }
    const updatedPost = await postService.editPost(postId, req.body);
    return res.status(200).json({ msg: 'success', post: updatedPost });
  } catch (error) {
    return res.status(500).json({ type: 'error', error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = Number(req.params.id);
    const post = await postService.getPost(postId);
    if (!post) {
      return res
        .status(400)
        .json({ type: 'error', msg: `Post with id ${postId} does not exists` });
    }
    await postService.deletePost(postId);
    return res
      .status(200)
      .json({ type: 'sucess', msg: 'Post sucessfully deleted' });
  } catch (error) {
    return res.status(500).json({ type: 'error', error: error.message });
  }
};
