const ContactUs = require("../models/Contact");

exports.addContactUs = async (req, res) => {
  const data = req.body;

  try {
    const result = await ContactUs.create(data);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "ContactUs not created",
      });
    }

    res.status(200).json({
      success: true,
      message: "ContactUs created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getContactUs = async (req, res) => {
  try {
    const result = await ContactUs.find({});

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "ContactUs not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "ContactUs found successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.updateContactUs = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;
  // console.log(data, id)

  try {
    const result = await ContactUs.findByIdAndUpdate(id, data, { new: true });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "ContactUs not found to update",
      });
    }

    res.status(200).json({
      success: true,
      message: "ContactUs updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
