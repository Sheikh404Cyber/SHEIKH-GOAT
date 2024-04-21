const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ 🅢🅗🅔🅘🅚🅗-🅡🅞🅑🅞🅣 🅥❸.⓿ ]"; // changing this wont change the goatbot V2 of list cmd it is just a decoyy

module.exports = {
	config: {
		name: "help",
		version: "1.17",
		author: "NTKhang", // original author Kshitiz 
		countDown: 5,
		role: 0,
		shortDescription: {
			en: "View command usage and list all commands directly",
		},
		longDescription: {
			en: "View command usage and list all commands directly",
		},
		category: "info",
		guide: {
			en: "{pn} / help cmdName ",
		},
		priority: 1,
	},

	onStart: async function ({ message, args, event, threadsData, role }) {
		const { threadID } = event;
		const threadData = await threadsData.get(threadID);
		const prefix = getPrefix(threadID);

		if (args.length === 0) {
			const categories = {};
			let msg = "";

			msg += `🔰 𝐒𝐡𝐞𝐢𝐤𝐡 𝐑𝐨𝐛𝐨𝐭 𝐂𝐌𝐃 𝐋𝐢𝐬𝐭 & 𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐲 🔰\n\n`; // replace with your name 

			for (const [name, value] of commands) {
				if (value.config.role > 1 && role < value.config.role) continue;

				const category = value.config.category || "Uncategorized";
				categories[category] = categories[category] || { commands: [] };
				categories[category].commands.push(name);
			}

			Object.keys(categories).forEach((category) => {
				if (category !== "info") {
					msg += `\n╭───────────❍\n│ 『  ${category.toUpperCase()}  』`;


					const names = categories[category].commands.sort();
					for (let i = 0; i < names.length; i += 3) {
						const cmds = names.slice(i, i + 3).map((item) => `⏳${item}`);
						msg += `\n│ ${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
					}

					msg += `\n╰────────────𒁍`;
				}
			});

			const totalCommands = commands.size;
			msg += `\nমোট কমান্ড রয়েছে ${totalCommands} টি।`;
			msg += `ব্যবহার করার জন্য লিখুন ${prefix} help তারপর কমান্ডের নাম।\n\n`;
			msg += `ধন্যবাদ  SHEIKH-ROBOT v3.0 ব্যবহার করার জন্য।`; // its not decoy so change it if you want 

			const helpListImages = [
				'https://i.imgur.com/7JBfdpc.gif',

				'https://i.imgur.com/59Lemyq.gif',

				'https://i.imgur.com/Mqk9Eky.gif',

				'https://i.imgur.com/p6bCwv1.gif',

				'https://i.imgur.com/Mqk9Eky.gif',
													'https://i.imgur.com/OSWG34k.jpeg',

				'https://i.imgur.com/p6bCwv1.gif',

				'https://i.imgur.com/Mqk9Eky.gif',

				'https://i.imgur.com/p6bCwv1.gif',

				'https://i.imgur.com/Mqk9Eky.gif',

				'https://i.imgur.com/p6bCwv1.gif',                                    
				'https://i.imgur.com/Mqk9Eky.gif', 

				'https://i.imgur.com/p6bCwv1.gif',
			];

			const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

			await message.reply({
				body: msg,
				attachment: await global.utils.getStreamFromURL(helpListImage),
			});
		} else {
			const commandName = args[0].toLowerCase();
			const command = commands.get(commandName) || commands.get(aliases.get(commandName));

			if (!command) {
				await message.reply(`Command "${commandName}" not found.`);
			} else {
				const configCommand = command.config;
				const roleText = roleTextToString(configCommand.role);
				const author = configCommand.author || "Unknown";

				const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

				const guideBody = configCommand.guide?.en || "No guide available.";
				const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

				const response = `╭── NAME ────⭓
	│ ${configCommand.name}
	├── INFO
	│ Description: ${longDescription}
	│ Other names: ${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"}
	│ Other names in your group: Do not have
	│ Version: ${configCommand.version || "1.0"}
	│ Role: ${roleText}
	│ Time per command: ${configCommand.countDown || 1}s
	│ Author: ${author}
	├── Usage
	│ ${usage}
	├── Notes
	│ The content inside <XXXXX> can be changed
	│ The content inside [a|b|c] is a or b or c
	╰━━━━━━━❖`;

				await message.reply(response);
			}
		}
	},
};

function roleTextToString(roleText) {
	switch (roleText) {
		case 0:
			return "0 (All users)";
		case 1:
			return "1 (Group administrators)";
		case 2:
			return "2 (Admin bot)";
		default:
			return "Unknown role";
	}
}
