const axios = require('axios');

module.exports = {
    config: {
name: "stalk",
aliases: [],
version: "1.0", 
author: "ARIYAN",
description: {
    vi: "Thu thập thông tin từ một người dùng trên Facebook.",
    en: "Retrieve information about a user on Facebook."
},
category: "👥 | Member",
guide: {
    vi: "{pn} <@mention hoặc trả lời tin nhắn của người dùng>",
    en: "{pn} <@mention or reply to a message of the user>"
}
    },

  onStart: async function ({ api, args, event }) {
      let userId;
      let userName;

      try {
  if (event.type === "message_reply") {
userId = event.messageReply.senderID;
const user = await api.getUserInfo(userId);
userName = user[userId].name;
  } else {
const input = args.join(" ");

if (event.mentions && Object.keys(event.mentions).length > 0) {
    userId = Object.keys(event.mentions)[0];
    const user = await api.getUserInfo(userId);
    userName = user[userId].name;
} else if (/^\d+$/.test(input)) {
    userId = input;
    const user = await api.getUserInfo(userId);
    userName = user[userId].name;
} else if (input.includes("facebook.com")) {
    const { findUid } = global.utils;
    let linkUid;
    try {
linkUid = await findUid(input);
    } catch (error) {
console.error(error);
return api.sendMessage(
    "⚠️ |  I couldn't find the user ID from the provided link. Please try again with the user ID.\n\nExample ➾ .stalk 100073291639820",
    event.threadID
);
    }
    if (linkUid) {
userId = linkUid;
const user = await api.getUserInfo(userId);
userName = user[userId].name;
    }
} else {
    userId = event.senderID;
    const user = await api.getUserInfo(userId);
    userName = user[userId].name;
}
  }

  const response = await axios.get(`https://noobs-apihouse.onrender.com/dipto/fbinfo?id=${userId}&key=dipto008`);
const apiResponse = response.data;

const formattedResponse = `
╠    𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 𝗦𝗧𝗔𝗟𝗞    ╣
﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

• 𝗡𝗮𝗺𝗲: ${apiResponse.name}

• 𝗙𝗮𝘀𝘁: ${apiResponse.fast}

• 𝗨𝘀𝗲𝗿 𝗜𝗗: ${apiResponse.uid}

• 𝗨𝘀𝗲𝗿 𝗡𝗮𝗺𝗲: ${apiResponse.user_name}

• 𝗜𝗗 𝗟𝗶𝗻𝗸: ${apiResponse.idlink}

• 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽 𝗦𝘁𝗮𝘁𝘂𝘀: ${apiResponse.rlsn}

• 𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆: ${apiResponse.birthday}

• 𝗙𝗼𝗹𝗹𝗼𝘄𝗲𝗿𝘀: ${apiResponse.follow}

• 𝗛𝗼𝗺𝗲: ${apiResponse.home}

• 𝗟𝗼𝗰𝗮𝗹: ${apiResponse.local}

• 𝗟𝗼𝘃𝗲: ${apiResponse.love}

• 𝗩𝗲𝗿𝗶𝗳𝗶𝗲𝗱: ${apiResponse.verify}

• 𝗪𝗲𝗯: ${apiResponse.web}

• 𝗤𝘂𝗼𝘁𝗲𝘀: ${apiResponse.quotes}

• 𝗔𝗯𝗼𝘂𝘁: ${apiResponse.about}

• 𝗔𝗰𝗰𝗼𝘂𝗻𝘁 𝗖𝗿𝗲𝗮𝘁𝗶𝗼𝗻 𝗗𝗮𝘁𝗲: ${apiResponse.account_crt}
﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏
`;

  await api.sendMessage({
body: formattedResponse,
attachment: await global.utils.getStreamFromURL(apiResponse.photo)
  }, event.threadID);
      } catch (error) {
  console.error('Error fetching stalk data:', error);
  api.sendMessage("An error occurred while processing the request.", event.threadID);
      }
  }

};
