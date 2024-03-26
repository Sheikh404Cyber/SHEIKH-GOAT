const axios = require('axios');

module.exports = {
  config: {
    name: 'gemini',
    version: '1.0',
    author: 'Google',
    role: 0,
    category: '📖 | Education',
    shortDescription: {
      en: `Gemini: The Sign of the Twins, Where Duality Meets Brilliance

Gemini, the third sign of the zodiac, is a constellation of duality and versatility. The Twins, the symbol of this sign represent the contrasting and harmonizing sides of an individual. Explore the realm of Gemini, where intellect, communication, and changeability intertwine to create a vibrant tapestry of life. Discover the multifaceted nature of this sign, its strengths, weaknesses, and how it interacts with others. Unravel the intricacies of Geminis personality, motivations, and aspirations through insightful articles, horoscope analysis, and personal stories. This celestial haven is a reflection of the ever-changing nature of the human spirit, where ideas dance, emotions swirl, and possibilities flow. Welcome to Gemini: Where the Twins Embody the Synergy of Lifes Contrasting Facets.`
    },
    longDescription: {
      en: `Gemini: The Sign of the Twins, Where Duality Meets Brilliance

Gemini, the third sign of the zodiac, is a constellation of duality and versatility. The Twins, the symbol of this sign represent the contrasting and harmonizing sides of an individual. Explore the realm of Gemini, where intellect, communication, and changeability intertwine to create a vibrant tapestry of life. Discover the multifaceted nature of this sign, its strengths, weaknesses, and how it interacts with others. Unravel the intricacies of Geminis personality, motivations, and aspirations through insightful articles, horoscope analysis, and personal stories. This celestial haven is a reflection of the ever-changing nature of the human spirit, where ideas dance, emotions swirl, and possibilities flow. Welcome to Gemini: Where the Twins Embody the Synergy of Lifes Contrasting Facets.`
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
          `Asking Gemini. Please wait a moment...`,
          event.threadID
        );

        const apiUrl = `https://lianeapi.onrender.com/@hercai/api/gemini?key=j86bwkwo-8hako-12C&userName=${encodeURIComponent(name || "a user")}&query=${encodeURIComponent(query)}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.message) {
          const trimmedMessage = response.data.message.trim();
          api.setMessageReaction("✅", event.messageID, (err) => console.log(err), true);
          await api.sendMessage({ body: trimmedMessage }, event.threadID, event.messageID);

          console.log(`Sent Gemini's response to the user`);
        } else {
          throw new Error(`Invalid or missing response from Gemini API`);
        }

        await api.unsendMessage(processingMessage.messageID);
      }
    } catch (error) {
      console.error(`❌ | Failed to get Gemini's response: ${error.message}`);
      const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
      api.sendMessage(errorMessage, event.threadID);
    }
  },
};
