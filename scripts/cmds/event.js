const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

function getDomain(url) {
	const regex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/im;
	const match = url.match(regex);
	return match ? match[1] : null;
}

module.exports = {
	config: {
		name: "event",
		version: "1.9",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		description: {
			vi: "Quản lý các tệp lệnh event của bạn",
			en: "Manage your event command files"
		},
		category: "👑 | Robot-Owner",
		guide: {
			vi: "{pn} load <tên file lệnh>"
				+ "\n{pn} loadAll"
				+ "\n{pn} install <url> <tên file lệnh>: Tải về và load command event, url là đường dẫn tới file lệnh (raw)"
				+ "\n{pn} install <code> <tên file lệnh>: Tải về và load command event, code là mã của file lệnh (raw)",
			en: "{pn} load <command file name>"
				+ "\n{pn} loadAll"
				+ "\n{pn} install <url> <command file name>: Download and load event command, url is the path to the command file (raw)"
				+ "\n{pn} install <code> <command file name>: Download and load event command, code is the code of the command file (raw)"
		}
	},

	langs: {
		vi: {
			missingFileName: "⚠️ | Vui lòng nhập vào tên lệnh bạn muốn reload",
			loaded: "✅ | Đã load event command \"%1\" thành công",
			loadedError: "❌ | Load event command \"%1\" thất bại với lỗi\n%2: %3",
			loadedSuccess: "✅ | Đã load thành công \"%1\" event command",
			loadedFail: "❌ | Load thất bại event command \"%1\"\n%2",
			missingCommandNameUnload: "⚠️ | Vui lòng nhập vào tên lệnh bạn muốn unload",
			unloaded: "✅ | Đã unload event command \"%1\" thành công",
			unloadedError: "❌ | Unload event command \"%1\" thất bại với lỗi\n%2: %3",
			missingUrlCodeOrFileName: "⚠️ | Vui lòng nhập vào url hoặc code và tên file lệnh bạn muốn cài đặt",
			missingUrlOrCode: "⚠️ | Vui lòng nhập vào url hoặc code của tệp lệnh bạn muốn cài đặt",
			missingFileNameInstall: "⚠️ | Vui lòng nhập vào tên file để lưu lệnh (đuôi .js)",
			invalidUrlOrCode: "⚠️ | Không thể lấy được mã lệnh",
			alreadExist: "⚠️ | File lệnh đã tồn tại, bạn có chắc chắn muốn ghi đè lên file lệnh cũ không?\nThả cảm xúc bất kì vào tin nhắn này để tiếp tục",
			installed: "✅ | Đã cài đặt event command \"%1\" thành công, file lệnh được lưu tại %2",
			installedError: "❌ | Cài đặt event command \"%1\" thất bại với lỗi\n%2: %3",
			missingFile: "⚠️ | Không tìm thấy tệp lệnh \"%1\"",
			invalidFileName: "⚠️ | Tên tệp lệnh không hợp lệ",
			unloadedFile: "✅ | Đã unload lệnh \"%1\""
		},
		en: {
			missingFileName: "⚠️ | Please enter the command name you want to reload",
			loaded: "✅ | Loaded event command \"%1\" successfully",
			loadedError: "❌ | Loaded event command \"%1\" failed with error\n%2: %3",
			loadedSuccess: "✅ | Loaded \"%1\" event command successfully",
			loadedFail: "❌ | Loaded event command \"%1\" failed\n%2",
			missingCommandNameUnload: "⚠️ | Please enter the command name you want to unload",
			unloaded: "✅ | Unloaded event command \"%1\" successfully",
			unloadedError: "❌ | Unloaded event command \"%1\" failed with error\n%2: %3",
			missingUrlCodeOrFileName: "⚠️ | Please enter the url or code and command file name you want to install",
			missingUrlOrCode: "⚠️ | Please enter the url or code of the command file you want to install",
			missingFileNameInstall: "⚠️ | Please enter the file name to save the command (with .js extension)",
			invalidUrlOrCode: "⚠️ | Unable to get command code",
			alreadExist: "⚠️ | The command file already exists, are you sure you want to overwrite the old command file?\nReact to this message to continue",
			installed: "✅ | Installed event command \"%1\" successfully, the command file is saved at %2",
			installedError: "❌ | Installed event command \"%1\" failed with error\n%2: %3",
			missingFile: "⚠️ | File \"%1\" not found",
			invalidFileName: "⚠️ | Invalid file name",
			unloadedFile: "✅ | Unloaded command \"%1\""
		}
	},

	onStart: async ({ args, message, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, commandName, event, getLang }) => {
		const { configCommands } = global.GoatBot;
		const { log, loadScripts } = global.utils;

		if (args[0] == "load" && args.length == 2) {
			if (!args[1])
				return message.reply(getLang("missingFileName"));
			const infoLoad = loadScripts("events", args[1], log, configCommands, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getLang);
			infoLoad.status == "success" ?
				message.reply(getLang("loaded", infoLoad.name)) :
				message.reply(getLang("loadedError", infoLoad.name, infoLoad.error, infoLoad.message));
		}
		else if ((args[0] || "").toLowerCase() == "loadall" || (args[0] == "load" && args.length > 2)) {
			const allFile = args[0].toLowerCase() == "loadall" ?
				fs.readdirSync(path.join(__dirname, "..", "events"))
					.filter(file =>
						file.endsWith(".js") &&
						!file.match(/(eg)\.js$/g) &&
						(process.env.NODE_ENV == "development" ? true : !file.match(/(dev)\.js$/g)) &&
						!configCommands.commandEventUnload?.includes(file)
					)
					.map(item => item = item.split(".")[0]) :
				args.slice(1);
			const arraySucces = [];
			const arrayFail = [];
			for (const fileName of allFile) {
				const infoLoad = loadScripts("events", fileName, log, configCommands, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getLang);
				infoLoad.status == "success" ?
					arraySucces.push(fileName) :
					arrayFail.push(`${fileName} => ${infoLoad.error.name}: ${infoLoad.error.message}`);
			}
			let msg = "";
			if (arraySucces.length > 0)
				msg += getLang("loadedSuccess", arraySucces.length) + '\n';
			if (arrayFail.length > 0)
				msg += (msg ? '\n' : '') + getLang("loadedFail", arrayFail.length, "❗" + arrayFail.join("\n❗ "));
			message.reply(msg);
		}
		else if (args[0] == "unload") {
			if (!args[1])
				return message.reply(getLang("missingCommandNameUnload"));
			const infoUnload = global.utils.unloadScripts("events", args[1], configCommands, getLang);
			infoUnload.status == "success" ?
				message.reply(getLang("unloaded", infoUnload.name)) :
				message.reply(getLang("unloadedError", infoUnload.name, infoUnload.error.name, infoUnload.error.message));
		}
		else if (args[0] == "install") {
			let url = args[1];
			let fileName = args[2];
			let rawCode;

			if (!url || !fileName)
				return message.reply(getLang("missingUrlCodeOrFileName"));

			if (url.endsWith(".js")) {
				const tmp = fileName;
				fileName = url;
				url = tmp;
			}

			if (url.match(/(https?:\/\/(?:www\.|(?!www)))/)) {
				if (!fileName || !fileName.endsWith(".js"))
					return message.reply(getLang("missingFileNameInstall"));

				const domain = getDomain(url);
				if (!domain)
					return message.reply(getLang("invalidUrl"));

				if (domain == "pastebin.com") {
					const regex = /https:\/\/pastebin\.com\/(?!raw\/)(.*)/;
					if (url.match(regex))
						url = url.replace(regex, "https://pastebin.com/raw/$1");
					if (url.endsWith("/"))
						url = url.slice(0, -1);
				}
				else if (domain == "github.com") {
					const regex = /https:\/\/github\.com\/(.*)\/blob\/(.*)/;
					if (url.match(regex))
						url = url.replace(regex, "https://raw.githubusercontent.com/$1/$2");
				}

				rawCode = (await axios.get(url)).data;

				if (domain == "savetext.net") {
					const $ = cheerio.load(rawCode);
					rawCode = $("#content").text();
				}
			}
			else {
				if (args[args.length - 1].endsWith(".js")) {
					fileName = args[args.length - 1];
					rawCode = event.body.slice(event.body.indexOf('install') + 7, event.body.indexOf(fileName) - 1);
				}
				else if (args[1].endsWith(".js")) {
					fileName = args[1];
					rawCode = event.body.slice(event.body.indexOf(fileName) + fileName.length + 1);
				}
				else
					return message.reply(getLang("missingFileNameInstall"));
			}
			if (!rawCode)
				return message.reply(getLang("invalidUrlOrCode"));
			if (fs.existsSync(path.join(__dirname, "..", "events", fileName)))
				return message.reply(getLang("alreadExist"), (err, info) => {
					global.GoatBot.onReaction.set(info.messageID, {
						commandName,
						messageID: info.messageID,
						type: "install",
						author: event.senderID,
						data: {
							fileName,
							rawCode
						}
					});
				});
			else {
				const infoLoad = loadScripts("events", fileName, log, configCommands, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getLang, rawCode);
				infoLoad.status == "success" ?
					message.reply(getLang("installed", infoLoad.name, path.join(__dirname, fileName).replace(process.cwd(), ""))) :
					message.reply(getLang("installedError", infoLoad.name, infoLoad.error.name, infoLoad.error.message));
			}
		}
		else
			message.SyntaxError();
	},

	onReaction: async function ({ Reaction, message, event, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getLang }) {
		const { author, messageID, data: { fileName, rawCode } } = Reaction;
		if (event.userID != author)
			return;
		const { configCommands } = global.GoatBot;
		const { log, loadScripts } = global.utils;
		const infoLoad = loadScripts("cmds", fileName, log, configCommands, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getLang, rawCode);
		infoLoad.status == "success" ?
			message.reply(getLang("installed", infoLoad.name, path.join(__dirname, '..', 'events', fileName).replace(process.cwd(), ""), () => message.unsend(messageID))) :
			message.reply(getLang("installedError", infoLoad.name, infoLoad.error.name, infoLoad.error.message, () => message.unsend(messageID)));
	}
};
