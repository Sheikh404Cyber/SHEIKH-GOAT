module.exports = {
  config: {
    name: "profile",
    aliases: ["pp", "dp"],
    version: "1.0",
    author: "RUBISH",
    countDown: 5,
    role: 0,
    shortDescription: "View profile picture",
    longDescription: "View the profile picture of a user.",
    category: "👥 | Member",
    guide: {
      en: "{pn} [@tag|uid|fbLink] (or reply to a message)",
    },
  },

  onStart: async function ({ api, event, args, message, usersData, getLang }) {
    const { getStreamFromURL } = global.utils;

    try {
      let uid;
      let userName;
      if (event.type === "message_reply") {
        uid = event.messageReply.senderID;
        const user = await api.getUserInfo(uid);
        userName = user[uid].name;
      } else {
        const input = args.join(" ");

        if (event.mentions && Object.keys(event.mentions).length > 0) {
          uid = Object.keys(event.mentions)[0];
          const user = await api.getUserInfo(uid);
          userName = user[uid].name;
        } else if (/^\d+$/.test(input)) {
          uid = input;
          const user = await api.getUserInfo(uid);
          userName = user[uid].name;
        } else if (input.includes("facebook.com")) {
          const { findUid } = global.utils;
          let linkUid;
          try {
            linkUid = await findUid(input);
          } catch (error) {
            console.error(error);
            return api.sendMessage(
              "⚠️ |  I couldn't find this ID/Link\n\nplease try again With UID \n\nExample ➾ .profile 100073291639820",
              event.threadID
            );
          }
          if (linkUid) {
            uid = linkUid;
            const user = await api.getUserInfo(uid);
            userName = user[uid].name;
          }
        } else {
          uid = event.senderID;
          const user = await api.getUserInfo(uid);
          userName = user[uid].name;
        }
      }

      const avt = await usersData.getAvatarUrl(uid);
      message.reply({
        body: `✅ | Profile picture Found \n\nName ➾ ${userName} \n\nUID ➾ ${uid}`,
        attachment: await getStreamFromURL(avt),
      });
    } catch (e) {
      console.error(e);
      message.reply(getLang("error"));
    }
  },
};
