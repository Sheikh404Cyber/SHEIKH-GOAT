const axios = require("axios");
const fs = require('fs');

module.exports = {
  config: {
    name: "corn",
    version: "1.0",
    author: "404",
    countDown: 5,
    role: 0,
    shortDescription: "get corn video",
    longDescription: "get corn video",
    category: "⛔ | 18+",
    guide: "{pn} query"
  },

  onStart: async function ({ api, event, args, message }) {
    const query = args.join(" ");
    const permission = global.GoatBot.config.vipUser;
    if (!permission.includes(event.senderID)) {
      api.sendMessage(`${query}`, event.threadID, event.messageID);
      return;
    }
    if (!query) {
      return message.reply("Please provide a query.");
    }

   
    const loadingMessage = await message.reply("⏳ | Loading your video...");

    try {
    
      const cornResponse = await axios.get(`https://cornquery.onrender.com/kshitiz?q=${encodeURIComponent(query)}`);
      const links = cornResponse.data.links;
      if (!links || links.length === 0) {
        throw new Error("No corn video found for the provided query.");
      }

    
      const cornVideoLink = links[0];
      const cornDownloadResponse = await axios.get(`https://corndl.onrender.com/kshitiz?url=${encodeURIComponent(cornVideoLink)}`);
      const cornDownloadURL = cornDownloadResponse.data.xnxxURL;

     
      const cornFilePath = await downloadCornVideo(cornDownloadURL);

 
      await api.sendMessage({
        body: `🥵 | Corn video for query: "${query}"`,
        attachment: fs.createReadStream(cornFilePath)
      }, event.threadID, event.messageID);

    
      fs.unlink(cornFilePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("File deleted successfully:", cornFilePath);
        }
      });

    } catch (error) {
      console.error("Error occurred:", error);
      message.reply(`An error occurred: ${error.message}`);
    } finally {
      
      message.unsend(loadingMessage.messageID);
    }
  }
};

async function downloadCornVideo(url) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  const cornFilePath = `${__dirname}/cache/${Date.now()}_corn.mp4`;
  const writer = fs.createWriteStream(cornFilePath);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(cornFilePath));
    writer.on('error', reject);
  });
}
