const Application = require("../models/Application");
const Job = require("../models/Job");
const { validateApplication } = require("../utils/validators");

const applyToJob = async (req, res) => {
  try {
    const { jobId, coverNote } = req.body;

    const errors = validateApplication({ jobId });
    if (errors.length > 0) {
      return res.status(400).json({ message: errors[0] });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });

    if (existingApplication) {
      return res.status(400).json({ message: "You already applied to this job" });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: req.user.id,
      coverNote: coverNote || "",
    });

    res.status(201).json({
      message: "Applied successfully",
      application: newApplication,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You did not post this job" });
    }

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email phone skills resumeLink bio")
      .sort({ createdAt: -1 });

    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const validStatuses = ["Applied", "Interview", "Rejected", "Offer"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(applicationId).populate("job");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to update this application" });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      message: "Application status updated",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate({
        path: "job",
        select: "title location salary jobType",
        populate: { path: "postedBy", select: "name" },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { applyToJob, getApplicantsForJob, updateApplicationStatus, getMyApplications };
