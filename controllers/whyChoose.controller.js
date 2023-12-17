const WhyChoose = require("../models/WhyChoose");
const fs = require("fs");

exports.createWhyChoose = async (req, res) => {
  const file = req?.file?.filename;
  const data = req?.body;

  if (!file)
    return res.status(400).json({
      success: false,
      message: "Image is required",
    });

  try {
    const newData = {
      icon: file,
      title: data?.title,
      description: data?.description,
    };

    const result = await WhyChoose.create(newData);

    if (!result)
      return res.status(404).json({
        success: false,
        message: "WhyChoose not added",
      });

    res.status(200).json({
      success: true,
      message: "WhyChoose added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateWhyChoose = async (req, res) => {
  const file = req?.file?.filename;

  const id = req?.params?.id;
  const data = req?.body;

  try {
    const whyChoose = await WhyChoose.findById(id);

    if (!whyChoose)
      return res.status(404).json({
        success: false,
        error: "WhyChoose not found",
      });

    if (file) {
      fs.unlink(`./uploads/whychoose/${whyChoose?.icon}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      const newData = {
        icon: file,
        title: data?.title,
        description: data?.description,
      };

      await WhyChoose.findByIdAndUpdate(id, newData, {
        new: true,
      });
    } else {
      const newData = {
        icon: whyChoose.icon,
        title: data?.title,
        description: data?.description,
      };

      await WhyChoose.findByIdAndUpdate(id, newData, {
        new: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "WhyChoose updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getWhyChooseById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const whyChoose = await WhyChoose.findById(id);

    if (!whyChoose)
      return res.status(404).json({
        success: false,
        message: "WhyChoose not found",
      });

    res.status(200).json({
      success: true,
      message: "WhyChoose found successfully",
      data: whyChoose,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getAllWhyChoose = async (req, res) => {
  try {
    const whyChoose = await WhyChoose.find({});

    if (!whyChoose)
      return res.status(404).json({
        success: false,
        message: "WhyChoose's not found",
      });

    res.status(200).json({
      success: true,
      message: "WhyChoose's found successfully",
      data: whyChoose,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.deleteWhyChoose = async (req, res) => {
  const id = req?.params?.id;

  try {
    const whyChoose = await WhyChoose.findById(id);

    if (!whyChoose)
      return res.status(404).json({
        success: false,
        message: "WhyChoose not found",
      });

    if (whyChoose?.icon) {
      fs.unlink(`./uploads/whychoose/${whyChoose?.icon}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }

    await WhyChoose.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "WhyChoose deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
