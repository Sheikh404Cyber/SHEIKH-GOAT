
const axios = require("axios");

module.exports = {
  config: {
    name: 'maya',
    version: '1.2',
    author: 'KENLIEPLAYS',
    countDown: 0,
    role: 0,
    shortDescription: 'maya ChatBot by Simsimi.fun',
    longDescription: {
      en: 'Chat with maya',
      ph: 'Kausapin si maya'
    },
    category: '🗨 | Ai-Chat',
    guide: {
      en: '   {pn} maya <word>: chat with maya'
        + '\n   Example: {pn} maya hi',
      ph: '   {pn} maya <salita>: makipag-chat kay maya'
        + '\n   Halimbawa: {pn} maya kamusta'
    }
  },

  langs: {
    en: {
      chatting: 'Already chatting with bby...',
      error: 'UNeXPECTED ERROR - 404⚠?'
    },
    ph: {
      chatting: 'Kasalukuyang kausap si bby...',
      error: 'Ano?'
    }
  },

  onStart: async function ({ args, message, event, getLang }) {
    if (args[0] === '-' && args[1]) {
      const userLangCode = this.detectLanguage(args.slice(2));
      const yourMessage = args.slice(2).join(" ");

      try {
        const responseMessage = await this.getMessage(yourMessage, userLangCode);
        return message.reply(responseMessage);
      } catch (err) {
        console.error('Error during onStart:', err);
        return message.reply(getLang("error"));
      }
    }
  },

  onChat: async function ({ args, message, event, getLang }) {
    if (args[0].trim().toLowerCase().startsWith('maya') && args.length > 1) {
      const userLangCode = this.detectLanguage(args.slice(1));

      try {
        const responseMessage = await this.getMessage(args.slice(1).join(" "), userLangCode);
        return message.reply(responseMessage);
      } catch (err) {
        console.error('Error during onChat:', err);
        return message.reply(getLang("error"));
      }
    }
  },

  detectLanguage: function (words) {
    // Implement language detection logic here
    // For flexibility, you can use a language detection library like franc.js
    // For simplicity, let's assume the first word starting with '-' is in English, else Filipino
    const firstWord = words.find(word => word.startsWith('maya')) || '';
    return firstWord.startsWith('maya') ? 'en' : 'bn';
  },

  getMessage: async function (yourMessage, langCode) {
    try {
      const res = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=${langCode}&message=${yourMessage}&filter=false`);
      if (!res.data.success) {
        throw new Error('API returned a non-successful message');
      }
      return res.data.success;
    } catch (err) {
      console.error('Error while getting a message:', err);
      throw err;
    }
  }
};
