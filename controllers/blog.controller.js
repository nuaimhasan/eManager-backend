const Blog = require("../models/Blog");
const fs = require("fs");

exports.addBlog = async (req, res) => {
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

    const result = await Blog.create(newData);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Blog not added",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const result = await Blog.find({});

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Blogs not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getBlogById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await Blog.findById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.updateBlog = async (req, res) => {
  const id = req?.params?.id;
  const file = req?.file?.filename;
  const data = req?.body;

  try {
    const isBlogExist = await Blog.findById(id);

    if (!isBlogExist) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (file) {
      fs.unlink(`./uploads/blogs/${isBlogExist?.image}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });

      const newData = {
        ...data,
        image: file,
      };

      await Blog.findByIdAndUpdate(id, newData, {
        new: true,
      });
    } else {
      const newData = {
        ...data,
        image: isBlogExist.image,
      };
      await Blog.findByIdAndUpdate(id, newData, {
        new: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  const id = req?.params?.id;

  try {
    const isBlogExist = await Blog.findById(id);

    if (!isBlogExist) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    fs.unlink(`./uploads/blogs/${isBlogExist?.image}`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
