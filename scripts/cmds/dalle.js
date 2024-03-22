const axios = require('axios');
const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "bing",
    aliases: ["dalle"],
    version: "2.0",
    author: "RUBISH",
    countDown: 5,
    role: 0,
    longDescription: {
      en: "Latest DALL·E 3 image generator",
    },
    guide: {
      en: "{pn} 'prompt' ",
    },
    category: "Bing",
  }, 
  onStart: async function ({ message, event, api, args }) {
    const q = args.join(" ");
        const permission = global.GoatBot.config.vipUser;
    if (!permission.includes(event.senderID)) {
      api.sendMessage(q, event.threadID, event.messageID);
      return;
    }
    try {
      if (args.length === 0) {
        await message.reply("⚠ | Please provide a prompt.");
        return;
      }

      const prompt = args.join(" ");
      const encodedPrompt = encodeURIComponent(prompt);
      const apiKey = "rubish69";
      const cookies = [
"1WIC5qD_DRlZJlrpj-aF-pw4aA6hfWTA__05tcS3r_b_NBD7ipSHz8Ao7ggyIl3R9MTsdBH9Od8cY1BqSXT0oR8uU-hJ3IbYbPmu3M4eaH6nufOyjkiNE1e0Xy5fnR-XLmISaRdMmaOGJt2eLzGFDNjHwChuH9bxmcuv4G-aTVwpcQvK4tOAe1l8mTe4qI5kYjQ3YtXlJfNVPmmMf8toJ78YgU7Xd3bp9EgMjMWTrL4Y",
"ADD BING _U COOKIES HERE",
"ADD BING _U COOKIES HERE",
"ADD BING _U COOKIES HERE"
]; 

      const randomCookie = cookies[Math.floor(Math.random() * cookies.length)];

      // TAKE FULL API LINK FROM CMD & API OWNER RUBISH OWTHERWISE IT WON'T BE WORKING...
      const apiURL = `https://dall-e-3-rubish.onrender.com/api/gen-img-url?prompt=${encodedPrompt}&cookie=${randomCookie}&apiKey=${apiKey}`;

      const startTime = Date.now();
      const processingMessage = await message.reply(`
⏳ | Processing your imagination

❏ Prompt: ${prompt}

❏ Please wait a few seconds...`);

      const response = await axios.get(apiURL);

      const endTime = Date.now();
      const processingTimeInSeconds = ((endTime - startTime) / 1000).toFixed(2);

      const data = response.data;
      if (!data.imageLinks || data.imageLinks.length === 0) {
        if (data.errorMessage === "Invalid API key") {
          await message.reply("⚠ | Invalid API key. Please check your API key and try again.");
        } else {
          await message.reply(`
⭕ | No images found for the 

❏ prompt: ${prompt}. 

❏ Please try again.`);
        }
        return;
      }

      const attachment = await Promise.all(data.imageLinks.map(async (imgURL) => {
        const imgStream = await getStreamFromURL(imgURL);
        return imgStream;
      }));

      await message.reply({
        body: `
✅ | Here are the images for..

❏ Prompt: "${prompt}" 

❏ Processing Time: ${processingTimeInSeconds}s`,
        attachment: attachment,
      });

      message.unsend((await processingMessage).messageID);
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 401) {
        await message.reply("⚠ | Unauthorized your API key \n\nContact with Rubish for a new apikey");
      } else if (error.response && error.response.data) {
        const responseData = error.response.data;

        if (responseData.errorMessage === "Pending") {
          await message.reply("⚠ | This prompt has been blocked by Bing. Please try again with another prompt.");
        } else if (typeof responseData === 'object') {
          const errorMessages = Object.entries(responseData).map(([key, value]) => `${key}: ${value}`).join('\n');
          await message.reply(`⚠ | Server error details:\n\n${errorMessages}`);
        } else if (error.response.status === 404) {
          await message.reply("⚠ | The DALL·E 3 API endpoint was not found. Please check the API URL.");
        } else {
          await message.reply(`⚠ | Rubish dalle -3 server busy now\n\nPlease try again later`);
        }
      } else {
        await message.reply("⚠ | An unexpected error occurred. Please try again later.");
      }
    }
  }
};
