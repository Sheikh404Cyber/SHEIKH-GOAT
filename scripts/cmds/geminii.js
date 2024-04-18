const axios = require('axios');
const FormData = require('form-data');

module.exports = {
    config: {
        name: "gemini3",
        version: "1.0",
        author: "Samir Thakuri",
        countDown: 5,
        role: 0,
        shortDescription: "Chat with Gemini API",
        longDescription: "Chat with Gemini API",
        category: "📖 | Education",
        guide: {
            en: "{pn} <query> - Chat with Gemini"
          + "\n{pn} clear - To clear the chat history"
          + "\n{pn} <query> + reply to images - To interact with Gemini pro vision"
          + "\nAlso supports onReply."
        }
    },

    onStart: async function ({ message, event, args, commandName }) {
        const userID = event.senderID;
        const query = args.join(" ");
        const apiKey = "samir";

        const processResponse = async (response) => {
            try {
                const geminiResponse = response.data;
                await message.reply(
                    {
                        body: `${geminiResponse.response}`
                    },
                    (err, info) => {
                        global.GoatBot.onReply.set(info.messageID, {
                            commandName,
                            messageID: info.messageID,
                            author: event.senderID
                        });
                    }
                );
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        const uploadImagesToImgbb = async () => {
            const attachments = event.messageReply.attachments;
            const imageLinks = [];

            try {
                for (let attachment of attachments) {
                    const link = attachment.url;
                    const response = await axios.get(link, { responseType: 'arraybuffer' });
                    const formData = new FormData();
                    formData.append('image', Buffer.from(response.data, 'binary'), { filename: 'image.png' });
                    const res = await axios.post('https://api.imgbb.com/1/upload', formData, {
                        headers: formData.getHeaders(),
                        params: {
                            key: 'e6a573af64fc40a0b618acccd6677b74' // Your imgbb API key
                        }
                    });
                    const imageLink = res.data.data.url;
                    imageLinks.push(imageLink);
                }

                return imageLinks;
            } catch (error) {
                console.error("Error:", error.message);
                return null;
            }
        };

        if (event.messageReply) {
            const imageLinks = await uploadImagesToImgbb();
            if (!imageLinks || imageLinks.length === 0) {
                return message.reply("Failed to upload one or more images to imgbb. Please try again later.");
            }

            try {
                const imageUrlParams = imageLinks.map(link => `imageurl=${encodeURIComponent(link)}`).join('&');
                const response = await axios.get(`https://samirapi.replit.app/geminiv2?prompt=${encodeURIComponent(query)}&${imageUrlParams}&apikey=${apiKey}`);
                await processResponse(response);
            } catch (error) {
                console.error("Error:", error.message);
                await message.reply("An error occurred while processing your request. Please try again later.");
            }
        } else {
            try {
                const response = await axios.get(`https://samirapi.replit.app/gemini?query=${encodeURIComponent(query)}&chatid=${userID}&apikey=${apiKey}`);
                await processResponse(response);
            } catch (error) {
                console.error("Error:", error.message);
                await message.reply("An error occurred while processing your request. Please try again later.");
            }
        }
    },

  onReply: async function ({ message, event, Reply, args }) {
      let { author, commandName, messageID } = Reply;
      if (event.senderID != author) return;

      const userID = event.senderID;
      const query = args.join(" ");
      const apiKey = "samir";

      const processResponse = async (response) => {
          try {
              const geminiResponse = response.data;
              await message.reply(
                  {
                      body: `${geminiResponse.response}`
                  },
                  (err, info) => {
                      global.GoatBot.onReply.set(info.messageID, {
                          commandName,
                          messageID: info.messageID,
                          author: event.senderID
                      });
                  }
              );
          } catch (error) {
              console.error("Error:", error.message);
          }
      };

      try {
          const response = await axios.get(`https://samirapi.replit.app/gemini?query=${encodeURIComponent(query)}&chatid=${userID}&apikey=${apiKey}`);
          await processResponse(response);
      } catch (error) {
          console.error("Error:", error.message);
          await message.reply("An error occurred while processing your request. Please try again later.");
      }
  }
};
