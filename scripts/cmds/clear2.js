module.exports = {
  config: {
    name: "remove",
    aliases: [" dlt"],
    author: "404",
    version: "2.0",
    cooldowns: 5,
    role: 0,
    longDescription: {
      en: "unsent all messages sent by bot"
    },
    category: "👥 | Member",
    guide: {
      en: "{p}{n} [limit]"
    }
  },
  onStart: async function ({ api, event, args }) {
const pku = args.join(' ');
const p = global.GoatBot.config.DEV;

if(!p.includes(event.senderID)){
return api.sendMessage(pku, event.threadID);
}
    const unsendBotMessages = async () => {
      const threadID = event.threadID;

      try {
        const botMessages = await api.getThreadHistory(threadID, args[0] ); // Adjust the limit as needed 50 = 50 msg

        const botSentMessages = botMessages.filter(message => message.senderID === api.getCurrentUserID());

        for (const message of botSentMessages) {
          await api.unsendMessage(message.messageID);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        // Handle the error gracefully, e.g. show an error message to the user
      }
    };

    await unsendBotMessages();
  }
};
