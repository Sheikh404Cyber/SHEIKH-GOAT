const axios = require("axios");

module.exports = {
  config: {
    name: "xvdl",
    aliases: ["xvideos", "xvideodl", "xvideosdl"],
    version: "1.3",
    author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Tải video từ X'VIDEOS",
      en: "Download video from X'VIDEOS"
    },
    longDescription: {
      vi: "Tải video X'VIDEOS từ X'VIDEOS (công khai)",
      en: "Download video X'VIDEOS from X'VIDEOS (public)"
    },
    category: "⛔ | 18+",
    guide: {
      vi: "   {pn} <url video X'VIDEOS>: tải video từ X'VIDEOS",
      en: "   {pn} <url video X'VIDEOS>: download video from X'VIDEOS"
    }
  },

  langs: {
    vi: {
      missingUrl: "Vui lòng nhập url video X'VIDEOS (công khai) bạn muốn tải về",
      error: "Đã xảy ra lỗi khi tải video",
      downloading: "Đang tiến hành tải video cho bạn",
      tooLarge: "Rất tiếc không thể tải video cho bạn vì dung lượng lớn hơn 83MB"
    },
    en: {
      missingUrl: "❌ | Please enter the X'VIDEOS video (public) url you want to download",
      error: "❎ | An error occurred while downloading the video",
      downloading: "⏳ | Downloading video for you",
      tooLarge: "❎ | Sorry, we can't download the video for you because the size is larger than 83MB...",
      permission: "❌ | You don't have enough permissions to use this command, Only VIP users can use this command"
    }
  },

  onStart: async function ({ args, event, message, getLang }) {

    if (!args[0]) {
      return message.reply(getLang("missingUrl"));
    }

    let msgSend = null;
    try {
      const response = await axios.get(`https://all-in-one-api-by-faheem.replit.app/api/download/xvideos?url=${args[0]}`);

      if (response.data.success === false) {
        return message.reply(getLang("error"));
      }

      msgSend = message.reply(getLang("downloading"));

      const stream = await global.utils.getStreamFromURL(response.data.result.url);
            const Time = response.data.processed;
            const title = response.data.result.title;
            const views = response.data.result.views;
            const likes = response.data.result.like_count;

      await message.reply({ body: `♻Command By ♪♪ 𝐀𝐒𝐈𝐅 𝐱𝟔𝟗 ♪♪\n\n🈴Title: ${title}\n🕕Processing Time: ${Time}\n💌Views: ${views}\n💟Likes: ${likes}`,
        attachment: stream });

      message.unsend((await msgSend),event.messageID);
    }
    catch (e) {
      message.unsend((await msgSend),event.messageID);
      return message.reply(getLang("tooLarge"));
    }
  }
};
