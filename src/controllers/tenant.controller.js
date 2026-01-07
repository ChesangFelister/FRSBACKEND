exports.home = async (req, res) => {
  res.json({
    property: "Assigned Property",
    rent: 15000,
    balance: 0
  });
};
