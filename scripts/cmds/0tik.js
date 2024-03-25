const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');
const request = require('request');

let sentTikTokVideos = [];

module.exports = {
  config: {
    name: "tik2",
    aliases: ["tiktok2"],
    author: "GoatBot",
    version: "1.0",
    shortDescription: {
      en: "Get TikTok user information or view videos by username or user ID",
    },
    longDescription: {
      en: "Get TikTok information by providing the username or view posts by providing the user ID.",
    },
    category: "⏳ | Downloader",
    guide: {
      en: "{p}tik stalk {username or userID} or {p}tik post {username or userID}",
    },
  },
  onStart: async function ({ api, event, args }) {
    const subCommand = args[0];
    const identifier = args.slice(1).join(' ');

    if (!subCommand || !identifier) {
      api.sendMessage({ body: 'Invalid command. Please use {p}tik stalk {username or userID} or {p}tik post {username or userID}' }, event.threadID, event.messageID);
      return;
    }

    if (subCommand.toLowerCase() === 'stalk') {
      try {
        const userInfo = await fetchTikTokUserInfo(identifier);

        if (!userInfo) {
          api.sendMessage({ body: `No TikTok information found for the username or user ID: ${identifier}.` }, event.threadID);
          return;
        }

        const message = `✰ *Username:* ${userInfo.uniqueId}
✰ *Full Name:* ${userInfo.nickname}
✰ *Signature:* ${userInfo.signature}
✰ *Total Follower:* ${userInfo.followerCount}
✰ *Following:* ${userInfo.followingCount}
✰ *Total Profile Heart:* ${userInfo.heartCount}
✰ *Total Videos:* ${userInfo.videoCount}
✰ *Digg Count:* ${userInfo.diggCount}
✰ *Private Account:* ${userInfo.privateAccount ? 'Yes' : 'No'}
✰ *Private Item:* ${userInfo.privateItem ? 'Yes' : 'No'}
✰ *Verified:* ${userInfo.verified ? 'Yes' : 'No'}
✰ *ID:* ${userInfo.id}
✰ *Heart:* ${userInfo.heart}
Type {p}tik post ${userInfo.id} to see this user posts`;

        api.sendMessage({ body: message, attachment: await global.utils.getStreamFromURL(userInfo.avatar) }, event.threadID, event.messageID);
      } catch (error) {
        console.error(error);
        api.sendMessage({ body: 'An error occurred while fetching TikTok information.\nPlease try again later.' }, event.threadID, event.messageID);
      }
    } else if (subCommand.toLowerCase() === 'post') {
      try {
        const videos = await fetchTikTokUserVideos(identifier);

        if (!videos || videos.length === 0) {
          api.sendMessage({ body: `Are you sure you provided uid not username: ${identifier}.` }, event.threadID, event.messageID);
          return;
        }

        const videoTitles = videos.map((video, index) => `${index + 1}. ${video.title}`);
        const message = `Choose a video by replying with its number:\n\n${videoTitles.join('\n')}\n\n`;

        const tempFilePath = path.join(os.tmpdir(), 'tik_response.json');
        fs.writeFileSync(tempFilePath, JSON.stringify(videos));

        api.sendMessage({ body: message }, event.threadID, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: 'tik',
            messageID: info.messageID,
            author: event.senderID,
            tempFilePath,
          });
        });
      } catch (error) {
        console.error(error);
        api.sendMessage({ body: 'An error occurred while fetching TikTok videos.\nPlease try again later.' }, event.threadID);
      }
    } else {
      api.sendMessage({ body: 'Invalid subcommand. Please use {p}tik stalk {username or userID} or {p}tik post {username or userID}' }, event.threadID);
    }
  },
  onReply: async function ({ api, event, Reply, args }) {
    const { author, commandName, tempFilePath } = Reply;

    if (event.senderID !== author || !tempFilePath) {
      return;
    }

    const videoIndex = parseInt(args[0], 10);

    if (isNaN(videoIndex) || videoIndex <= 0) {
      api.sendMessage({ body: 'Invalid input.\nPlease provide a valid number.' }, event.threadID, event.messageID);
      return;
    }

    try {
      const videos = JSON.parse(fs.readFileSync(tempFilePath, 'utf-8'));

      if (!videos || videos.length === 0 || videoIndex > videos.length) {
        api.sendMessage({ body: 'Invalid video number.\nPlease choose a number within the range.' }, event.threadID, event.messageID);
        return;
      }

      const selectedVideo = videos[videoIndex - 1];
      const videoUrl = selectedVideo.play;

      if (!videoUrl) {
        api.sendMessage({ body: 'Error: Video URL not found.' }, event.threadID, event.messageID);
        return;
      }

      const tempVideoPath = path.join(os.tmpdir(), 'tik_video.mp4');
      await downloadVideo(videoUrl, tempVideoPath);

      await api.sendMessage({
        body: `Here is the TikTok video:\n${selectedVideo.desc || 'No Description'}`,
        attachment: fs.createReadStream(tempVideoPath),
      }, event.threadID, event.messageID);

      fs.unlinkSync(tempVideoPath);
    } catch (error) {
      console.error(error);
      api.sendMessage({ body: 'An error occurred while processing the video.\nPlease try again later.' }, event.threadID, event.messageID);
    } finally {
      fs.unlinkSync(tempFilePath);
      global.GoatBot.onReply.delete(event.messageID);
    }
  },
};

async function fetchTikTokUserInfo(usernameOrID) {
  const response = await axios.get(`https://www.nguyenmanh.name.vn/api/tikInfo?query=${usernameOrID}&apikey=FSShCQne`);
  return response.data.result;
}

async function downloadVideo(videoUrl, destination) {
  return new Promise((resolve, reject) => {
    const stream = request(videoUrl).pipe(fs.createWriteStream(destination));
    stream.on('finish', () => resolve(destination));
    stream.on('error', reject);
  });
}

async function fetchTikTokUserVideos(usernameOrID) {
  const options = {
    method: 'GET',
    url: 'https://tiktok-scraper7.p.rapidapi.com/user/posts',
    params: {
      user_id: usernameOrID,
      count: '10',
    },
    headers: {
      'X-RapidAPI-Key': 'ece5655ae3msh55483dd9d60402fp12e36ajsn5adc6b59bc68',
      'X-RapidAPI-Host': 'tiktok-scraper7.p.rapidapi.com',
    },
  };
  try {
    const response = await axios.request(options);
    return response.data.data.videos;
  } catch (error) {
    console.error(error);
    return null;
  }
}
