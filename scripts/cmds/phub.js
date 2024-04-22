const axios = require('axios');

module.exports = {
  config: {
    name: "phub",
    version: "1.0",
    author: "Samir Œ",
    shortDescription: "Search for videos on a popular adult website",
    longDescription: "Searches for videos on a popular adult website based on the provided query.",
    category: "⛔ | 18+",
    guide: {
      en: "{pn} [search query]"
    }
  },

  onStart: async function ({ api, args, event }) {
    try {
      const searchQuery = encodeURIComponent(args.join(" "));
      const apiUrl = `https://apis-samir.onrender.com/phub?search=${searchQuery}`;

      const response = await axios.get(apiUrl);

      if (response.data && response.data.length > 0) {
        const top5Results = response.data.slice(0, 5);
        let messageBody = "";

        top5Results.forEach((result, index) => {
          messageBody += `#${index + 1}: ${result.title}\n`;
          messageBody += `⏳ Duration: ${result.duration}\n`;
          messageBody += `🎑 Viewers: ${result.viewers}\n`;
          messageBody += `✨ Rating: ${result.rating}\n`;
          messageBody += `🙅🏻 URL: ${result.url}\n\n`;
        });

        await api.sendMessage({ body: messageBody }, event.threadID);
      } else {
        throw new Error("No videos found for the search query.");
      }
    } catch (error) {
      console.error("Error retrieving videos:", error.message);
      api.sendMessage({ body: "Failed to retrieve videos." }, event.threadID);
    }
  }
}; 
