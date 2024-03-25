const axios = require('axios');

module.exports = {
  config: {
    name: "chesca",
    version: "1.0",
    longDescription: {
      en: "Ask Chesca a question."
    },
    guide: { 
      en: "{p}chesca <question>" 
    },
    role: 0, // 0 - Everyone, 1 - Admin
    category: "📖 | Education",
    author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗"
  },
  onStart: async function({ api, event, args, message }) {
    const question = args.join(' ');

    if (!question) {
      message.reply("Please provide a question after the command using the query parameter.");
      return;
    }

    try {
      const response = await axios.get(`https://lianeapi.onrender.com/ask/chesca?query=${question}`);
      const message = response.data.messageOld;
      const note = response.data.note;

       await api.sendMessage(`${message}\n\n${note}`, event.threadID);
    } catch (error) {
      console.error('Error asking Chesca:', error.message);
      message.reply('An error occurred while asking Chesca.');
    }
  },
};
