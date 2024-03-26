module.exports = {
config: {
		name: "gadmin",
    version: "1.0",
		author: "Samir B. Thakuri",
		countDown: 5,
		role: 1,
		shortDescription: "add group admin",
		longDescription: "add admin the person you need to add admin from the group by tagging",
		category: "👑 | Robot-Owner",
		guide: {
      en: "{p}{n} [tag]",
    }
	},

 onStart: async function ({ api, event }) {
	var mention = Object.keys(event.mentions);
	return api.getThreadInfo(event.threadID, (err, info) => {
		if (err) return api.sendMessage("An error occurred!",event.threadID);
if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage('Need group admin permission\nPlease add and try again!', event.threadID, event.messageID);
if(!mention[0]) return api.sendMessage("You must tag the person to promote it.",event.threadID);
		if (info.adminIDs.some(item => item.id == event.senderID)) {
			for (let o in mention) {
				setTimeout(() => {				api.changeAdminStatus(event.threadID,mention[o],true,) 
				},3000)
			}
		}
	})
}
};
