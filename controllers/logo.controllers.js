const Logo = require("../models/Logo");
const fs = require("fs");

exports.addLogo = async (req, res) => {
  try {
    const logo = {
      logo: req?.file?.filename,
    };

    const result = await Logo.create(logo);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Logo not added",
      });
    }

    res.status(200).json({
      success: true,
      message: "Logo added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getLogos = async (req, res) => {
  try {
    const logo = await Logo.find({});

    if (!logo) {
      return res.status(404).json({
        success: false,
        message: "Logo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Logo found successfully",
      data: logo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.updateLogo = async (req, res) => {
  try {
    const logo = req?.file?.filename;
    if (!logo) {
      return res.status(400).json({
        success: false,
        error: "Logo is required",
      });
    }

    const id = req.params.id;
    const isLogo = await Logo.findOne({ _id: id });

    if (isLogo) {
      await Logo.findByIdAndUpdate({ _id: id }, { logo: logo }, { new: true });
      fs.unlink(`./uploads/logos/${isLogo?.logo}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });

      res.status(200).json({
        success: true,
        message: "Logo updated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
