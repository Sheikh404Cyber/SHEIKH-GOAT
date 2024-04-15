const axios = require("axios");
const { getStreamFromURL } = global.utils;

module.exports = {
    config: {
        name: "niji",
        aliases: ["nijijourney", "art"],
        version: "1.0",
        author: "rehat--",
        countDown: 0,
        role: 0,
        longDescription: "Text to Image",
        category: "ai",
        guide: {
            en: "{pn} prompt --ar [ratio] or reply an image\n\n Example: {pn} 1girl, cute face, masterpiece, best quality --ar 16:9\n[ default 1:1 ]"
        }
    },

    onStart: async function({ api, args, message, event }) {
        try {
            let prompt = "";
            let imageUrl = "";
            let aspectRatio = ""; 

            const aspectIndex = args.indexOf("--ar");
            if (aspectIndex !== -1 && args.length > aspectIndex + 1) {
                aspectRatio = args[aspectIndex + 1];
                args.splice(aspectIndex, 2); 
            }

            if (event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments.length > 0 && ["photo", "sticker"].includes(event.messageReply.attachments[0].type)) {
                imageUrl = encodeURIComponent(event.messageReply.attachments[0].url);
            } else if (args.length === 0) {
                message.reply("Please provide a prompt or reply to an image.");
                return;
            }
            
            if (args.length > 0) {
                prompt = args.join(" ");
            }

            
            let apiUrl = `https://project-niji.onrender.com/api/v1/generate?prompt=${encodeURIComponent(prompt)}.&aspectRatio=${aspectRatio}&apikey=rehat`;
            if (imageUrl) {
                apiUrl += `&imageUrl=${imageUrl}`;
            }

            const processingMessage = await message.reply("Please wait...⏳");
            const response = await axios.post(apiUrl);
            const img = response.data.url;

            await message.reply({
                attachment: await getStreamFromURL(img)
            });

        } catch (error) {
            console.error(error);
            message.reply("An error occurred.");
        }
    }
};
