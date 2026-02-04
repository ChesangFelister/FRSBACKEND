const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendReminderEmail = async (to, reminder) => {
  await transporter.sendMail({
    from: `"Property Manager" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Reminder: ${reminder.title}`,
    html: `
      <h3>${reminder.title}</h3>
      <p>Date: ${reminder.date}</p>
      <p>Time: ${reminder.time}</p>
      <p>${reminder.description}</p>
    `,
  });
};
