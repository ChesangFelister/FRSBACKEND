const User = require("../models/User");

exports.overview = async (req, res) => {
  const users = await User.count();
  res.json({
    users,
    properties: 0,
    reports: 0
  });
};

// --- IGNORE ---
