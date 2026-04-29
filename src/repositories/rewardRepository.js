import { prisma } from "../lib/prisma.js";

/* CREATE */
export const createReward = async (data) => {
  return await prisma.reward.create({ data });
};

/* READ ALL */
export const getAllRewards = async () => {
  return await prisma.reward.findMany();
};

/* READ ONE */
export const getRewardById = async (id) => {
  return await prisma.reward.findUnique({
    where: { id: Number(id) }
  });
};

/* UPDATE */
export const updateReward = async (id, data) => {
  return await prisma.reward.update({
    where: { id: Number(id) },
    data
  });
};

/* DELETE */
export const deleteReward = async (id) => {
  return await prisma.reward.delete({
    where: { id: Number(id) }
  });
};