const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, deleteProfile, searchUsers, getUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Note: /search must come before /:id so it doesn't get treated as an id
router.get("/search", protect, searchUsers);
router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);
router.delete("/me", protect, deleteProfile);
router.get("/:id", protect, getUserProfile);

module.exports = router;