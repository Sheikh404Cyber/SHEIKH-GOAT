const axios = require("axios");

module.exports = {
	config: {
		name: "mix",
		version: "1.3",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		shortDescription: "Mix 2 emoji",
		longDescription: {
			vi: "Mix 2 emoji lại với nhau",
			en: "Mix 2 emoji together"
		},
		guide: {
			vi: "   {pn} <emoji1> <emoji2>"
				+ "\n   Ví dụ:  {pn} 🤣 🥰",
			en: "   {pn} <emoji1> <emoji2>"
				+ "\n   Example:  {pn} 🤣 🥰"
		},
		category: "👥 | Member"
	},

	langs: {
		vi: {
			error: "Rất tiếc, emoji %1 và %2 không mix được",
			success: "Emoji %1 và %2 mix được %3 ảnh"
		},
		en: {
			error: "Sorry, emoji %1 and %2 can't mix",
			success: "Emoji %1 and %2 mix %3 images"
		}
	},

	onStart: async function ({ message, args, getLang }) {
		const readStream = [];
		const emoji1 = args[0];
		const emoji2 = args[1];

		if (!emoji1 || !emoji2)
			return message.SyntaxError();

		const generate1 = await generateEmojimix(emoji1, emoji2);

		if (generate1)
			readStream.push(generate1);

		if (readStream.length == 0)
			return message.reply(getLang("error", emoji1, emoji2));

		message.reply({
			body: getLang("success", emoji1, emoji2, readStream.length),
			attachment: readStream
		});
	}
};



async function generateEmojimix(emoji1, emoji2) {
	try {
		const { data: response } = await axios.get(`https://emojimix-rubish-api-v67p.onrender.com/emoji-mix?emoji1=${emoji1}&emoji2=${emoji2}`, {
						responseType: "stream"
		});
		response.path = `emojimix${Date.now()}.png`;
		return response;
	}
	catch (e) {
		return null;
	}
}
