import { createTransport } from "nodemailer";
import { resetPasswordHtml } from "../mails/resetPassword";
import { welcomeHtml } from "../mails/welcome";

const transporter = createTransport({
  host: "areskul.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "areskul",
    pass: "areskul",
  },
});

export const sendMail = async (html: string, receivers: string[]) => {
  await transporter.sendMail({
    from: '"Areskul" <service@areskul.com>', // sender address
    to: receivers, // list of receivers
    subject: "Hello", // Subject line
    text: "Hello world?", // plain text body
    html: html,
  });
};

export const sendResetPasswordMail = async (
  token: string,
  receivers: string[]
) => {
  const { html } = resetPasswordHtml(token);
  sendMail(html, receivers);
};

export const sendWelcomeMail = async (user: any, receivers: string[]) => {
  const { html } = welcomeHtml(user);
  sendMail(html, receivers);
};
