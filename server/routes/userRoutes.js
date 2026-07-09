const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, deleteProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);
router.delete("/me", protect, deleteProfile);

module.exports = router;