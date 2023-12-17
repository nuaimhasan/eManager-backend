const ServiceBanner = require("../models/ServiceBanner");
const fs = require("fs");

exports.addServiceBanner = async (req, res) => {
  const file = req?.file?.filename;
  const data = req?.body;

  if (!file) {
    return res.status(400).json({
      success: false,
      message: "Please upload an image",
    });
  }

  try {
    const serviceBanner = {
      title: data?.title,
      subtitle: data?.subtitle,
      description: data?.description,
      image: file,
    };

    const result = await ServiceBanner.create(serviceBanner);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "ServiceBanner not added",
      });
    }

    res.status(200).json({
      success: true,
      message: "ServiceBanner added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getServiceBanner = async (req, res) => {
  try {
    const result = await ServiceBanner.find({});

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "ServiceBanner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "ServiceBanner fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateServiceBanner = async (req, res) => {
  const id = req?.params?.id;
  const file = req?.file?.filename;
  const data = req?.body;

  try {
    const isServiceBannerExist = await ServiceBanner.findById(id);

    if (!isServiceBannerExist) {
      return res.status(404).json({
        success: false,
        message: "ServiceBanner not found",
      });
    }

    if (file) {
      fs.unlink(
        `./uploads/serviceBanner/${isServiceBannerExist?.image}`,
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
        }
      );

      const newData = {
        title: data?.title,
        subtitle: data?.subtitle,
        description: data?.description,
        image: file,
      };

      await ServiceBanner.findByIdAndUpdate(id, newData, {
        new: true,
      });
    } else {
      const newData = {
        title: data?.title,
        subtitle: data?.subtitle,
        description: data?.description,
        image: isServiceBannerExist?.image,
      };

      await ServiceBanner.findByIdAndUpdate(id, newData, {
        new: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "ServiceBanner updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
