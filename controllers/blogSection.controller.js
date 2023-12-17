const BlogSection = require("../models/BlogSection");

exports.addBlogSection = async (req, res) => {
  try {
    const result = await BlogSection.create(req?.body);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Blog Section not added",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog Section added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getBlogSection = async (req, res) => {
  try {
    const result = await BlogSection.find({});

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Blog Section not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog Section found successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.updateBlogSectionById = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;
  // console.log(id, data);
  try {
    const result = await BlogSection.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Blog Section not found to update",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog Section updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
