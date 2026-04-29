import * as relicService from "../services/relicService.js";

/* CREATE */
export const createRelic = async (req, res) => {
  try {
    const relic = await relicService.createRelic(req.body);

    return res.status(201).json(relic);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

/* GET ALL */
export const getAllRelics = async (req, res) => {
  try {
    const relics = await relicService.getAllRelics();
    return res.status(200).json(relics);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

/* GET BY ID */
export const getRelicById = async (req, res) => {
  try {
    const relic = await relicService.getRelicById(req.params.id);

    if (!relic) {
      return res.status(404).json({ error: "Relic not found" });
    }

    return res.status(200).json(relic);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

/* UPDATE */
export const updateRelic = async (req, res) => {
  try {
    const updated = await relicService.updateRelic(req.params.id, req.body);

    return res.status(200).json(updated);
  } catch (err) {
    return res.status(404).json({ error: "Relic not found" });
  }
};

/* DELETE */
export const deleteRelic = async (req, res) => {
  try {
    const deleted = await relicService.deleteRelic(req.params.id);

    return res.status(200).json({
      message: "Relic deleted successfully",
      relic: deleted
    });
  } catch (err) {
    return res.status(404).json({ error: "Relic not found" });
  }
};