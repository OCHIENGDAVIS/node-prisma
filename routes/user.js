import { Router } from 'express';
import {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.js';

const userRouter = Router();

userRouter.get('/users', getAllUser);
userRouter.post('/users', createUser);
userRouter.patch('/users/:id', updateUser);
userRouter.delete('/users/:id', deleteUser);

export { userRouter };
