const axios = require('axios');

module.exports = {
  config: {
    name: "cassandra",
    version: '1.0.0',
    countDown: 5,
    longDescription: {
      en: "Ask Cassandra a question."
    },
    guide: { 
      en: "{p}cassandra <question>" 
    },
    role: 0, // 0 - Everyone, 1 - Admin
    category: "📖 | Education",
    author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
  },
  
  onStart: async function({ api, event, args, message }) {
    const question = args.join(' ');

    if (!question) {
      message.reply("Please provide a question after the command using the query parameter.");
      return;
    }

    try {
      const response = await axios.get(`https://lianeapi.onrender.com/@LianeAPI_Reworks/api/cassandra?query={question}`);
      const message = response.data.raw;

       await api.sendMessage(`CASSANDRA AI\n\n${message}`, event.threadID);
    } catch (error) {
      console.error('Error asking CASSANDRA:', error.message);
      message.reply('An error occurred while asking CASSANDRA.');
    }
  },
};
