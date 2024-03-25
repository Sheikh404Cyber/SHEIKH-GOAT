const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
 config: {
 name: "cdp2",
 aliases: ["coupledp2"],
 version: "1.0",
 author: "otinxsandip",
 countDown: 5,
 role: 0,
 shortDescription: {
 en: "couple dp"
 },
 longDescription: {
 en: "couple dp"
 },
 category: "🖼 | Image",
 guide: {
 en: "{n}"
 }
 },

  onStart: async function(){},
  onChat: async function({ message, event, args, commandName, api, usersData}) {
    const input = event.body;
          if(input && input.trim().toLowerCase().startsWith('cdp2') ||     input && input.trim().toLowerCase().startsWith('coupledp2')){
           const data = input.split(" ");
           data.shift();
    const prompt = data.join(" ");
 try {
 const { data } = await axios.get(
 "https://sandipapi.onrender.com/dp"
 );
 const maleImg = await axios.get(data.male, { responseType: "arraybuffer" });
 fs.writeFileSync(__dirname + "/tmp/img1.jpg", Buffer.from(maleImg.data, "utf-8"));
 const femaleImg = await axios.get(data.female, { responseType: "arraybuffer" });
 fs.writeFileSync(__dirname + "/tmp/img2.jpg", Buffer.from(femaleImg.data, "utf-8"));

 const msg = "「 Here's your pair Dp✨ 」";
 const allImages = [
 fs.createReadStream(__dirname + "/tmp/img1.jpg"),
 fs.createReadStream(__dirname + "/tmp/img2.jpg")
 ];

 return api.sendMessage({
 body: msg,
 attachment: allImages
 }, event.threadID, event.messageID);
 } catch (error) {
 console.error(error);
 }
 }
  }
};
