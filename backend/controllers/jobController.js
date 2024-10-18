const Job = require('../models/Job');
const createJob = async (req, res) => {
  try {
    const { title, description, experienceLevel, endDate, candidates } = req.body;
    const job = await Job.create({ title, description, experienceLevel, endDate, candidates });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { createJob };
