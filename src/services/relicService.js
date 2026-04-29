import * as relicRepo from "../repositories/relicRepository.js";

export const createRelic = async (data) => {
  return await relicRepo.createRelic(data);
};

export const getAllRelics = async () => {
  return await relicRepo.getAllRelics();
};

export const getRelicById = async (id) => {
  return await relicRepo.getRelicById(id);
};

export const updateRelic = async (id, data) => {
  return await relicRepo.updateRelic(id, data);
};

export const deleteRelic = async (id) => {
  return await relicRepo.deleteRelic(id);
};