import { UserService } from '../services/user.js';

const userService = new UserService();

export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await userService.getAllusers();
    return res.status(200).json({ users: allUsers, msg: 'sucess' });
  } catch (error) {
    return res.status(500).json({ msg: 'error', error: error.message });
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { email, username } = req.body;
    const emailIsUnique = await userService.emailIsUnique(email);
    if (!emailIsUnique) {
      return res.status(400).json({ msg: 'error: email must be unique' });
    }
    const usernameIsUnique = await userService.usernameIsUnique(username);
    if (!usernameIsUnique) {
      return res.status(400).json({ msg: 'error: username must be unique' });
    }
    const data = { email, username };
    const newUser = await userService.createUser(data);
    return res.status(201).json({ msg: 'sucess', newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'error', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existingUser = await userService.getUserById(id);
    if (!existingUser) {
      return res
        .status(400)
        .json({ msg: `error: User with the id ${id} does not exists` });
    }
    const user = await userService.updateUser(id, req.body);
    return res.status(200).json({ msg: 'sucess', user });
  } catch (error) {
    return res.status(500).json({ msg: 'error', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const existingUser = await userService.getUserById(id);
    if (!existingUser) {
      return res.status(400).json({
        msg: 'error',
        error: `User with user id ${id} does not exists`,
      });
    }
    const user = await userService.deleteUser(id);
    return res.status(200).json({ msg: 'sucess', user });
  } catch (error) {
    return res.status(500).json({ msg: 'error', error: error.message });
  }
};
