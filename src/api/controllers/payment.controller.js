const {Payment} = require('../models');

exports.createPayment = async (req, res) => {
    const payment = await Payment.create({ ...req.body, tenantId: req.user.id });
    res.status(201).json(payment);
};

exports.getPayments = async (req, res) => {
    const payments = await Payment.findAll({ where: { tenantId: req.user.id } });
    res.json(payments);
};

exports.getPaymentById = async (req, res) => {
    const payment = await Payment.findOne({ where: { id: req.params.id, tenantId: req.user.id } });
    if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
};

exports.updatePayment = async (req, res) => {
    const payment = await Payment.findOne({ where: { id: req.params.id, tenantId: req.user.id } }); 
    if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
    }
    await payment.update(req.body);
    res.json(payment);
};


exports.deletePayment = async (req, res) => {
    const payment = await Payment.findOne({ where: { id: req.params.id, tenantId: req.user.id } }); 
    if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
    }
    await payment.destroy();
    res.json({ message: 'Payment deleted successfully' });
};
