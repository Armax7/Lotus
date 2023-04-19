import axios from "axios";

export function sendEmail(emailData) {
  const email = axios
    .post("/api/nodemailer", {
      to: emailData.email,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    })
    .then((r) => {
      console.log(r);
      return { success: r };
    })
    .catch((e) => console.log(e));
  return email;
}
