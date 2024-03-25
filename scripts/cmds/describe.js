const axios = require("axios");
module.exports = {
  config: {
    name: "describe",
    aliases: [ "prompt", "getprompt"],
    version: "1.0",
    author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
    countDown: 5,
    role: 0,
    shortDescription: "Prompt Generator.",
    longDescription: "Generate prompt to create an ai based image.",
    category: "📖 | Education",
    guide: "{pn} [query]",
  },
  onStart: async function ({ event, message, args, api }) {
    try {
    const query = args.join(' ');

    if (!query) {
      return api.sendMessage("Please type a query!", event.threadID, event.messageID);
    } else {
        const creatingMessage = await message.reply("Generating Prompt");
        try {
          const response = await axios.get(
            `https://sandipapi.onrender.com/prompt?about=${encodeURIComponent(query)}`
          );
          const prompt = response.data.prompt;
          if (prompt) {
            message.reply(`${prompt}`);
          } else {
            message.reply("Failed to get a prompt from the query.");
          }
        } catch (error) {
          console.error(error);
          message.reply("Encountered the internal server error.");
        }
        api.unsendMessage(creatingMessage.messageID);
      }
    } catch (error) {
      console.error(error);
      message.reply("An error occurred.");
    }
  },
};
