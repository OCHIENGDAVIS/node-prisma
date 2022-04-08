import { Router } from 'express';
import { userCreateOrUpdateValidator } from '../middlewares/user.js';
import {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.js';

const userRouter = Router();

userRouter.get('/users', getAllUser);
userRouter.post('/users', userCreateOrUpdateValidator, createUser);
userRouter.patch('/users/:id', userCreateOrUpdateValidator, updateUser);
userRouter.delete('/users/:id', deleteUser);

export { userRouter };
