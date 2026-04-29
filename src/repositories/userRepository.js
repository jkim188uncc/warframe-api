import { prisma } from "../lib/prisma.js";

const createUser = (data) => {
  return prisma.user.create({ data });
};

const findUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email }
  });
};

const findUserById = (id) => {
  return prisma.user.findUnique({
    where: { id }
  });
};

export default {
  createUser,
  findUserByEmail,
  findUserById
};