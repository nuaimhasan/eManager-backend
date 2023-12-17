const Job = require("../models/Job");

exports.addJob = async (req, res) => {
  try {
    const result = await Job.create(req?.body);

    res.status(200).json({
      success: true,
      message: "Job added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const result = await Job.find({});

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Jobs not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Jobs found successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.updateJob = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;

  try {
    const result = await Job.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Job not found to update",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.deleteJob = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await Job.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Job not found to delete",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getJobById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await Job.findById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job found successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
