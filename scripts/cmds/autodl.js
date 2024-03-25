const axios = require('axios');
const fs = require('fs');
const { shortenURL } = global.utils;
module.exports = {
  config: {
    name: "autodl", 
    version: "1.0.1",
    author: "Dipto",
    countDown: 0,
    role: 0,
    description: {
      en: "Auto download video from tiktok, facebook, Instagram, YouTube, and more"
    },
    category: "⏳ | Downloader",
    guide: {
      en: "[video_link]"
    }
},
  onStart: async function(){},
  onChat: async function ({ api, event }) {

let dipto = event.body ? event.body : '';

  try {
    if (dipto.startsWith('https://vt.tiktok.com') || dipto.startsWith('https://www.tiktok.com/') || dipto.startsWith('https://www.facebook.com') || dipto.startsWith('https://www.instagram.com/') || dipto.startsWith('https://youtu.be/') || dipto.startsWith('https://youtube.com/') || dipto.startsWith('https://x.com/') || dipto.startsWith('https://twitter.com/') || dipto.startsWith('https://vm.tiktok.com') || dipto.startsWith('https://fb.watch')){

      api.setMessageReaction("⏳", event.messageID, (err) => {}, true);

    const path = __dirname + `/cache/diptoo.mp4`;

    const { data } = await axios.get(`https://noobs-apihouse.onrender.com/dipto/aldl?url=${encodeURIComponent(dipto)}`);

    const vid = (await axios.get(data.result, { responseType: "arraybuffer", })).data;

    fs.writeFileSync(path, Buffer.from(vid, 'utf-8'));
       api.setMessageReaction("✅", event.messageID, (err) => {}, true);

    api.sendMessage({

        body: `𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐯𝐢𝐝𝐞𝐨 𝐜𝐨𝐦𝐩𝐢𝐥𝐚𝐭𝐞☺︎︎😘`,

      attachment: fs.createReadStream(path)
    }, event.threadID, () => fs.unlinkSync(path), event.messageID)}

if (dipto.startsWith('https://i.imgur.com')){

  const dipto3 = dipto.substring(dipto.lastIndexOf('.'));

  const response = await axios.get(dipto, { responseType: 'arraybuffer' });

const filename = __dirname + `/cache/dipto${dipto3}`;

    fs.writeFileSync(filename, Buffer.from(response.data, 'binary'));
    api.sendMessage({body: `✅ | Downloaded from link`,attachment: fs.createReadStream(filename)},event.threadID,

  () => fs.unlinkSync(filename),event.messageID)

}

} catch (e) {
    api.setMessageReaction("❎", event.messageID, (err) => {}, true);
api.sendMessage(e, event.threadID, event.messageID);
  }
  },
}
