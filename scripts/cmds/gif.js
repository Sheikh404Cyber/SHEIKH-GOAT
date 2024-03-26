const axios = require('axios');

module.exports = {
  config: {
    name: "t2g",
    version: "1.0",
    author: "Samir Œ",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Create gif image."
    },
    longDescription: {
      vi: "",
      en: "Create gif image."
    },
    category: "🖼 | Image",
    guide: {
      vi: "{pn} < text >",
      en: "{pn} < text >"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const text = args.join(" ");
    if (!text) {
      return message.reply("Please provide a prompt.");
    }
   
    message.reply("Initializing image, please wait...", async (err, info) => {
      let id = info.messageID;
      try {
        const API = `https://gif.samirzyx.repl.co/t2g?q=${encodeURIComponent(text)}`;
        const imageStream = await global.utils.getStreamFromURL(API);
        message.unsend(id);
        message.reply({
          body: `  `,
          attachment: imageStream
        }, async (err, info) => {
        });
      } catch (error) {
        console.error(error);
        api.sendMessage(`Error: ${error}`, event.threadID);
      }
    });
  }
};
