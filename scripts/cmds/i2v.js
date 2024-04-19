const tinyurl = require('tinyurl');
const axios = require("axios");
const fs = require("fs");

let imageUrl;
let sauceUrl;

/*Do not change
        the credit 🐢👑*/

module.exports = {
  config: {
    name: "i2v",
    version: "1.0",
    author: "rehat--",
    role: "0",
    category: "anime",
    guide: {
      en: "{pn} reply_image"
    },
    longDescription: {
      en: "Search anime sauce by replying to an image"
    },
  },

  onStart: async function ({ message, args, event, api }) {
    
       if (event.type === "message_reply") {
      const replyAttachment = event.messageReply.attachments[0];

      if (["photo", "sticker"].includes(replyAttachment?.type)) {
        imageUrl = replyAttachment.url;
      } else {
        return api.sendMessage(
          { body: "❌ | Reply must be an image." },
          event.threadID
        );
      }
    } else if (args[0]?.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/g)) {
      imageUrl = args[0];
    } else {
      return api.sendMessage({ body: "❌ | Reply to an image." }, event.threadID);
    }

    const url = await tinyurl.shorten(imageUrl);
    const replyMessage = await message.reply("Please wait...⏳");

    try {
      const response = await axios.get(`https://turtle-apis.onrender.com/api/sauce?url=${url}`);
      const result = response.data.result;
      const title = result.title;
      const similarity = result.similarity;
      
      message.reply({
        body: `Name: ${title}\nSimilarity: ${similarity}`,
        attachment: await global.utils.getStreamFromURL(result.video),
      });
    } catch (err) {
      message.unsend(replyMessage);
      message.reply(err.message);
      console.log(err);
    }
  },
}; 
