const express = require("express");
const router = express.Router();
const { createJob, getAllJobs, getRecommendedJobs, getMyJobs, getJobById, updateJob, deleteJob } = require("../controllers/jobController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/", protect, authorizeRoles("company"), createJob);
router.get("/", getAllJobs);
router.get("/recommended", protect, authorizeRoles("jobseeker"), getRecommendedJobs);
router.get("/my", protect, authorizeRoles("company"), getMyJobs);
router.put("/:id", protect, authorizeRoles("company"), updateJob);
router.delete("/:id", protect, authorizeRoles("company"), deleteJob);

module.exports = router;