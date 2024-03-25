const axios = require('axios');

module.exports = {
  config: {
    name: 'cassandraV2',
    version: '1.0',
    author: 'LiANE @nealianacagara',
    role: 0,
    category: '📖 | Education',
    shortDescription: {
      en: `Cassandra is kinda moody but shes fun to talk with!`
    },
    longDescription: {
      en: `Cassandra is kinda moody but shes fun to talk with!`
    },
    guide: {
      en: '{pn} [query]'
    },
  },

  onStart: async function ({ api, event, args, usersData }) {
    try {
      const query = args.join(" ") || "hello";
      const { name } = (await usersData.get(event.senderID));

      if (query) {
        api.setMessageReaction("⏳", event.messageID, (err) => console.log(err), true);
        const processingMessage = await api.sendMessage(
          `Asking 🎁 Cassandra (v2). Please wait a moment...`,
          event.threadID
        );

        const apiUrl = `https://lianeapi.onrender.com/@LianeAPI_Reworks/api/cassandraV2?key=j86bwkwo-8hako-12C&userName=${encodeURIComponent(name || "a user")}&query=${encodeURIComponent(query)}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.message) {
          const trimmedMessage = response.data.message.trim();
          api.setMessageReaction("✅", event.messageID, (err) => console.log(err), true);
          await api.sendMessage({ body: trimmedMessage }, event.threadID, event.messageID);

          console.log(`Sent 🎁 Cassandra (v2)'s response to the user`);
        } else {
          throw new Error(`Invalid or missing response from 🎁 Cassandra (v2) API`);
        }

        await api.unsendMessage(processingMessage.messageID);
      }
    } catch (error) {
      console.error(`❌ | Failed to get 🎁 Cassandra (v2)'s response: ${error.message}`);
      const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
      api.sendMessage(errorMessage, event.threadID);
    }
  },
};
