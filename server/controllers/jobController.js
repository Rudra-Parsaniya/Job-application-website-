const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");
const { validateJob } = require("../utils/validators");

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

    const errors = validateJob(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: errors[0] });
    }

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
      .populate("postedBy", "name industry companyWebsite")
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
    })
      .populate("postedBy", "name industry companyWebsite")
      .sort({ createdAt: -1 });

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

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "name industry companyWebsite bio"
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You did not post this job" });
    }

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

    const errors = validateJob({ ...job.toObject(), ...req.body });
    if (errors.length > 0) {
      return res.status(400).json({ message: errors[0] });
    }

    if (title) job.title = title;
    if (description) job.description = description;
    if (location) job.location = location;
    if (category) job.category = category;
    if (salary) job.salary = salary;
    if (jobType) job.jobType = jobType;
    if (experienceRequired !== undefined) job.experienceRequired = experienceRequired;
    if (skillsRequired !== undefined) job.skillsRequired = skillsRequired;

    await job.save();

    res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You did not post this job" });
    }

    await Application.deleteMany({ job: job._id });
    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createJob, getAllJobs, getRecommendedJobs, getMyJobs, getJobById, updateJob, deleteJob };