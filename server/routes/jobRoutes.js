const express = require("express");
const router = express.Router();
const { createJob, getAllJobs, getRecommendedJobs, getMyJobs } = require("../controllers/jobController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/", protect, authorizeRoles("company"), createJob);
router.get("/", getAllJobs);
router.get("/recommended", protect, authorizeRoles("jobseeker"), getRecommendedJobs);
router.get("/my", protect, authorizeRoles("company"), getMyJobs);

module.exports = router;