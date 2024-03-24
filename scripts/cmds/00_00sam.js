const axios = require("axios");

module.exports = {
  config: {
    name: 'sam',
    aliases: ["sheikh"],
    version: '3.0',
    author: 'RUBISH',
    countDown: 0,
    role: 0,
    shortDescription: 'AI CHAT',
    longDescription: {
      vi: 'Chat with Sheikh',
      en: 'Chat with Sam'
    },
    category: '🗨 | Ai-Chat',
    guide: {
      vi: '   {pn} Hi  ',
        
      en: '   {pn} Hi '
      
    }
  },

  onReply: async function ({ api, event, handleReply }) {
    if (event.type == "message_reply") {
      const reply = event.body.toLowerCase();
      if (isNaN(reply)) {
        try {
          const response = await axios.get(`https://simma-chat-rubish.onrender.com/chat?message=${encodeURIComponent(reply)}`);
          const ok = response.data.response;
          await api.sendMessage(ok, event.threadID, (error, info) => {
            global.GoatBot.onReply.set(info.messageID, {
              commandName: this.config.name,
              type: 'reply',
              messageID: info.messageID,
              author: event.senderID,
              link: ok
            });
          }, event.messageID);
        } catch (error) {
          console.error(error);
        }
      }
    }
  },

  onStart: async function ({ api, args, event }) {
    try {
      const rubish = args.join(" ").toLowerCase();
      if (!args[0]) {
        api.sendMessage(
          "Hello I'm Sheikh\n\nHow can I assist you?",
          event.threadID,
          event.messageID
        );
        return;
      }
      if (rubish) {
        const response = await axios.get(`https://simma-chat-rubish.onrender.com/chat?message=${encodeURIComponent(rubish)}`);
        const mg = response.data.response;
        await api.sendMessage({ body: mg }, event.threadID, (error, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: 'reply',
            messageID: info.messageID,
            author: event.senderID,
            link: mg
          });
        }, event.messageID);
      }
    } catch (error) {
      console.error(`Failed to get an answer: ${error.message}`);
      api.sendMessage(`${error.message}.\nAn error`, event.threadID, event.messageID);
    }
  }
};
