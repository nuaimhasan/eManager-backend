const Banner = require("../models/Banner");

exports.addBanner = async (req, res) => {
  try {
    const result = await Banner.create(req?.body);

    if (!result) {
      return res.status(400).json({
        success: false,
        error: "Banner not added",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getBanner = async (req, res) => {
  try {
    const result = await Banner.find({});

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner found successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateBanner = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;

  try {
    const result = await Banner.findByIdAndUpdate(id, data, { new: true });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Banner not found to update",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
