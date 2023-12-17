const { mailSender } = require("../utils/mailSender");

exports.clientMessage = async (req, res) => {
  const data = req.body;

  try {
    await mailSender(data);

    res.status(200).json({
      success: true,
      message: "Message sent success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
