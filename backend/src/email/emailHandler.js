import { resendClient } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";
import { sender } from "../lib/resend.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome To Chat APP",
    html: createWelcomeEmailTemplate(name, clientURL),
  });
  if(error){
    console.error("Error Sending Welcome Email",error);
    throw new error("failed to send welcome email")
  }
  console.log("welcome Email Send Successfully",data)
};
