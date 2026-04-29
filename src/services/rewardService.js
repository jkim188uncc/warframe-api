import * as rewardRepo from "../repositories/rewardRepository.js";

export const createReward = async (data) => {
  return await rewardRepo.createReward(data);
};

export const getAllRewards = async () => {
  return await rewardRepo.getAllRewards();
};

export const getRewardById = async (id) => {
  return await rewardRepo.getRewardById(id);
};

export const updateReward = async (id, data) => {
  return await rewardRepo.updateReward(id, data);
};

export const deleteReward = async (id) => {
  return await rewardRepo.deleteReward(id);
};