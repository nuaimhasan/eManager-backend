const slugify = require("slugify");
const Service = require("../models/Service");
const fs = require("fs");

exports.addService = async (req, res) => {
  const image = req?.files?.image?.[0]?.filename;
  const icon = req?.files?.icon?.[0]?.filename;
  const data = req?.body;

  if (!image || !icon) {
    return res.status(400).json({
      success: false,
      error: "Image or Icon is missing",
    });
  }

  const slug = slugify(data?.title, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });

  try {
    const newData = {
      ...data,
      image,
      icon,
      slug,
    };
    const result = await Service.create(newData);

    if (!result) {
      return res.status(400).json({
        success: false,
        error: "Service not created",
      });
    }

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const result = await Service.find({}).sort({ order: 1 });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service found",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getServiceById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await Service.findById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service found successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getServiceBySlug = async (req, res) => {
  const slug = req?.params?.slug;

  try {
    const service = await Service.findOne({ slug: slug });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service found successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.updateServiceById = async (req, res) => {
  const id = req?.params?.id;
  const image = req?.files?.image?.[0]?.filename;
  const icon = req?.files?.icon?.[0]?.filename;
  const data = req?.body;

  try {
    const isServiceExists = await Service.findById(id);
    if (!isServiceExists) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    let slug = isServiceExists?.slug;
    if (data?.title) {
      slug = slugify(data?.title, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true,
      });
    }

    let newData;

    if (image && icon) {
      fs.unlink(`./uploads/services/image/${isServiceExists.image}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });

      fs.unlink(`./uploads/services/icon/${isServiceExists.icon}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });

      newData = {
        ...data,
        image,
        icon,
        slug,
      };
    } else if (image) {
      fs.unlink(`./uploads/services/image/${isServiceExists.image}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      newData = {
        ...data,
        image,
        slug,
      };
    } else if (icon) {
      fs.unlink(`./uploads/services/icon/${isServiceExists.icon}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      newData = {
        ...data,
        icon,
        slug,
      };
    } else {
      newData = {
        ...data,
        slug,
      };
    }

    await Service.findByIdAndUpdate(id, newData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.deleteServiceById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await Service.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    fs.unlink(`./uploads/services/image/${result.image}`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    fs.unlink(`./uploads/services/icon/${result.icon}`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
