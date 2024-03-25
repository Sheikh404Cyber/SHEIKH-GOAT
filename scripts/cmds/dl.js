const axios = require("axios");
const fs = require('fs');
module.exports = {
config: {
  name: "xnxsearch",
  aliases: [`xnxsrc`, `xnxs`, `xnxx`],
  version: "1.0",
  author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
  countDown: 0,
  role: 0,
  shortDescription: "Search X'N'X'X videos",
  longDescription: "Search X'N'X'X videos",
  category: "⛔ | 18+",
  guide: "{pn} [query]"
},



  onStart: async function ({ api, event, args, message }) {
    const permission = global.GoatBot.config.vipUser;
    if (!permission.includes(event.senderID)) {
      api.sendMessage("You don't have enough permission to use this command. Only VIP Users Have Access.", event.threadID, event.messageID);
      return;
    }

    const query = args.join(" ");
    if (!query) {
      return message.reply("❎ | Please provide a query...");
    }


    { api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      }


    try {
      const { data } = await axios.get(`https://cornquery.onrender.com/kshitiz?q=${encodeURIComponent(query)}`);

      if (!data.links || data.links.length === 0) {
        throw new Error("❌ | No video found for the provided query.");
      }
      const p = global.GoatBot.config.prefix;
      const aa = {
       one: data.links[0],
       two: data.links[1],
       three: data.links[2],
       four: data.links[3],
       five: data.links[4],
       six: data.links[5],
       seven: data.links[6],
       eight: data.links[7],
       nine: data.links[8],
       ten: data.links[9],
       eleven: data.links[10],
       tweelve: data.links[11]
    };

        const d = `
🥵 | Your query: "${query}"

🔰 | ❶. ${aa.one}

🔰 | ❷. ${aa.two}

🔰 | ❸. ${aa.three}

🔰 | ❹. ${aa.four}

🔰 | ❺. ${aa.five}

🔰 | ❻. ${aa.six}

🔰 | ❼. ${aa.seven}

🔰 | ❽. ${aa.eight}

🔰 | ❾. ${aa.nine}

🔰 | ❶⓿. ${aa.ten}

🔰 | ❶❶. ${aa.eleven}

🔰 | ❶❷. ${aa.tweelve}

`;
      const replyMessage = await message.reply({
        body: `
${d}

✅ | You can Download video by using 'xnxdl' cmd...

🔰 | Example: ${p}xnxdl <link> 

ℹ️ | For more info use ${p}help xnxdl


☂ | Reply to this message to unsend it.
`,
      });

      const down = {
        commandName: this.config.name,
        messageID: replyMessage.messageID,
        tracks: aa,
        currentIndex: 12,
        originalQuery: query,
      };
      global.GoatBot.onReply.set(replyMessage.messageID, down);
    } catch (error) {
      console.error(error);
      api.sendMessage(error, event.threadID);
    }
  },

  onReply: async function ({ api, event, Reply, args, message }) {
    const userInput = args[0].toLowerCase();
    const { tracks, currentIndex, originalQuery, previousMessageID, isFirstReply } = Reply;

    message.unsend(Reply.messageID);

    if (!isFirstReply && previousMessageID && userInput === !event.body) {

      if (!event.messageReply || event.messageReply.senderID !== api.getCurrentUserID()) {
        message.unsend(previousMessageID);
      }
    }

    if (userInput === !event.body) {
      const q = event.body.toLowerCase();
      const nextUrl = `https://api-samir.onrender.com/spotifysearch?q=${encodeURIComponent(q)}`;

      try {
        const response = await axios.get(nextUrl);
        const nextTracks = response.data.data.slice(currentIndex, currentIndex + 5);

        if (nextTracks.length === 0) {
          return message.reply("❌ | No more video found for the given query.");
        }

        const trackInfo = nextTracks.map((track, index) =>
          `${currentIndex + index + 1}`
        ).join("\n\n");

        message.reply({
          body: `☂ | ${trackInfo}\n\n☂ | Rreply with a number to choose.`,
        }, async (replyError, replyMessage) => {
          const data = {
            commandName: this.config.name,
            messageID: replyMessage.messageID,
            tracks: aa,
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

      const downloadingMessage = await message.reply(`⏳ | Downloading Video "${selectedTrack.links}"`);

      const downloadUrl = 'https://all-in-one-api-by-faheem.replit.app/api/download/xnxx?url=' + encodeURIComponent(selectedTrack);

      try {
        const response = await axios.get(downloadUrl);
        
        if (response.data.success === false) {
          return message.reply("error");
        }

        if (response.data.success === true) {
        const vid = response.data.result.url;
          fs.writeFileSync(__dirname + '/cache/xnxx.mp4', Buffer.from(vid.data, 'binary'));

        const Time = response.data.processed;
        const title = response.data.result.title;
        const views = response.data.result.views;
        const likes = response.data.result.duration;
        const quality = response.data.result.quality;

          message.reply({
            body: `♻Command By ♪♪ 𝐀𝐒𝐈𝐅 𝐱𝟔𝟗 ♪♪\n\n🈴Title: ${title}\n🕕Processing Time: ${Time}\n💌Views: ${views}\n🕐Duration: ${likes}\n📺Quality: ${quality}`,
            attachment: fs.createReadStream(__dirname + '/cache/xnxx.mp4'),
          },
            event.threadID,
            () => fs.unlinkSync(filename), event.messageID);
        }
      } catch (error) {
        console.error(error);
        message.reply("❎ | Sorry, an error occurred while processing your request.");
      }

      message.unsend(downloadingMessage.messageID);
    }
  }

};
