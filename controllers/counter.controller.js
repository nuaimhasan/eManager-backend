const Counter = require("../models/Counter");
const fs = require("fs");

exports.createCounter = async (req, res) => {
  const file = req?.file?.filename;
  const data = req?.body;

  if (!file)
    return res.status(400).json({
      success: false,
      error: "Image is required",
    });

  try {
    const newData = {
      icon: file,
      title: data?.title,
      description: data?.description,
    };

    const result = await Counter.create(newData);

    if (!result)
      return res.status(404).json({
        success: false,
        error: "Counter not added",
      });

    res.status(200).json({
      success: true,
      message: "Counter added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateCounter = async (req, res) => {
  const file = req?.file?.filename;

  const id = req?.params?.id;
  const data = req?.body;
  // console.log(data);

  try {
    const counter = await Counter.findById(id);

    if (!counter)
      return res.status(404).json({
        success: false,
        message: "Counter not found",
      });

    if (file) {
      fs.unlink(`./uploads/counter/${counter?.icon}`, (err) => {
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

      await Counter.findByIdAndUpdate(id, newData, {
        new: true,
      });
    } else {
      const newData = {
        icon: counter.icon,
        title: data?.title,
        description: data?.description,
      };

      await Counter.findByIdAndUpdate(id, newData, {
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
      error,
    });
  }
};

exports.getCounterById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const counter = await Counter.findById(id);

    if (!counter)
      return res.status(404).json({
        success: false,
        message: "Counter not found",
      });

    res.status(200).json({
      success: true,
      message: "Counter found successfully",
      data: counter,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getAllCounters = async (req, res) => {
  try {
    const counter = await Counter.find({});

    if (!counter)
      return res.status(404).json({
        success: false,
        message: "Counter's not found",
      });

    res.status(200).json({
      success: true,
      message: "Counter's found successfully",
      data: counter,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.deleteCounter = async (req, res) => {
  const id = req?.params?.id;

  try {
    const counter = await Counter.findById(id);

    if (!counter)
      return res.status(404).json({
        success: false,
        message: "Counter not found",
      });

    if (counter?.icon) {
      fs.unlink(`./uploads/counter/${counter?.icon}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }

    await Counter.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Counter deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
