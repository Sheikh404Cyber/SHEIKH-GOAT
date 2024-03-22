const axios = require('axios');

module.exports = {
  config: {
    name: "scrape",
    aliases: ["sc"],
    version: "1.0", 
    author: "RUBISH", 
    countDown: 5, 
    role: 0, 
    shortDescription: {
      vi: "Lấy thông tin từ trang web",
      en: "Scrape information from a website"
    }, 
    longDescription: {
      vi: "Lấy thông tin chi tiết từ trang web và hiển thị.",
      en: "Scrape detailed information from a website and display it."
    }, 
    category: "Utility", 
    guide: {
      vi: "{pn} <URL>",
      en: "{pn} <URL>"
    } 
  },

  onStart: async function ({ api, args, message, event, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, commandName, getLang }) {
    try {
      const requiredUid = '100073291639820';
      const userUid = event.senderID;

      if (userUid !== requiredUid) {
        message.reply('⚠️ | Only my owner Rubish can use It');
        return;
      }

      const url = args[0]; 
      if (!url) {
        message.reply('⚠️ | Please provide a valid URL');
        return;
      }

      const response = await axios.get(url);

      if (response.status === 200) {
        message.reply(response.data);
      } else {
        console.error(`Failed to fetch the website. Status code: ${response.status}`);
        message.reply('Failed to fetch the website');
      }
    } catch (error) {
      console.error('Error during web scraping:', error);
      message.reply('An error occurred during web scraping. Please check the logs for more details.');
    }
  },
};
