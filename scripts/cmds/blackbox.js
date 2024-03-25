const axios = require("axios");

module.exports = {
  config: {
    name: "blackboxv2",
    aliases: ["bbx"],
    version: "2.0",
    author: "Samir Thakuri",
    countDown: 5,
    role: 0,
    shortDescription: "📖 | Education",
    longDescription: "Featuring AI chatbot by blackbox, Generates creative answer.",
    category: "ai",
    guide: {
  en: "{pn} <question>",
    },
  },
  onStart: async function ({ message, event, args, commandName }) {
    const userID = event.senderID;
    const q = args.join(" ");

    try {
      const response = await axios.get("https://api-samir.restfulapi.repl.co/ask", {
        params: {
          q: q,
          apikey: "samirey"
        }
      });

      message.reply(
        {
          body: `${response.data.message}`
        },
        (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID
          });
        }
      );
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
  onReply: async function ({ message, event, Reply, args }) {
    let { author, commandName, messageID } = Reply;
    if (event.senderID != author) return;
    
    const q = args.join(" ");

    try {
      const response = await axios.get("https://api-samir.restfulapi.repl.co/ask", {
        params: {
          q: q,
          apikey: "samirey"
        }
      });

      message.reply(
        {
          body: `${response.data.message}`
        },
        (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID
          });
        }
      );
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
