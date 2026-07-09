const express = require("express");
const router = express.Router();
const {
  applyToJob,
  getApplicantsForJob,
  updateApplicationStatus,
  getMyApplications,
} = require("../controllers/applicationController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/", protect, authorizeRoles("jobseeker"), applyToJob);
router.get("/my", protect, authorizeRoles("jobseeker"), getMyApplications);
router.get("/job/:jobId", protect, authorizeRoles("company"), getApplicantsForJob);
router.put("/:applicationId/status", protect, authorizeRoles("company"), updateApplicationStatus);

module.exports = router;