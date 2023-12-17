const AboutUs = require("../models/About");
const fs = require("fs");

exports.createAboutUs = async (req, res) => {
  const image = req?.files?.image[0]?.filename;
  const profileDoc = req?.files?.profileDoc[0]?.filename;
  const data = req?.body;

  const aboutus = {
    ...data,
    image,
    profileDoc,
  };

  try {
    const result = await AboutUs.create(aboutus);
    res.status(201).json({
      success: true,
      message: "AboutUs created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateAboutUs = async (req, res) => {
  const id = req?.params?.id;

  const image = req?.files?.image?.[0]?.filename;
  const profileDoc = req?.files?.profileDoc?.[0]?.filename;
  const data = req?.body;

  try {
    const isAboutUsExists = await AboutUs.findById(id);

    if (!isAboutUsExists) {
      return res.status(404).json({
        success: false,
        error: "AboutUs not found",
      });
    }

    let newData;

    if (image && profileDoc) {
      fs.unlink(`./uploads/aboutus/${isAboutUsExists.image}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });

      fs.unlink(`./uploads/aboutus/${isAboutUsExists.profileDoc}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });

      newData = {
        ...data,
        image,
        profileDoc,
      };
    } else if (image) {
      fs.unlink(`./uploads/aboutus/${isAboutUsExists.image}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      newData = {
        ...data,
        image,
      };
    } else if (profileDoc) {
      fs.unlink(`./uploads/aboutus/${isAboutUsExists.profileDoc}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      newData = {
        ...data,
        profileDoc,
      };
    } else {
      newData = {
        ...data,
      };
    }

    const result = await AboutUs.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "AboutUs not updated",
      });
    }
    res.status(200).json({
      success: true,
      message: "AboutUs updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getAboutUs = async (req, res) => {
  try {
    const result = await AboutUs.find({});

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "AboutUs not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "AboutUs found successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
