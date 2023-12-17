const JobApplyForm = require("../models/JobApplyForm");
const fs = require("fs");

exports.addJobApplyForm = async (req, res) => {
  const resume = req?.file?.filename;
  const data = req?.body;

  if (!resume) {
    return res.status(400).json({
      success: false,
      message: "Resume is required",
    });
  }

  const applyForm = {
    ...data,
    resume,
  };

  try {
    const result = await JobApplyForm.create(applyForm);

    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Your application has not been submitted",
      });
    }

    res.status(201).json({
      success: true,
      message: "Your application has been submitted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getJobApplyForms = async (req, res) => {
  try {
    const result = await JobApplyForm.find({}).populate("jobId");

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "JobApplyForms not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "JobApplyForms fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getJobApplyFormById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await JobApplyForm.findById(id).populate("jobId");

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "JobApplyForm not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "JobApplyForm fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.deleteJobApplyForm = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await JobApplyForm.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "JobApplyForm not found",
      });
    }

    fs.unlink(`./uploads/jobresume/${result?.resume}`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    res.status(200).json({
      success: true,
      message: "JobApplyForm deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
