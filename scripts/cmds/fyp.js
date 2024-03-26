const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function getStreamFromURL(url) {
  const response = await axios.get(url, { responseType: 'stream' });
  return response.data;
}

module.exports = {
  config: {
    name: "tiktok",
    version: "1.0",
    author: "kshitiz",
    countDown: 15,
    role: 1,
    shortDescription: "random videos",
    longDescription: {
      en: "random videos from tiktok"
    },
    category: "🎬 | Media",
    guide: {
      en: "{p}{n}"
    }
  },

 async onStart({ api, event }) {
    const videos = await fetchTikTokVideos(searchQuery);
    const getRandomQuery = () => {
      const queries = ["#messiedits", "#badgirls", "animeedit", "rodeodancegirls", "#kinktok", "lyricseditvibe3", "messiedits", "ronaldoedits", "#memebangladesh", "deepthoughtss44", "mr.bishal_editz", "ruth_prashant", "ichijou_7", "peace_quote1"];
      const randomIndex = Math.floor(Math.random() * queries.length);
      return queries[randomIndex];
    };

    const searchAndSendVideo = async (threadID) => {
      const searchQuery = getRandomQuery();
      
        const options = {
          method: 'GET',
          url: 'https://tiktok-scraper7.p.rapidapi.com/feed/search',
          params: {
            keywords: searchQuery,
            region: 'bd',
            count: '1',
            cursor: '0',
            publish_time: '0',
            sort_type: '0'
          },
          headers: {
            'X-RapidAPI-Key': 'b38444b5b7mshc6ce6bcd5c9e446p154fa1jsn7bbcfb025b3b',
            'X-RapidAPI-Host': 'tiktok-scraper7.p.rapidapi.com'
          },
          };

        try {
          const response = await axios.request(options);
        const videos = response.data.data.videos;

        if (!videos || videos.length === 0) {
          api.sendMessage(`No TikTok videos found for the query: ${searchQuery}`, threadID);
        } else {
          const videoData = videos[0];
          const videoUrl = videoData.play;
          const message = `Random Tiktok video🥱`;
          const filePath = path.join(__dirname, `/cache/tiktok_video_${threadID}.mp4`);
          const writer = fs.createWriteStream(filePath);

          const videoResponse = await axios({ method: 'get', url: videoUrl, responseType: 'stream' });
          videoResponse.data.pipe(writer);

          writer.on('finish', async () => {
            await api.sendMessage({
              body: message,
              attachment: fs.createReadStream(filePath)
            }, threadID);
            fs.unlinkSync(filePath);
          });
        }
      } catch (error) {
        console.error('Error:', error);
        api.sendMessage("An error occurred while processing the request.", threadID);
      }
    };

    try {
      const threadID = event.threadID;
      await searchAndSendVideo(threadID);
    } catch (error) {
      console.error('Error:', error);
    }
  },
};
