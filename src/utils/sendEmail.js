import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";
dotenv.config();

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendMail = async (to, subject, html) => {
  try {
    const response = await emailApi.sendTransacEmail({
      sender: {
        email: process.env.SENDERS_EMAIL,
        name: process.env.SENDERS_NAME,
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    });

    console.log("✅ Email sent via Brevo API:", response.messageId);
    return response;
  } catch (error) {
    console.error("❌ Brevo API error:", error);
    throw error;
  }
};

export { sendMail };
