const { createReadStream, unlinkSync, createWriteStream } = require("fs-extra");
const { resolve } = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "mizuki",
    aliases: ['sim2', 't2a', 'simsimi2'],
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "Ask simsimi in voice",
    longDescription: {
      en: "Chat with simsimi in voice"
    },
    category: "🗨 | Ai-Chat",
    guide: {
      en: "{pn} <query>"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    try {
      const query = args.join(' ');
      const response = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=bn&message=${encodeURIComponent(query)}&filter=true`);
      const simsimiResponse = response.data.success;
      const simsimiMessage = simsimiResponse;
      const path = resolve(__dirname, "cache", `${event.threadID}_${event.senderID}.mp3`);

      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(simsimiMessage)}&tl=bn&client=tw-ob`;
      const responseStream = await axios({
        method: "GET",
        url,
        responseType: "stream",
      });

      const writer = responseStream.data.pipe(createWriteStream(path));
      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      api.sendMessage(
        { attachment: createReadStream(path) },
        event.threadID,
        () => unlinkSync(path)
      );
    } catch (error) {
      console.error(error);
      api.sendMessage("System Busy!! My Developer Is Fixing It....", event.threadID);
    }
  }
};
