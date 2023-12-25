const Team = require("../models/Team");
const fs = require("fs");

exports.addTeamMember = async (req, res) => {
  const file = req?.file?.filename;
  const data = req?.body;

  if (!file)
    return res.status(400).json({
      success: false,
      error: "Image is required",
    });

  try {
    const newData = {
      image: file,
      ...data,
    };

    const result = await Team.create(newData);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Team Member not added",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team Member added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllTeamMembers = async (req, res) => {
  try {
    const teams = await Team.find({}).sort({ order: 1 });

    if (!teams) {
      return res.status(404).json({
        success: false,
        error: "Team Members Not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teams Members found successfully",
      data: teams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getTeamMemberById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const team = await Team.findById(id);

    if (!team)
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });

    res.status(200).json({
      success: true,
      message: "Team found successfully",
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateTeamMember = async (req, res) => {
  const file = req?.file?.filename;
  const id = req?.params?.id;
  const data = req?.body;

  try {
    const team = await Team.findById(id);

    if (!team) {
      if (file) {
        fs.unlink(`./uploads/team/${file}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }

      return res.status(404).json({
        success: false,
        error: "Team not found",
      });
    }

    if (file) {
      const newData = {
        image: file,
        ...data,
      };

      await Team.findByIdAndUpdate(id, newData, {
        new: true,
      });

      fs.unlink(`./uploads/team/${team?.image}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    } else {
      const newData = {
        image: team?.image,
        ...data,
      };

      await Team.findByIdAndUpdate(id, newData, {
        new: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "Team Member updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteTeamMember = async (req, res) => {
  const id = req?.params?.id;

  try {
    const team = await Team.findById(id);

    if (!team) {
      return res.status(404).json({
        success: false,
        error: "Team Member not found",
      });
    }

    if (team?.image && `./uploads/team/${team?.image}`) {
      fs.unlink(`./uploads/team/${team?.image}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    await Team.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Team Member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
