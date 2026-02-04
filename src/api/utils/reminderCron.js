const cron = require("node-cron");
const { Reminder, User } = require("../models");
const { sendReminderEmail } = require("./mailer");
const { Op } = require("sequelize");

function startReminderCron() {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();
      const twoMinutesFromNow = new Date(now.getTime() + 2 * 60 * 1000);

      const reminders = await Reminder.findAll({
        where: {
          remindAt: {
            [Op.between]: [now, twoMinutesFromNow],
          },
        },
        include: [
          {
            model: User,
            attributes: ["email"],
          },
        ],
      });

      for (const r of reminders) {
        await sendReminderEmail(r.User.email, r.message);
        console.log("📧 Reminder email sent:", r.message);

        // prevent re-send (temporary approach)
        await r.update({
          remindAt: new Date("2099-01-01"),
        });
      }
    } catch (err) {
      console.error("❌ Reminder cron error:", err.message);
    }
  });

  console.log("⏰ Reminder cron started");
}

module.exports = { startReminderCron };
