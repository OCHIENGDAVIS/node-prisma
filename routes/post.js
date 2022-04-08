import { Router } from 'express';
import {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} from '../controllers/post.js';
import { postCreateOrUpdateValidator } from '../middlewares/post.js';

const postRouter = Router();

postRouter.get('/posts', getAllPosts);
postRouter.post('/posts', postCreateOrUpdateValidator, createPost);
postRouter.get('/posts/:id', getPost);
postRouter.patch('/posts/:id', postCreateOrUpdateValidator, updatePost);
postRouter.delete('/posts/:id', deletePost);

export { postRouter };
