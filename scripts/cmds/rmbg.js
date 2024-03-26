const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs-extra');
const path = require('path');
const {image} = require('image-downloader');
module.exports = {
  config: {
    name: 'removebg',
    aliases: ['rbg', 'rmbg'],
    version: '1.0',
    author: 'Samir',
    countDown: 20,
    role: 0,
    shortDescription: 'Remove photo background',
    longDescription: 'Remove photo background',
    category: '🔥 | Premium',
    guide: '{pn} [Reply to the image] or {pn} [image URL]',
  },
  onStart: async function ({ event, api, args }) {
    try {
        if (event.type !== "message_reply") return api.sendMessage("Please reply to the image.", event.threadID, event.messageID);
        if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("Please reply to the image.", event.threadID, event.messageID);
        if (event.messageReply.attachments[0].type != "photo") return api.sendMessage("No image detected, Only reply to image", event.threadID, event.messageID);

        const content = (event.type == "message_reply") ? event.messageReply.attachments[0].url : args.join(" ");
        const KeyApi = ["y5K9ssQnhr8sB9Tp4hrMsLtU","s6d6EanXm7pEsck9zKjgnJ5u","GJkFyR3WdGAwn8xW5MDYAVWf","xHSGza4zdY8KsHGpQs4phRx9","ymutgb6hEYEDR6xUbfQUiPri","m6AhtWhWJBAPqZzy5BrvMmUp","ZLTgza4FPGii1AEUmZpkzYb7"]
        const inputPath = path.resolve(__dirname, 'cache', `photo.png`);
         await image({
        url: content, dest: inputPath
    });
        const formData = new FormData();
        formData.append('size', 'auto');
        formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));
        axios({
            method: 'post',
            url: 'https://api.remove.bg/v1.0/removebg',
            data: formData,
            responseType: 'arraybuffer',
            headers: {
                ...formData.getHeaders(),
                'X-Api-Key': KeyApi[Math.floor(Math.random() * KeyApi.length)],
            },
            encoding: null
        })
            .then((response) => {
                if (response.status != 200) return console.error('Error:', response.status, response.statusText);
                fs.writeFileSync(inputPath, response.data);
                return api.sendMessage({ attachment: fs.createReadStream(inputPath) }, event.threadID, () => fs.unlinkSync(inputPath));
            })
            .catch((error) => {
                return console.error('Request failed:', error);
            });
     } catch (e) {
        console.log(e)
        return api.sendMessage(`An error occured in the api while fetching.`, event.threadID, event.messageID);
  }
  },
};
