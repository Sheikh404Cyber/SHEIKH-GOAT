const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
 config: {
 name: "cdp3",
 aliases: ["cdp"],
 version: "1.0",
 author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
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
          if(input && input.trim().toLowerCase().startsWith('cdp3') ||     input && input.trim().toLowerCase().startsWith('coupledp3')){
           const data = input.split(" ");
           data.shift();
    const prompt = data.join(" ");
 try {
 const { data } = await axios.get('https://anbusec.xyz/api/anime/pairdp?apikey=jmBOjQSgq5mK8GScw9AB');
 const maleImg = await axios.get(data.male, { responseType: "arraybuffer" });
 fs.writeFileSync(__dirname + "/tmp/img1.png", Buffer.from(maleImg.data, "utf-8"));
 const femaleImg = await axios.get(data.female, { responseType: "arraybuffer" });
 fs.writeFileSync(__dirname + "/tmp/img2.png", Buffer.from(femaleImg.data, "utf-8"));

 const msg = "「 Here's your pair Dp✨ 」";
 const allImages = [
 fs.createReadStream(__dirname + "/tmp/img1.png"),
 fs.createReadStream(__dirname + "/tmp/img2.png")
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
