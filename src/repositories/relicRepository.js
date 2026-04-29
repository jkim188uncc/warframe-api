import { prisma } from "../lib/prisma.js";

export const createRelic = async (data) => {
  return await prisma.relic.create({ data });
};

export const getAllRelics = async () => {
  return await prisma.relic.findMany();
};

export const getRelicById = async (id) => {
  return await prisma.relic.findUnique({
    where: { id: Number(id) }
  });
};

export const updateRelic = async (id, data) => {
  return await prisma.relic.update({
    where: { id: Number(id) },
    data
  });
};

export const deleteRelic = async (id) => {
  return await prisma.relic.delete({
    where: { id: Number(id) }
  });
};