const axios = require("axios");

module.exports = {
  config: {
    name: "totalvirus",
    aliases: ['virus'],
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "Check if the URL is malicious or not.",
    longDescription: "Check if the URL is malicious or not.",
    category: "👑 | Robot-Owner",
    guide: {
      en: "{p}{n} [URL]",
    }
  },

  onStart: async function ({ api, event, args }) {
    // Redundant import of axios and child_process modules
    // const axios = require("axios");
    const { execSync } = require('child_process');

    let { threadID, messageID } = event;
    const response = args.join(" ");
    if (!response) return api.sendMessage("PREFIX: totalvirus [URL]", threadID, messageID);

    try {
      const res = await axios.get(`https://totalvirusapi-2.ryywuuu.repl.co/check?url=${response}`);
      const { success, message, reports } = res.data;

      if (success) {
        api.sendMessage("⏳ Scanning for results...", threadID, messageID);
        api.setMessageReaction("⏳", event.messageID, (err) => {
          if (err) {
            console.error("Error setting reaction:", err);
          }
        });

        setTimeout(() => {
          api.sendMessage(`🤖 ${message}\nReports: ${reports}`, threadID, messageID);

          if (message.includes("potentially malicious")) {
            api.setMessageReaction("⚠", event.messageID, (err) => {
              if (err) {
                console.error("Error setting reaction:", err);
              }
            });
          } else if (message.includes("safe")) {
            api.setMessageReaction("✅", event.messageID, (err) => {
              if (err) {
                console.error("Error setting reaction:", err);
              }
            });
          }
        }, 6000);
      } else {
        api.sendMessage(`🤖 API Error: ${message}`, threadID, messageID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while making the API request.", threadID, messageID);
    }
  }
};
