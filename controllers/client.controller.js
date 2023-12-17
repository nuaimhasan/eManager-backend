const Client = require("../models/Client");
const fs = require("fs");

exports.addClient = async (req, res) => {
  const file = req?.file?.filename;
  const data = req?.body;

  if (!file) {
    return res.status(400).json({
      success: false,
      message: "Please upload an image",
    });
  }

  try {
    const client = {
      image: file,
      order: data?.order,
    };

    const result = await Client.create(client);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Client not added",
      });
    }

    res.status(200).json({
      success: true,
      message: "Client added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getClients = async (req, res) => {
  try {
    const result = await Client.find({});

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Clients not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Clients fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.deleteClient = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await Client.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    fs.unlink(`./uploads/clients/${result?.image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.status(200).json({
      success: true,
      message: "Client deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
