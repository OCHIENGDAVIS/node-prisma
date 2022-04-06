import { Router } from 'express';
import {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} from '../controllers/post.js';

const postRouter = Router();

postRouter.get('/posts', getAllPosts);
postRouter.post('/posts', createPost);
postRouter.get('/posts/:id', getPost);
postRouter.patch('/posts/:id', updatePost);
postRouter.delete('/posts/:id', deletePost);

export { postRouter };
