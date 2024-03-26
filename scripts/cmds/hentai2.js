const axios = require('axios');

module.exports = {
	config: {
		name: "hentai2",
		aliases: ["hen2"],
		version: "1.0",
		author: "Samir",
		countDown: 5,
		role: 0,
		shortDescription: "Anime Hentai",
		longDescription: "Get Anime Hentai.",
		category: "⛔ | 18+",
		guide: "{p} hentai2"
	},

	onStart: async function ({ message, args }) {
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
			const BASE_URL = `https://api.zahwazein.xyz/downloader/hentaivid?apikey=zenzkey_92d341a7630e`;
 message.reply("processing your request."); 
			try {
				let res = await axios.get(BASE_URL)
				let porn = res.data.result.video_1;
				const form = {
					body: `Here's Your Requests`
				};
		 if (porn)
					form.attachment = await global.utils.getStreamFromURL(porn);
				message.reply(form); 
			} catch (e) { message.reply(`An Error Occured While Processing Your Request.`)
 console.log(e);
 }

		}
	};
