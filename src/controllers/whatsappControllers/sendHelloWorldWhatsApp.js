import { sendWhatsAppTemplate } from "../../utils/sendWhatsApp.js";

export const sendHelloWorldWhatsApp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const response = await sendWhatsAppTemplate({
      to: phone,
      messages: [], // hello_world has no {{1}}, {{2}} etc.
      templateName: "hello_world",
      languageCode: "en_US",
    });

    return res.status(200).json({
      success: true,
      message: "WhatsApp message sent successfully",
      data: response,
    });
  } catch (error) {
    console.error("WhatsApp Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to send WhatsApp message",
    });
  }
};