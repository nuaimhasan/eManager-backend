const JobBenefit = require("../models/JobBenefit");
const fs = require("fs");

exports.addBenefit = async (req, res) => {
  const file = req?.file?.filename;
  const data = req?.body;

  if (!file || !data) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required data",
    });
  }

  try {
    const newData = {
      ...data,
      image: file,
    };

    const result = await JobBenefit.create(newData);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Benefit not added",
      });
    }

    res.status(200).json({
      success: true,
      message: "Benefit added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getBenefits = async (req, res) => {
  try {
    const result = await JobBenefit.find({});

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Benefits not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Benefits fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getBenefitById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await JobBenefit.findById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Benefit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Benefit fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.updateBenefit = async (req, res) => {
  const id = req?.params?.id;
  const file = req?.file?.filename;
  const data = req?.body;

  try {
    const isBenefitExist = await JobBenefit.findById(id);

    if (!isBenefitExist) {
      return res.status(404).json({
        success: false,
        message: "Benefit not found",
      });
    }

    if (file) {
      fs.unlink(`./uploads/benefit/${isBenefitExist?.image}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });

      const newData = {
        ...data,
        image: file,
      };

      await JobBenefit.findByIdAndUpdate(id, newData, {
        new: true,
      });
    } else {
      const newData = {
        ...data,
        image: isBenefitExist.image,
      };
      await JobBenefit.findByIdAndUpdate(id, newData, {
        new: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "Benefit updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.deleteBenefit = async (req, res) => {
  const id = req?.params?.id;

  try {
    const isBenefitExist = await JobBenefit.findById(id);

    if (!isBenefitExist) {
      return res.status(404).json({
        success: false,
        message: "Benefit not found",
      });
    }

    fs.unlink(`./uploads/benefit/${isBenefitExist?.image}`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    await JobBenefit.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Benefit deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
