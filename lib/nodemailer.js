const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, REFRESH_TOKEN } = process.env;

const oAuthClient = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

oAuthClient.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendMail(e_to, e_subject, e_text, e_html) {
  try {
    const accesToken = await oAuthClient.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "lotus.art.gallery.mail@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accesToken,
      },
    });
    const mailOptions = {
      from: "Lotus <lotus.art.gallery.mail@gmail.com>",
      to: e_to,
      subject: e_subject,
      text: e_text,
      html: e_html,
    };
    const result = await transporter.sendMail(mailOptions);

    if (!result.messageId) throw Error("The email wasn't sent");

    console.log("Message sent: %s", result.messageId);
    return result;
  } catch (error) {
    console.log(error)
  }
}