const axios = require("axios");
const { getStreamFromURL } = global.utils;

module.exports = {
	config: {
		name: "draw",
		aliases: ["draw"],
		version: "1.1",
		author: "Samir",
		countDown: 2,
		role: 0,
		shortDescription: {
			en: "Create image from your text"
		},
		longDescription: {
			en: "Create image from your text"
		},
		category: "🖼 | Image",
		guide: {
			en: "   {pn} <prompt>: create image from your text"
		}
	},

	langs: {
		en: {
			syntaxError: "⚠️ Please enter prompt",
			error: "❗ An error has occurred, please try again later"
		}
	},

	onStart: async function ({ message, args, getLang, event }) {
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
		const prompt = args.join(" ");
		if (!prompt)
			return message.reply(getLang("syntaxError"));

		const data = await midJourney(prompt, {});
		const imageUrl = data[0];
		const imageStream = await getStreamFromURL(imageUrl, "openjourney.png");
		return message.reply({
			attachment: imageStream
		});
	}
};

const ReplicateUtils = {
	run: async function (model, inputs) {
		let prediction;
		try {
			prediction = await this.create(model, inputs);
		}
		catch (e) {
			throw e.response.data;
		}
		while (![
			'canceled',
			'succeeded',
			'failed'
		].includes(prediction.status)) {
			await new Promise(_ => setTimeout(_, 250));
			prediction = await this.get(prediction);
		}

		return prediction.output;
	},

	async get(prediction) {
		if (prediction.prediction)
			return prediction.prediction;
		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), 29000);
		const response = await axios.get(`https://replicate.com/api/models${prediction.version.model.absolute_url}/versions/${prediction.version_id}/predictions/${prediction.uuid}`, {
			signal: controller.signal
		}).then(r => r.data);
		clearTimeout(id);
		return response;
	},

	create(model, inputs) {
		const [path, version] = model.split(':');

		return axios({
			url: `https://replicate.com/api/models/${path}/versions/${version}/predictions`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify({ inputs })
		})
			.then(response => response.data);
	}
};

const model = "cjwbw/anything-v3.0:f410ed4c6a0c3bf8b76747860b3a3c9e4c8b5a827a16eac9dd5ad9642edce9a2";
const midJourney = async (prompt, parameters = {}) => await ReplicateUtils.run(model, { prompt, ...parameters });
