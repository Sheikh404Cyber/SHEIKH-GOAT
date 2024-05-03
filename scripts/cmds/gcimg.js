const axios = require("axios");
const fs = require('fs-extra');

async function getAvatarUrls(userIDs) {
    let avatarURLs = [];
  try {
    for (let userID of userIDs) {
      let url = `https://graph.facebook.com/${userID}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
      avatarURLs.push(url);
    }
    return avatarURLs;
  } catch (error) {
    return avatarURLs.push("https://i.imgur.com/EBK57TQ.png")
  }
}
module.exports = {
    config: {
        name: "gcimg",
        version: "1.0",
        credits: "ASIF",
        cooldowns: 5,
        hasPermission: 0,
        description: "𝗚𝗲𝘁 𝗚𝗿𝗼𝘂𝗽 𝗜𝗺𝗮𝗴𝗲",
        Category: "🖼 | Image",
        usePrefix: false,
        usages: "{pn} [TID/leave blank] --color [color] --bgcolor [bgcolor] --admincolor [admincolor] --membercolor [membercolor]",
        argsRequired: false
    },

onStart: async function ({ api, args, event }) {
        try {
            let color = "red";
            let bgColor = ""; 
            let adminColor = ""; 
            let memberColor = ""; 

            args.forEach((arg, index) => {
                switch (arg) {
       case "--bgcolor":
            bgColor = args[index + 1];
                        break;
      case "--admincolor":
         adminColor = args[index + 1];
                        break;
       case "--membercolor":
         memberColor = args[index + 1];
                        break;
     case "--color":
      color = args[index + 1];
                        break;
                }
            });
            let tid = event.threadID;
            let threadInfo = await api.getThreadInfo(tid);
            let participantIDs = threadInfo.participantIDs;
            let adminIDs = threadInfo.adminIDs.map(admin => admin.id);
            let memberURLs = await getAvatarUrls(participantIDs);
            let adminURLs = await getAvatarUrls(adminIDs);

            const data2 = {
                memberURLs: memberURLs,
                groupPhotoURL: threadInfo.imageSrc,
                adminURLs: adminURLs,
                groupName: threadInfo.threadName,
                bgcolor: bgColor,
                admincolor: adminColor,
                membercolor: memberColor,
                color: color
            };

            api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
            const { data } = await axios.post('https://noobs-api.onrender.com/dipto/groupPhoto', data2);
            const filePath = __dirname + "/cache/gcimg.png";
            const imgRes = await axios.get(data.img, { responseType: 'arraybuffer' });
            fs.writeFileSync(filePath, Buffer.from(imgRes.data, 'binary'));
            api.setMessageReaction("✅", event.messageID, (err) => {}, true);
            api.sendMessage({
      body: `𝙷𝚎𝚛𝚎 𝚒𝚜 𝚢𝚘𝚞𝚛 𝚐𝚛𝚘𝚞𝚙 𝚒𝚖𝚊𝚐𝚎 <😘`,
                attachment: fs.createReadStream(filePath)
            }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
        } catch (error) {
            console.log(error);
            api.sendMessage('Error: ' + error.message, event.threadID, event.messageID);
        }
    }
}; 
