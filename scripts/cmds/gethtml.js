const fetch = require('node-fetch');
const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI({
  'api_dev_key': 'G0bU0PfaP_ZyBiSJTQYNP-a6PlI3_wiv',
  'api_user_name': 'DFHGJHGVB',
  'api_user_password': '.$g8Y^vC,qDb5r.'
});

module.exports = {
  config: {
    name: "gethtml",
    version: "1.0",
    author: "Samir Thakuri",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Lấy HTML trang web",
      en: "Get HTML of a website"
    },
    longDescription: {
      vi: "Lấy HTML trang web và lưu vào Pastebin",
      en: "Get HTML of a website and save it to Pastebin"
    },
    category: "👥 | Member",
    guide: {
      vi: "{pn} <link-trang-web>",
      en: "{pn} <website-link>"
    }
  },

  langs: {
    vi: {
      success: "HTML trang web đã được lưu vào Pastebin, bạn có thể xem tại đây: %1",
      error: "Có lỗi xảy ra khi lấy HTML trang web."
    },
    en: {
      success: "HTML of the website has been saved to Pastebin, you can view it here: %1",
      error: "An error occurred while fetching HTML of the website."
    }
  },

  onStart: async function ({ api, args, message, event, getLang }) {
    const siteURL = args[0];

    if (!siteURL) {
      message.reply(getLang("error"));
      return;
    }

    try {
      // Fetch the HTML of the website
      const response = await fetch(`https://image.restfulapi.repl.co/html?site=${siteURL}`);
      const html = await response.text();

      // Upload HTML to Pastebin
      const pasteName = `HTML_${Date.now()}`;
      const pasteResponse = await pastebin.createPaste({
        text: html,
        title: pasteName,
        format: null, // Let Pastebin detect the format
        privacy: 1, // Public
        expiration: '1W' // Expires in 1 week
      });

      // Send the Pastebin URL
      const pasteURL = pasteResponse;
      message.reply(getLang("success", pasteURL));
    } catch (error) {
      console.error(error);
      message.reply(getLang("error"));
    }
  }
};
