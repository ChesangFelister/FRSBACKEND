const {user} = require('../models');

exports.getUserProfile = async (req, res) => {  
    const userProfile = await user.findOne({ where: { id: req.user.id } });
    if (!userProfile) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(userProfile);
};

exports.updateUserProfile = async (req, res) => {
    const userProfile = await user.findOne({ where: { id: req.user.id } });
    if (!userProfile) {
        return res.status(404).json({ message: 'User not found' });
    }
    await userProfile.update(req.body);
    res.json(userProfile);
};

exports.deleteUserProfile = async (req, res) => {
    const userProfile = await user.findOne({ where: { id: req.user.id } }); 
    if (!userProfile) {
        return res.status(404).json({ message: 'User not found' });
    }
    await userProfile.destroy();
    res.json({ message: 'User deleted successfully' });
};