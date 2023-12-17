const CareerBanner = require("../models/CareerBanner");

exports.addCareerBanner = async (req, res) => {
  try {
    const result = await CareerBanner.create(req.body);

    if (!result) {
      return res.status(404).json({
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

exports.getCareerBanner = async (req, res) => {
  try {
    const result = await CareerBanner.find({});

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

exports.updateCareerBanner = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;
  // console.log("id", id);
  // console.log("data", data);

  try {
    const result = await CareerBanner.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Banner not found to update",
      });
    }

    res.status(200).json({
      success: true,
      message: "Career Banner updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
