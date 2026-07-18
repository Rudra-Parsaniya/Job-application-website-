const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, phone, bio } = req.body;

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (bio !== undefined) user.bio = bio;

    if (user.role === "jobseeker") {
      const { skills, resumeLink } = req.body;
      if (skills !== undefined) user.skills = skills;
      if (resumeLink !== undefined) user.resumeLink = resumeLink;
    }

    if (user.role === "company") {
      const { companyWebsite, industry, companyLogo } = req.body;
      if (companyWebsite !== undefined) user.companyWebsite = companyWebsite;
      if (industry !== undefined) user.industry = industry;
      if (companyLogo !== undefined) user.companyLogo = companyLogo;
    }

    await user.save();

    const updatedUser = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "jobseeker") {
      await Application.deleteMany({ applicant: req.user.id });
    }

    if (user.role === "company") {
      const companyJobs = await Job.find({ postedBy: req.user.id }).select("_id");
      const jobIds = companyJobs.map((job) => job._id);
      await Application.deleteMany({ job: { $in: jobIds } });
      await Job.deleteMany({ postedBy: req.user.id });
    }

    await User.findByIdAndDelete(req.user.id);

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const regex = new RegExp(query, 'i');
    
    const users = await User.find({
      $or: [{ name: regex }, { email: regex }]
    }).select("name email role bio skills companyWebsite industry companyLogo profileViews createdAt");

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find user, increment profile views, and return public profile data
    const user = await User.findByIdAndUpdate(
      id,
      { $inc: { profileViews: 1 } },
      { new: true }
    ).select("name email role bio skills resumeLink companyWebsite industry companyLogo profileViews createdAt");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getProfile, updateProfile, deleteProfile, searchUsers, getUserProfile };