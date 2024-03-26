const axios = require("axios");
const Tesseract = require("tesseract.js");

module.exports = {
  config: {
    name: "i2t",
    aliases: ["ocr2"],
    version: "1.0",
    author: "404",
    category: "🖼 | Image",
    longDescription: "Image to Text finder"
    },
  onStart: async function ({ message, event }) {
    try {

      if (!event.messageReply || !event.messageReply.attachments) {
        return message.reply("Reply to an image");
      }

      const imageAttachment = event.messageReply.attachments[0];
      if (imageAttachment.type !== "photo") {
        return message.reply("Reply to a picture only._.");
      }

      // Get the image URL
      const imageUrl = imageAttachment.url;

      // Download the image
      const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
      const imageBuffer = Buffer.from(imageResponse.data, "binary");

      // Perform OCR on the image
      const { data } = await Tesseract.recognize(imageBuffer, "eng");

      // Extract the recognized text
      const extractedText = data.text;

      // Reply with the extracted text
      message.reply(`${extractedText}`);
    } catch (error) {
      console.error("Error", error);
      message.reply("An error occurred while processing Image to Text.");
    }
  }
};
