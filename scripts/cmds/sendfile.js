const fs = require('fs');

module.exports = {
  config: {
    name: "sendfile",
    version: "1.0",
    author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
    countDown: 5,
    role: 2,
    shortDescription: "Send bot script",
    longDescription: "Send bot specified file ",
    category: "👑 | Robot-Owner",
    guide: "{pn} file name. Ex: .{pn} filename"
  },

  onStart: async function ({ message, args, api, event }) {
    const per = global.GoatBot.config.GOD;
  if (!per.includes(event.senderID)) {
    api.sendMessage("You don't have enough permission to use this cmd. Only my Author and Admin Bot can use this.", event.threadID, event.messageID);
    return;
  }

    const fileName = args[0];
    if (!fileName) {
      return api.sendMessage("Please provide a file name.", event.threadID, event.messageID);
    }

    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`File not found: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
  }
};
