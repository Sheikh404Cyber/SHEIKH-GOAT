const axios = require('axios');
module.exports = {
	config: {
		name: "hentaivid",
		aliases: ["henvid", "hentaivideo"],
		version: "1.0",
		author: "MILAN",
		countDown: 5,
		role: 0,
		shortDescription: "hentai videos",
		longDescription: "get hentai videos",
		category: "⛔ | 18+",
		guide: {
			en: "{p} hentaivid "
 }
 },

	onStart: async function ({ event, message, getLang, threadsData, api, args }) {
    function checkPermissionAndSendMessage(permission, message) {
  if (!permission.includes(event.senderID)) {
    api.sendMessage(message, event.threadID, event.messageID);
    return false;
  }
  return true;
}

const GODPermission = global.GoatBot.config.GOD;
const vipUserPermission = global.GoatBot.config.vipUser;
const adminBotPermission = global.GoatBot.config.adminBot;

const permissionMessage = "You are not VIP user to use this cmd. Use /request to ask  permission for this cmd to authors";

if (!checkPermissionAndSendMessage(GODPermission, permissionMessage)) {
  return;
}

if (!checkPermissionAndSendMessage(vipUserPermission, permissionMessage)) {
  return;
}
if (!checkPermissionAndSendMessage(adminBotPermission, permissionMessage)) {
  return;
}
			const BASE_URL = `https://milanbhandari.imageapi.repl.co/hentai?apikey=xyzmilan`;
 await message.reply("Processing your video please wait..."); 
			try {
				let res = await axios.get(BASE_URL)
				let vid = res.data.url;
				const form = {
					body: `Here's Your Requests`
				};
		 if (vid)
					form.attachment = await global.utils.getStreamFromURL(vid);
				message.reply(form); 
			} catch (e) { message.reply(`Something went wrong. Please try again later`)
 console.log(e);
 }

		}
	};
