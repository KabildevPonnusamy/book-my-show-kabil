const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

class MailgunClient {
  static async sendMail(email, subject, text) {
    try {
      const data = await mg.messages.create(
        "sandbox0211c817ecc54aa59afec7bc0ca0938b.mailgun.org",
        {
          from: "Mailgun Sandbox <postmaster@sandbox0211c817ecc54aa59afec7bc0ca0938b.mailgun.org>",
          to: [email],
          subject: subject,
          text: text,
        },
      );

      console.log("Succes: ", data); // logs response data
    } catch (error) {
      console.log("Error: ", error); //logs any error
    }
  }
}

module.exports = MailgunClient;
