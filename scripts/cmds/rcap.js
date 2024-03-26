const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "caption",
    version: "1.0",
    author: "RUBISH",
    countDown: 0,
    role: 0,
    category: "👥 | Member",
    guide: "{p}caption [love, islamic, funny, birthday, sad]",
  },

  onStart: async function ({ api, event, args }) {
    let { threadID, messageID } = event;

    if (args.length > 0 && args[0] === 'help') {
      let helpMsg = `Usage: .caption [love, islamic, funny, birthday, sad]\n\nExample: {p}caption funny`;
      api.sendMessage(helpMsg, threadID);
      return;
    }

    const captionCategories = ['love', 'islamic', 'funny', 'birthday', 'sad'];

    const category = args[0] && captionCategories.includes(args[0].toLowerCase()) ? args[0].toLowerCase() : captionCategories[Math.floor(Math.random() * captionCategories.length)];

    try {
      let response = await axios.get(`https://caption-rubish-api.onrender.com/random_caption/${category}?apikey=rubish69`);
      let captionMsg = {
        body: response.data.caption,
      };

      api.sendMessage(captionMsg, threadID);
    } catch (error) {
      console.error('❌ | Error occurred while fetching the caption:', error);
      let errorMsg = '❌ | Error occurred while fetching the caption. Please try again later.';
      api.sendMessage(errorMsg, threadID);
    }
  },
};
