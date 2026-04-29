import * as rewardService from "../services/rewardService.js";

/* CREATE */
export const createReward = async (req, res) => {
  try {
    const reward = await rewardService.createReward(req.body);
    return res.status(201).json(reward);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

/* GET ALL */
export const getAllRewards = async (req, res) => {
  try {
    const rewards = await rewardService.getAllRewards();
    return res.status(200).json(rewards);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

/* GET BY ID */
export const getRewardById = async (req, res) => {
  try {
    const reward = await rewardService.getRewardById(req.params.id);

    if (!reward) {
      return res.status(404).json({ error: "Reward not found" });
    }

    return res.status(200).json(reward);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

/* UPDATE */
export const updateReward = async (req, res) => {
  try {
    const updated = await rewardService.updateReward(req.params.id, req.body);
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(404).json({ error: "Reward not found" });
  }
};

/* DELETE */
export const deleteReward = async (req, res) => {
  try {
    const deleted = await rewardService.deleteReward(req.params.id);

    return res.status(200).json({
      message: "Reward deleted successfully",
      reward: deleted
    });
  } catch (err) {
    return res.status(404).json({ error: "Reward not found" });
  }
};