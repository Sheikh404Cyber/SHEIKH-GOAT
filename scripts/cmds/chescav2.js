const axios = require('axios');

module.exports = {
  config: {
    name: 'chesca',
    version: '2.5',
    author: 'JV Barcenas && LiANE For ChescaAI', // do not chang
    role: 0,
    category: '📖 | Education',
    shortDescription: {
      en: 'Baliw na babaeng ai',
    },
    longDescription: {
      en: 'Baliw na babaeng ai',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },
  onStart: async function (context) {
    const { api, event } = context;

    try {
      //const prompt = event.body.trim();
      const [cmd, ...args] = event.body.split(" ");
      const prompt = args.join(" ");
      if (prompt) {


        const response = await axios.get(`https://lianeapi.onrender.com/` + `ask/chescav2?query=${encodeURIComponent(prompt)}`);

        if (response.data) {
          const messageText = response.data.message;
          await api.sendMessage(messageText, event.threadID, event.messageID);

          console.log('Sent answer as a reply to the user');
        } else {
          throw new Error('Invalid or missing response from API');
        }
      }
    } catch (error) {
      console.error(`Failed to get an answer: ${error.message}`);
      api.sendMessage(
        `${error.message}.\n\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`,
        event.threadID
      );
    }
  },
  run: async function (context) {
    module.exports.onStart(context);
  }
};
