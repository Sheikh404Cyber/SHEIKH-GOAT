const axios = require("axios");

module.exports = {
	config: {
		name: "match",
		aliases: ["cric"],
		version: "1.0",
		author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
		countDown: 5,
		role: 0,
		shortDescription: "Get cricbuzz match info",
		longDescription: {
			en: "Provides you the information of cricket matches"
		},
		category: "🔥 | Premium",
		guide: {
			en: "{pn}"
		}
	},
	onStart: async function ({ api, event, args, message }) {
		try {
			const response = await axios.get("https://anbusec.xyz/api/sports/match?apikey=jmBOjQSgq5mK8GScw9AB");

			const message = {
				body: `Here's some match information:\n\n` +
					`❏ Name: ${response.data.data.name}\n` +
					`❏ Status: ${response.data.data.status}\n` +
					`❏ Biography: ${response.data.data.url}`,
				attachment: await global.utils.getStreamFromURL('http://tinyurl.com/yp39z4pt')
			};

			return api.sendMessage(message, event.threadID);
		} catch (error) {
			console.error(error);
			message.reply("An error occurred while fetching the information.");
		}
	}
};
