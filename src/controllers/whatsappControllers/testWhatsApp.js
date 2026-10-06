import axios from "axios";

export const testWhatsApp = async (req, res) => {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/vXX.X/${process.env.WHATSAPP_PHONE_NUMBER_ID}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`,
        },
      }
    );

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};