const ServiceSection = require("../models/ServiceSection");

exports.addServiceSection = async (req, res) => {
  try {
    const result = await ServiceSection.create(req?.body);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Service Section not added",
      });
    }

    res.status(201).json({
      success: true,
      message: "Service Section added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getServiceSections = async (req, res) => {
  try {
    const result = await ServiceSection.find({});

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Service Section not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service Section found successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.updateServiceSectionById = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;

  try {
    const result = await ServiceSection.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Service Section not found to update",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service Section updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
