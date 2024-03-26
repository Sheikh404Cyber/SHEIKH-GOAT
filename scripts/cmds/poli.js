const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  config: {
    name: "poli",
    aliases: ['polination'],
    version: "1.1",
    author: "samir",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: 'Text to Image'
    },
    longDescription: {
      en: "generate image from polination"
    },
    category: "🖼 | Image",
    guide: "{pn} your prompt ",
  },

  onStart: async ({ api, event, args }) => {
    let { threadID, messageID } = event;
    let query = args.join(" ");
    if (!query) return api.sendMessage("put text/query", threadID, messageID);

    let dir = path.join(__dirname, "cache"); // Use path.join() to create the cache directory
    fs.ensureDirSync(dir); // Create the directory if it doesn't exist

    let filePath = path.join(dir, "poli.png");

    try {
      const poli = (await axios.get(`https://image.pollinations.ai/prompt/${query}`, {
        responseType: "arraybuffer",
      })).data;

      fs.writeFileSync(filePath, Buffer.from(poli, "utf-8"));

      api.sendMessage({
        body: "Image will be deleted after 1 hour!",
        attachment: fs.createReadStream(filePath)
      }, threadID, () => {
        fs.unlinkSync(filePath);
      }, messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while generating the image.", threadID, messageID);
    }
  },
};
