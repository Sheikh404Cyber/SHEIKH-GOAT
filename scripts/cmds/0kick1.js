module.exports = {
 config: {
 name: "kick1",
 version: "1.0",
 author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
 countDown: 5,
 role: 1,
 shortDescription: "no prefix kick",
 longDescription: "no prefix kick",
 category: "👑 | Robot-Owner",
 },
  langs: {
    en: {
      needAdmin: "⛔ | The bot needs to be the admin of this thread."
    }
  },
 
 onStart: async function(){}, 
 onChat: async function({ message, event, args, threadsData, api, getLang }) {
   const input = event.body;
 if (input && input.trim().toLowerCase().startsWith('kick1') || input && input.trim().toLowerCase().startsWith('kick')){
    const data = input.split(" ");
    data.shift();
   const prompt = data.join(" ");
   
   const adminIDs = await threadsData.get(event.threadID, "adminIDs");
   if (!adminIDs.includes(api.getCurrentUserID()))
     return message.reply(getLang("needAdmin"));
   async function kickAndCheckError(uid) {
     try {
       await api.removeUserFromGroup(uid, event.threadID);
     }
     catch (e) {
       message.reply(getLang("needAdmin"));
       return "ERROR";
     }
   }
   if (!prompt[0]) {
     if (!event.messageReply)
       return message.SyntaxError();
     await kickAndCheckError(event.messageReply.senderID);
   }
   else {
     const uids = Object.keys(event.mentions);
     if (uids.length === 0)
       return message.SyntaxError();
     if (await kickAndCheckError(uids.shift()) === "ERROR")
       return;
     for (const uid of uids)
       api.removeUserFromGroup(uid, event.threadID);

 }
 }
}
};
