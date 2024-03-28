const fetch = require("node-fetch");
const { getStreamFromURL } = global.utils;

module.exports = {
    config: {
        name: "moviedl",
        version: "1.0",
        author: "Rishad",
        countDown: 25,
        role: 0,
        shortDescription: {
            en: "Get download links for a movie.",
        },
        longDescription: {
            en: "Miko will send you download links for the selected movie.",
        },
        category: "🎬 | Media",
        guide: {
            en: "{pn} The Return of Godzilla",
        },
    },
    onStart: async function ({ api, args, event }) {
        const movieName = args.join(" ");

        if (!movieName) {
            api.sendMessage("Please provide the name of the movie you want to search for.", event.threadID);
            return;
        }

        const searchUrl = `https://for-devs.onrender.com/api/movie/search?query=${encodeURIComponent(
            movieName
        )}&apikey=fuck`;

        try {
            const searchResponse = await fetch(searchUrl);
            const searchResults = await searchResponse.json();

            if (searchResults.length === 0) {
                api.sendMessage(`No results found for '${movieName}'. Please try again with a different movie name.`, event.threadID);
                return;
            }

            let replyMessage = "🔍 Search Results:\n\n";
            for (let i = 0; i < searchResults.length; i++) {
                const title = searchResults[i].title;
                replyMessage += `${i + 1}. ${title}\n\n`;
            }
            replyMessage += "Reply with the number of the movie you want to get download links for.";

            const reply = await api.sendMessage(replyMessage, event.threadID);
            const replyMessageID = reply.messageID;

            global.GoatBot.onReply.set(replyMessageID, {
                commandName: "moviedl",
                author: event.senderID,
                messageID: replyMessageID,
                results: searchResults,
            });
        } catch (error) {
            console.log(error);
            api.sendMessage("An error occurred while fetching movie information.", event.threadID);
        }
    },
    onReply: async function ({ event, api, Reply }) {
        const { author, messageID, results } = Reply;
    
        if (event.senderID !== author) return;
    
        const selectedNumber = parseInt(event.body);
    
        if (isNaN(selectedNumber) || selectedNumber <= 0 || selectedNumber > results.length) {
            api.sendMessage("Invalid option selected. Please reply with a valid number.", event.threadID);
            return;
        }
    
        const selectedMovie = results[selectedNumber - 1];
        const searchID = selectedMovie.searchID;
        const movieInfoUrl = `https://for-devs.onrender.com/api/movie/info?id=${searchID}&apikey=fuck`;
    
        try {
            const infoResponse = await fetch(movieInfoUrl);
            const movieInfo = await infoResponse.json();
    
            // Construct the response message with movie information and download links
            let infoMessage = `📜${movieInfo.Synopsis}\n\n`;
            infoMessage += `${movieInfo.FILE_INFORMATION}\n\n`;
    
            infoMessage += `⏬ Download Links:\n\n`;
            for (const download of movieInfo.Download_URLs) {
                infoMessage += ` 🔗Format: ${download.format}\n`;
                infoMessage += ` 📥URL: ${download.shortUrl}\n\n`;
            }
    
            // Send the response message
            const msgSend = await api.sendMessage(infoMessage, event.threadID);
        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while fetching movie information.", event.threadID);
        }
      },
    };
