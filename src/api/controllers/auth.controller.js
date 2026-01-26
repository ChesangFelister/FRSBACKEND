const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');


exports.register = async (req, res) => {
    const { fullname, email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ fullname, email, password: hashed, role });
    res.status(201).json(user);
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
};

exports.getProfile = async (req, res) => {
    const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] },
    });
    res.json(user);
};
exports.updateProfile = async (req, res) => {
    const { fullname, email, password } = req.body;
    const user = await User.findByPk(req.user.id);
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;  
    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }
    await user.save();
    res.json({ message: 'Profile updated successfully' });
};