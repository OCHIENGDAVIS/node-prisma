import client from '@prisma/client';
const { PrismaClient } = client;

import {
  getUserByEmail,
  getUserByUsername,
  getUserByID,
} from '../utils/utils.js';

const prisma = new PrismaClient();

export const getAllUser = async (req, res, next) => {
  try {
    const allUser = await prisma.user.findMany({
      include: { posts: true },
    });
    return res.status(200).json({ users: allUser, msg: 'sucess' });
  } catch (error) {
    return res.status(500).json({ msg: 'error', error: error.message });
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { email, username } = req.body;
    const userEmailExists = await getUserByEmail(email);
    if (userEmailExists) {
      return res.status(400).json({ msg: 'error: email must be unique' });
    }
    const usernameExists = await getUserByUsername(username);
    if (usernameExists) {
      return res.status(400).json({ msg: 'error: username must be unique' });
    }
    const user = await prisma.user.create({
      data: {
        email,
        username,
      },
    });
    return res.status(201).json({ msg: 'sucess', user });
  } catch (error) {
    return res.status(500).json({ msg: 'error', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const newUserName = req.body.username;

    const existingUser = await getUserByID(id);
    console.log(existingUser);
    if (!existingUser) {
      return res
        .status(400)
        .json({ msg: `error: User with the id ${id} does not exists` });
    }
    const user = await prisma.user.update({
      where: { id },
      data: { username: newUserName },
      include: { posts: true },
    });
    return res.status(200).json({ msg: 'sucess', user });
  } catch (error) {
    return res.status(500).json({ msg: 'error', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const existingUser = await getUserByID(id);
    if (!existingUser) {
      return res.status(400).json({
        msg: 'error',
        error: `User with user id ${id} does not exists`,
      });
    }
    const user = await prisma.user.delete({ where: { id } });
    return res.status(200).json({ msg: 'sucess', user });
  } catch (error) {
    return res.status(500).json({ msg: 'error', error: error.message });
  }
};
