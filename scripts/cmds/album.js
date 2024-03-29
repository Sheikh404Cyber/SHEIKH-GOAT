const axios = require("axios");
const path = require("path");
const fs = require("fs");

module.exports = {
  config: {
    name: "album",
    version: "1.0.0",
    role: 0,
    author: "Dipto", //Don't Change Author name.
    description: "Displays album options for selection.",
    category: "🎬 | Media",
    countDown: 5,
    guide: {
      en: "{p}{n} or {p}{n} [2] or {p}{n} add ['cartoon', 'photo', 'lofi', 'sad', 'islamic','funny','horny','anime','love','baby','lyrics','sigma','photo','aesthetic','cat','flower','ff','sex','girl','football','friend', 'cricket']",
    },
  },

  onStart: async function ({ api, event, args }) {
    if (!args[0]) {
      {
        api.setMessageReaction("1️⃣", event.messageID, (err) => {}, true);
      }
      const albumOptions = [
        "Funny Videos 😂",
        "Islamic Videos 🕋",
        "Sad Videos 💔",
        "Anime Videos 👽",
        "Cartoon Videos 🥷",
        "Lofi Videos ✨",
        "Horny Videos 🥵",
        "Couple Videos 👩‍❤️‍👨",
        "Flower Videos 🌼",
        "Random Photos 📸",
      ];
      const message =
        "🎬 নাম্বার পছন্দ করে রিপ্লে মেসেজ দিন >🎬\n" +
        "✿━━━━━━━━━━━━━━━━━━━━━━━✿\n" +
        albumOptions
          .map((option, index) => `☂ | ${index + 1}. ${option} 📛`)
          .join("\n") +
        "\n✿━━━━━━━━━━━━━━━━━━━━━━━✿\n" +
        "\n🔰 | Page [ 𝟏/𝟐 ]" +
        "\n✿━━━━━━━━━━━━━━━━━━━━━━━✿";

      await api.sendMessage(
        message,
        event.threadID,
        (error, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
            link: albumOptions,
          });
        },
        event.messageID
      );
    } else if (args[0] === "2") {
      {
        api.setMessageReaction("2️⃣", event.messageID, (err) => {}, true);
      }
      const albumOptions = [
        "Aesthetic Videos 🪄",
        "Sigma Videos 🗿",
        "Lyrics Videos 🌌",
        "Cat Videos 😽",
        "Adults Videos 🔞",
        "Free Fire Videos 🎮",
        "Football Videos 🏈",
        "Girl Videos 💃",
        "Friends Videos 👬",
        "Cricket Videos 🏏"
      ];
      const message =
        "🎬 নাম্বার পছন্দ করে রিপ্লে মেসেজ দিন >🎬 \n" +
        "✿━━━━━━━━━━━━━━━━━━━━━━━✿\n" +
        albumOptions
          .map((option, index) => `☂ | ${index + 11}. ${option} 📛`)
          .join("\n") +
        "\n✿━━━━━━━━━━━━━━━━━━━━━━━✿\n" +
        "\n🔰 | Page [ 𝟐/𝟐 ]" +
        "\n✿━━━━━━━━━━━━━━━━━━━━━━━✿";

      await api.sendMessage(
        message,
        event.threadID,
        (error, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
            link: albumOptions,
          });
        },
        event.messageID
      );
    }
    //------------Video Add--------------//
    const validCommands = [
      "cartoon",
      "photo",
      "lofi",
      "sad",
      "islamic",
      "funny",
      "horny",
      "anime",
      "love",
      "baby",
      "lyrics",
      "sigma",
      "photo",
      "aesthetic",
      "cat",
      "flower",
      "ff",
      "sex",
      "girl",
      "football",
      "friend",
      "cricket"
    ];
    {
      api.setMessageReaction("👀", event.messageID, (err) => {}, true);
    }
    if (args[0] === "list") {
      try {
        const lRes = await axios.get(
          `https://noobs-api.onrender.com/dipto/album?list=dipto`
        );
        const data = lRes.data;
        api.sendMessage(
          {
            body: `🖤 𝗧𝗼𝘁𝗮𝗹 𝘃𝗶𝗱𝗲𝗼 𝗮𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗶𝗻 𝗮𝗹𝗯𝘂𝗺 🩵\n\n${data.data}`,
            attachment: await global.utils.getStreamFromURL(
              "https://i.ibb.co/tM8ds05/image.jpg"
            ),
          },
          event.threadID,
          event.messageID
        );
      } catch (error) {
        api.sendMessage(`${error}`, event.threadID, event.messageID);
      }
    }
    const d1 = args[1] ? args[1].toLowerCase() : "";
    if (!d1 || !validCommands.includes(d1)) return;
    if (!event.messageReply || !event.messageReply.attachments) return;
    const attachment = event.messageReply.attachments[0].url;
    const URL = attachment;
    let query;
    switch (d1) {
      case "cartoon":
        query = "addVideo";
        break;
      case "lofi":
        query = "addLofi";
        break;
      case "sad":
        query = "addSad";
        break;
      case "funny":
        query = "addFunny";
        break;
      case "islamic":
        query = "addIslamic";
        break;
      case "horny":
        query = "addHorny";
        break;
      case "anime":
        query = "addAnime";
        break;
      case "love":
        query = "addLove";
        break;
      case "lyrics":
        query = "addLyrics";
        break;
      case "flower":
        query = "addFlower";
        break;
      case "photo":
        query = "addPhoto";
        break;
      case "sigma":
        query = "addSigma";
        break;
      case "aesthetic":
        query = "addAesthetic";
        break;
      case "cat":
        query = "addCat";
        break;
      case "ff":
        query = "addFf";
        break;
      case "sex":
        query = "addSex";
        break;
      case "football":
        query = "addFootball";
        break;
      case "girl":
        query = "addGirl";
        break;
      case "friend":
        query = "addFriend";
        break;
      case "cricket":
        query = "addCricket";
        break;
      default:
        break;
    }
    try {
      const response = await axios.get(
        `https://noobs-api.onrender.com/dipto/imgur?url=${encodeURIComponent(
          URL
        )}`
      );
      const imgurLink = response.data.data;
      const fileExtension = path.extname(imgurLink);
      let query2;
      if (
        fileExtension === ".jpg" ||
        fileExtension === ".jpeg" ||
        fileExtension === ".png"
      ) {
        query2 = "addPhoto";
      } else if (fileExtension === ".mp4") {
        query2 = query;
      } else {
        api.sendMessage(
          "Invalid file format.",
          event.threadID,
          event.messageID
        );
        return;
      }
      const svRes = await axios.get(
        `https://noobs-api.onrender.com/dipto/album?add=${query2}&url=${imgurLink}`
      );
      const data = svRes.data;
      //   console.log(data);
      api.sendMessage(
        `✅ | ${data.data}\n\n🔰 | ${data.data2}`,
        event.threadID,
        event.messageID
      );
    } catch (error) {
      console.error("❎ | Error:", error);
      api.sendMessage(
        `❎ | Failed to convert image.\n${error}`,
        event.threadID,
        event.messageID
      );
    }
  },
  onReply: async function ({ api, event, Reply }) {
    const admin = global.GoatBot.config.DEV;
    api.unsendMessage(Reply.messageID);
    if (event.type == "message_reply") {
      const reply = parseInt(event.body);
      if (isNaN(reply)) {
        return api.sendMessage(
          "🔰 | 𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐩𝐥𝐲 𝐰𝐢𝐭𝐡 𝐞𝐢𝐭𝐡𝐞𝐫 𝟏 - 𝟐𝟎",
          event.threadID,
          event.messageID
        );
      }
      let query;
      let cp;
      if (reply === 1) {
        query = "funny";
        cp = "Sheikh-Robot Fanny Video <🤣";
      } else if (reply === 2) {
        query = "islamic";
        cp = "SheSheikh-Robot Islamic Video <🕋";
      } else if (reply === 3) {
        query = "sad";
        cp = "Sheikh-Robot Sad Video <💔";
      } else if (reply === 4) {
        query = "anime";
        cp = "Sheikh-Robot Anime Video <👽";
      } else if (reply === 5) {
        query = "video";
        cp = "Sheikh-Robot Cartoon Video <🥷";
      } else if (reply === 6) {
        query = "lofi";
        cp = "Sheikh-Robot Lofi Video <🪄";
      } else if (reply === 7 && event.senderID === admin) {
        query = "horny";
        cp = "Sheikh-Robot Horny Video <🥵";
      } else if (reply === 8) {
        query = "love";
        cp = "Sheikh-Robot Couple Video <👩‍❤️‍👨";
      } else if (reply === 9) {
        query = "baby";
        cp = "Sheikh-Robot Baby Video <🌼";
      } else if (reply === 10) {
        query = "photo";
        cp = "Sheikh-Robot Random Photo <📸";
      } else if (reply === 11) {
        query = "aesthetic";
        cp = "Sheikh-Robot Aesthetic Video <🌌";
      } else if (reply === 12) {
        query = "sigma";
        cp = "Sheikh-Robot Sigma Video <🗿";
      } else if (reply === 13) {
        query = "lyrics";
        cp = "Sheikh-Robot Lyrics Video <🧾";
      } else if (reply === 14) {
        query = "cat";
        cp = "Sheikh-Robot Cat Video <😽";
      } else if (reply === 15 && event.senderID === admin) {
        query = "sex";
        cp = "Sheikh-Robot adult Video <🔞";
      } else if (reply === 16) {
        query = "ff";
        cp = "Sheikh-Robot FreeFire Video <🎮";
      } else if (reply === 17) {
        query = "football";
        cp = "Sheikh-Robot Football Video <🏈";
      } else if (reply === 18) {
        query = "girl";
        cp = "Sheikh-Robot Girl Video <💃";
      } else if (reply === 19) {
        query = "friend";
        cp = "Sheikh-Robot Friends Video <👬";
      }
      else if (reply === 20) {
        query = "cricket";
        cp = "Sheikh-Robot Cricket Video <🏏";
      }
      try {
        const res = await axios.get(
          `https://noobs-api.onrender.com/dipto/album?type=${query}`
        );
        const imgUrl = res.data.data;
        const ex = path.extname(imgUrl);
        const imgRes = await axios.get(imgUrl, { responseType: "arraybuffer" });
        const filename = __dirname + `/assets/dipto${ex}`;
        fs.writeFileSync(filename, Buffer.from(imgRes.data, "binary"));
        api.sendMessage(
          {
            body: cp,
            attachment: fs.createReadStream(filename),
          },
          event.threadID,
          () => fs.unlinkSync(filename),
          event.messageID
        );
      } catch (error) {
        api.sendMessage(
          "❎ | An error occurred while fetching the media.",
          event.threadID,
          event.messageID
        );
      }
    }
  },
};
