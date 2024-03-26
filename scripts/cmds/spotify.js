const axios = require("axios");
const fs = require('fs');
module.exports = {
config: {
  name: "spotify",
  aliases: [`spotifydl`],
  version: "1.0",
  author: "Samir Œ",
  countDown: 0,
  role: 0,
  shortDescription: "Get audio  from Spotify",
  longDescription: "Get audio  from Spotify",
  category: "🎬 | Media",
  guide: "{pn} reply or add link of image"
},



  onStart: async function ({ api, event, args, message }) {
    const query = args.join(" ");

    if (!query) {
      return message.reply(" Please provide a track name.");
    }

    const url = 'https://api-samir.onrender.com/spotifysearch?q=' + encodeURIComponent(query);

    try {
      const response = await axios.get(url);
      const tracks = response.data.data;

      if (tracks.length === 0) {
        return message.reply("❌ | No tracks found for the given query.");
      }

      const shuffledTracks = tracks.sort(() => Math.random() - 0.5);
      const top5Tracks = shuffledTracks.slice(0, 5);

      const trackInfo = top5Tracks.map((track, index) =>
        `🔰 | ${index + 1}. ${track.title}\nPopularity: ${track.popularity}\nArtist: ${track.artist}`
      ).join("\n\n");

      const replyMessage = await message.reply({
        body: `☂ | ${trackInfo}\n\nType 'next' to see more tracks or reply with a number to choose.`,
      });

      const data = {
        commandName: this.config.name,
        messageID: replyMessage.messageID,
        tracks: top5Tracks,
        currentIndex: 5,
        originalQuery: query,
      };
      global.GoatBot.onReply.set(replyMessage.messageID, data);
    } catch (error) {
      console.error(error);
      api.sendMessage("❎ | Error: " + error, event.threadID);
    }
  },

  onReply: async function ({ api, event, Reply, args, message }) {
    const userInput = args[0].toLowerCase();
    const { tracks, currentIndex, originalQuery, previousMessageID, isFirstReply } = Reply;

    message.unsend(Reply.messageID);
    
    if (!isFirstReply && previousMessageID && userInput === 'next') {
      
      if (!event.messageReply || event.messageReply.senderID !== api.getCurrentUserID()) {
        message.unsend(previousMessageID);
      }
    }

    if (userInput === 'next') {
      const nextUrl = `https://api-samir.onrender.com/spotifysearch?q=${encodeURIComponent(originalQuery)}`;

      try {
        const response = await axios.get(nextUrl);
        const nextTracks = response.data.data.slice(currentIndex, currentIndex + 5);

        if (nextTracks.length === 0) {
          return message.reply("❌ | No more tracks found for the given query.");
        }

        const trackInfo = nextTracks.map((track, index) =>
          `🔰 | ${currentIndex + index + 1}. ${track.title}\nPopularity: ${track.popularity}\nArtist: ${track.artist}`
        ).join("\n\n");

        message.reply({
          body: `☂ | ${trackInfo}\n\n☂ | Type 'next' to see more tracks or reply with a number to choose.`,
        }, async (replyError, replyMessage) => {
          const data = {
            commandName: this.config.name,
            messageID: replyMessage.messageID,
            tracks: response.data.data,
            currentIndex: currentIndex + 5,
            originalQuery: originalQuery,
            previousMessageID: replyMessage.messageID, 
            isFirstReply: false, 
          };
          global.GoatBot.onReply.set(replyMessage.messageID, data);
        });
      } catch (error) {
        console.error(error);
        api.sendMessage("❎ | Error: " + error, event.threadID);
      }
    } else if (!isNaN(userInput) && userInput >= 1 && userInput <= tracks.length) {
      const selectedTrack = tracks[userInput - 1];
      message.unsend(Reply.messageID);

      const downloadingMessage = await message.reply(`⏳ | Downloading track "${selectedTrack.title}"`);

      const downloadUrl = 'https://api-samir.onrender.com/spotifydl?url=' + encodeURIComponent(selectedTrack.url);

      try {
        const apiResponse = await axios.get(downloadUrl);

        if (apiResponse.data.success) {
          const metadata = apiResponse.data.metadata;
          const audioUrl = apiResponse.data.link;


          const audioResponse = await axios.get(audioUrl, { responseType: 'arraybuffer' });
          fs.writeFileSync(__dirname + '/cache/spotify.mp3', Buffer.from(audioResponse.data));

          message.reply({
            body: `• Title: ${metadata.title}\n• Album: ${metadata.album}\n• Artist: ${metadata.artists}\n• Released: ${metadata.releaseDate}`,
            attachment: fs.createReadStream(__dirname + '/cache/spotify.mp3')
          });
        } else {
          message.reply("❎ | Sorry, the Spotify content could not be downloaded.");
        }
      } catch (error) {
        console.error(error);
        message.reply("❎ | Sorry, an error occurred while processing your request.");
      }

      message.unsend(downloadingMessage.messageID);
    }
  }

};
