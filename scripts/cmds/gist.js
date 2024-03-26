const axios = require("axios");
const fs = require("fs").promises;

module.exports = {
  config: {
    name: "gist",
    version: "1.0",
    author: "JARiF@Cock",
    countDown: 2,
    role: 0,
    category: "👑 | Robot-Owner",
    guide: {
      vi: "{pn} text",
      en: "{pn} create <text> or {pn} fileName"
    }
  },
  onStart: async function ({ event, args, message, api }) {
    const cat = args.join(' ');
    const permission = global.GoatBot.config.DEV;

    if (!permission.includes(event.senderID)) {
      api.sendMessage(cat, event.threadID, event.messageID);
      return;
    }

    const subCommand = args[0];

    try {
      if (subCommand === 'create') {
        const content = args.slice(1).join(' ');

        const postData = {
          content: content
        };

        const response = await axios.post('https://gistbin.onrender.com/gist', postData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const file = response.data.rawUrl;
        message.reply(file);
      } else if (subCommand === 'collect') {
        const collectName = args[1]; 
        const filePath = `${collectName}`;

        const data = await fs.readFile(filePath, "utf8");
        const postData = {
          content: data
        };

        const response = await axios.post('https://gistbin.onrender.com/gist', postData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const file2 = response.data.rawUrl;
        message.reply(file2);
      } else {
        const name = args[0];
        const filePath = `./scripts/cmds/${name}.js`;

        const data = await fs.readFile(filePath, "utf8");
        const postData = {
          content: data
        };

        const response = await axios.post('https://gistbin.onrender.com/gist', postData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const file2 = response.data.rawUrl;
        message.reply(file2);
      }
    } catch (error) {
      message.reply(error.message);
      console.error(error);
    }
  }
};
