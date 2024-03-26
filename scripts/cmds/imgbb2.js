const dipto = require('axios');

module.exports = {
config: {
    name: 'imgbb2',
    version: '6.9',
    role: 0,
    author: 'dipto',
    longDescription: 'Upload image to imgbb and return link!',
    category: '👥 | Member',
    guide: '[reply | link]',
    countDown: 2
},

onStart: async function({ api, event, message, args }) { 
	const url = args.join(" ") || event.messageReply.attachments[0].url;
    try {
        const res = await dipto.get(`https://imgbb-api-dipto.onrender.com/dipto?url=${encodeURIComponent(url)}`);
        const data = res.data.data.url;

        const messageBody = `
✅ | 𝐈𝐌𝐀𝐆𝐄 𝐔𝐏𝐋𝐎𝐀𝐃𝐄𝐃 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋𝐘!
        
🔰 | 𝐈𝐌𝐀𝐆𝐄 𝐔𝐑𝐋 | 🔰
${data}
        `
        api.sendMessage(messageBody, event.threadID, event.messageID);
    } catch(err) {
        console.log(err)
    }
}
}
