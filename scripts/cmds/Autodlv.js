const fs = require("fs-extra");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
  threadStates: {},
  config: {
    name: 'autolink',
    version: '1.0',
    author: 'Kshitiz',
    countDown: 5,
    role: 0,
    shortDescription: 'Auto video downloader for Instagram, Facebook, and TikTok',
    longDescription: '',
    category: 'media',
    guide: {
      en: '{p}{n}',
    }
  },
  onStart: async function ({ api, event }) {
    const threadID = event.threadID;

    if (!this.threadStates[threadID]) {
      this.threadStates[threadID] = {};
    }

    if (event.body.toLowerCase().includes('autolink')) {
      api.sendMessage("ᴀᴜᴛᴏʟɪɴᴋ ɪs ᴀᴄᴛɪᴠᴇ.", event.threadID, event.messageID);
    }
  },
  onChat: async function ({ api, event }) {
    if (this.checkLink(event.body)) {
      const { url } = this.checkLink(event.body);
      console.log(`Attempting to download from URL: ${url}`);
      this.downLoad(url, api, event);
      api.setMessageReaction("💐", event.messageID, (err) => {}, true);
    }
  },
  downLoad: function (url, api, event) {
    const time = Date.now();
    const path = __dirname + `/cache/${time}.mp4`;

   
    if (url.includes("instagram")) {
      this.downloadInstagram(url, api, event, path);
    } else if (url.includes("facebook")) {
      this.downloadFacebook(url, api, event, path);
    } else if (url.includes("tiktok")) {
      this.downloadTikTok(url, api, event, path);
    }
  },
  downloadInstagram: function (url, api, event, path) {
    this.getLink(url, api, event, path).then(res => {
      axios({
        method: "GET",
        url: res,
        responseType: "arraybuffer"
      }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        if (fs.statSync(path).size / 1024 / 1024 > 25) {
          return api.sendMessage("The file is too large, cannot be sent", event.threadID, () => fs.unlinkSync(path), event.messageID);
        }
        api.sendMessage({
          body: "Successful Download!",
          attachment: fs.createReadStream(path)
        }, event.threadID, () => fs.unlinkSync(path), event.messageID);
      }).catch(err => console.error(err));
    }).catch(err => console.error(err));
  },
  downloadFacebook: function (url, api, event, path) {
    fbDownloader(url).then(res => {
      if (res.success && res.download && res.download.length > 0) {
        const videoUrl = res.download[0].url;
        axios({
          method: "GET",
          url: videoUrl,
          responseType: "stream"
        }).then(res => {
          if (res.headers['content-length'] > 87031808) {
            return api.sendMessage("The file is too large, cannot be sent", event.threadID, () => fs.unlinkSync(path), event.messageID);
          }
          res.data.pipe(fs.createWriteStream(path));
          res.data.on('end', () => {
            api.sendMessage({
              body: "𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋𝐘 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐃 𝐘𝐎𝐔𝐑 𝐕𝐈𝐃𝐄𝐎!📛",
              attachment: fs.createReadStream(path)
            }, event.threadID, () => fs.unlinkSync(path), event.messageID);
          });
        }).catch(err => console.error(err));
      } else {
        api.sendMessage("𝑭𝒂𝒊𝒍𝒆𝒅 𝒕𝒐 𝒅𝒐𝒘𝒏𝒍𝒐𝒂𝒅 𝑭𝒂𝒄𝒆𝒃𝒐𝒐𝒌 𝒗𝒊𝒅𝒆𝒐❌", event.threadID, event.messageID);
      }
    }).catch(err => console.error(err));
  },
  downloadTikTok: function (url, api, event, path) {
    this.getLink(url, api, event, path).then(res => {
      axios({
        method: "GET",
        url: res,
        responseType: "arraybuffer"
      }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        if (fs.statSync(path).size / 1024 / 1024 > 25) {
          return api.sendMessage("𝚃𝚑𝚎 𝚏𝚒𝚕𝚎 𝚒𝚜 𝚝𝚘𝚘 𝚕𝚊𝚛𝚐𝚎, 𝚌𝚊𝚗𝚗𝚘𝚝 𝚋𝚎 𝚜𝚎𝚗𝚝⛔", event.threadID, () => fs.unlinkSync(path), event.messageID);
        }
        api.sendMessage({
          body: "𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋𝐘 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐃 𝐘𝐎𝐔𝐑 𝐕𝐈𝐃𝐄𝐎!📛",
          attachment: fs.createReadStream(path)
        }, event.threadID, () => fs.unlinkSync(path), event.messageID);
      }).catch(err => console.error(err));
    }).catch(err => console.error(err));
  },
  getLink: function (url, api, event, path) {
    return new Promise((resolve, reject) => {
      if (url.includes("instagram")) {
        axios({
          method: "GET",
          url: `https://www.api.vyturex.com/alldl?query=${encodeURIComponent(url)}`
        })
        .then(res => {
          console.log(`API Response: ${JSON.stringify(res.data)}`);
          if (res.data.status && res.data.data && res.data.data.data.length > 0) {
            const videoUrl = res.data.data.data[0].url;
            resolve(videoUrl);
          } else {
            reject(new Error("𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚎 𝚏𝚛𝚘𝚖 𝚝𝚑𝚎 𝙰𝙿𝙸!⚠"));
          }
        })
        .catch(err => reject(err));
      } else if (url.includes("facebook")) {
        fbDownloader(url).then(res => {
          if (res.success && res.download && res.download.length > 0) {
            const videoUrl = res.download[0].url;
            resolve(videoUrl);
          } else {
            reject(new Error("𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚎 𝚏𝚛𝚘𝚖 𝚝𝚑𝚎 𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔 𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚎𝚛!⚠"));
          }
        }).catch(err => reject(err));
      } else if (url.includes("tiktok")) {
        axios({
          method: "GET",
          url: `https://www.api.vyturex.com/alldl?query=${url}`
        }).then(res => resolve(res.data.data.play)).catch(err => reject(err));
      }
    });
  },
  checkLink: function (url) {
    if (url.includes("instagram") || url.includes("facebook") || url.includes("tiktok")) {
      return {
        url: url
      };
    }
    return null;
  }
};

async function fbDownloader(url) {
  try {
    const response1 = await axios({
      method: 'POST',
      url: 'https://snapsave.app/action.php?lang=vn',
      headers: {
        "accept": "*/*",
          "accept-language": "vi,en-US;q=0.9,en;q=0.8",
          "content-type": "multipart/form-data",
          "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Microsoft Edge\";v=\"110\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "Referer": "https://snapsave.app/vn",
          "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      data: {
        url
      }
    });

    console.log('Facebook Downloader Response:', response1.data);

    let html;
    const evalCode = response1.data.replace('return decodeURIComponent', 'html = decodeURIComponent');
    eval(evalCode);
    html = html.split('innerHTML = "')[1].split('";\n')[0].replace(/\\"/g, '"');

    const $ = cheerio.load(html);
    const download = [];

    const tbody = $('table').find('tbody');
    const trs = tbody.find('tr');

    trs.each(function (i, elem) {
      const trElement = $(elem);
      const tds = trElement.children();
      const quality = $(tds[0]).text().trim();
      const url = $(tds[2]).children('a').attr('href');
      if (url != undefined) {
        download.push({
          quality,
          url
        });
      }
    });

    return {
      success: true,
      video_length: $("div.clearfix > p").text().trim(),
      download
    };
  } catch (err) {
    console.error('Error in Facebook Downloader:', err);
    return {
      success: false
    };
  }
}
