const axios = require('axios');
const { getStreamFromURL } = global.utils;

  module.exports = {
    config: {
      name: "bing",
      aliases: ["dalle"],
      version: "2.0",
      author: "RUBISH",
      shortDescription: {
        en: "An AI-based image generator using DALL·E and Bing technology"
      },
      longDescription: {
        en: "Bing is an AI module that leverages the latest DALL·E 3 technology to generate images based on given prompts. It provides users with creative and unique images tailored to their inputs."
      },
      countDown: 30,
      role: 0,
      guide: {
        en: "{pn} 'prompt' ",
      },
      category: "🖼 | Image",
    },
  

  onStart: async function ({ message, args }) {
    try {
      if (args.length === 0) {
        await message.reply("⚠ | Please provide a prompt\n\nExample ► .dalle-bing A beautiful Girl");
        return;
      }

      const prompt = args.join(" ");
      const encodedPrompt = encodeURIComponent(prompt);
      const apiKey = "rubish69";
      const cookies = ["1WIC5qD_DRlZJlrpj-aF-pw4aA6hfWTA__05tcS3r_b_NBD7ipSHz8Ao7ggyIl3R9MTsdBH9Od8cY1BqSXT0oR8uU-hJ3IbYbPmu3M4eaH6nufOyjkiNE1e0Xy5fnR-XLmISaRdMmaOGJt2eLzGFDNjHwChuH9bxmcuv4G-aTVwpcQvK4tOAe1l8mTe4qI5kYjQ3YtXlJfNVPmmMf8toJ78YgU7Xd3bp9EgMjMWTrL4Y", //ghost

"1Jl7Ip5tIdpwQaOor4aBnASwKzLocBG_KrucXBmsv5M0TcNCn8PrEgxwQYCPwWTDlvsChAWrYJNYVdCR8qhfZjqGQSmfzGcaK26n0YllKuTEF25pp6azl9NMPpz_XLL0eMXgqITVsT_quQ2UJMAw-UPYt0sVt5lzMnwCrhLVRiuJOcGC_Khm7MgXRVweV7CBKa2hN8JuSV_JwyY3NjaI3iY0QnWYGGno8Ln3xFBPUlpQ" //mahi

]; 

      const randomCookie = cookies[Math.floor(Math.random() * cookies.length)];

      const apiURL = `https://dall-e-3-rubish-api.onrender.com/api/gen-img-url?prompt=${encodedPrompt}&cookie=${randomCookie}&apiKey=${apiKey}`;

      const startTime = Date.now();
      const processingMessage = await message.reply(`
⏳ | Processing your imagination

Prompt: ${prompt}

Please wait a few seconds...`);

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

Please try again.`);
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

Prompt: "${prompt}" 

Processing Time: ${processingTimeInSeconds}s`,
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
          await message.reply("⚠ | The DALL·E-3 API endpoint was not found. Please check the API URL.");
        } else {
          await message.reply(`⚠ | Rubish DALL·E-3 server busy now\n\nPlease try again later`);
        }
      } else {
        await message.reply("⚠ | An unexpected error occurred. Please try again later.");
      }
    }
  }
};
