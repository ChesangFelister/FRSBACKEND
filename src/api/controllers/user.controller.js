const { user } = require("../models");

const SAFE_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "avatarUrl"
];

/* ---------------- GET PROFILE ---------------- */
exports.getUserProfile = async (req, res) => {
  try {
    const userProfile = await user.findByPk(req.user.id, {
      attributes: {
        exclude: ["password", "resetToken", "resetTokenExpiry"]
      }
    });

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(userProfile);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------- UPDATE PROFILE ---------------- */
exports.updateUserProfile = async (req, res) => {
  try {
    const userProfile = await user.findByPk(req.user.id);

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔐 Only allow safe fields
    const updates = {};
    SAFE_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    await userProfile.update(updates);

    res.json({
      message: "Profile updated successfully",
      user: {
        id: userProfile.id,
        fullname: `${userProfile.firstName} ${userProfile.lastName}`,
        email: userProfile.email,
        role: userProfile.role,
        avatarUrl: userProfile.avatarUrl
      }
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUserProfile = async (req, res) => {
  try {
    const userProfile = await user.findByPk(req.user.id);

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    await userProfile.destroy();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
