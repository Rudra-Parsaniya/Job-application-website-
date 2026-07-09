const Job = require("../models/Job");
const User = require("../models/User");

const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      category,
      salary,
      jobType,
      experienceRequired,
      skillsRequired,
    } = req.body;

    const newJob = await Job.create({
      title,
      description,
      location,
      category,
      salary,
      jobType,
      experienceRequired,
      skillsRequired,
      postedBy: req.user.id,
    });

    res.status(201).json({
      message: "Job posted successfully",
      job: newJob,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const { search, category, location, jobType, page, limit } = req.query;

    const query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (category) {
      query.category = category;
    }
    if (location) {
      query.location = location;
    }
    if (jobType) {
      query.jobType = jobType;
    }

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 5;
    const skip = (pageNumber - 1) * limitNumber;

    const jobs = await Job.find(query)
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 });

    const totalJobs = await Job.countDocuments(query);

    res.status(200).json({
      jobs,
      totalJobs,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalJobs / limitNumber),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getRecommendedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.skills || user.skills.trim() === "") {
      return res.status(200).json({
        jobs: [],
        message: "Add skills to your profile to get job recommendations",
      });
    }

    const skillsArray = user.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    const regexPattern = skillsArray.join("|");

    const jobs = await Job.find({
      skillsRequired: { $regex: regexPattern, $options: "i" },
    }).sort({ createdAt: -1 });

    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createJob, getAllJobs, getRecommendedJobs, getMyJobs };