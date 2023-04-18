import axios from "axios";

export function sendEmail(emailData) {
  axios
    .post("/api/nodemailer", {
      to: emailData.email,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    })
    .then((r) => console.log(r))
    .catch((e) => console.log(e));
}
