const axios = require("axios");
module.exports = {
  config: {
    name: "ip",
    aliases: ["trackip"],
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "ip address lookup",
    longDescription: "ip address lookup",
    category: "🔥 | Premium",
  },
  onStart: async function({ api, event, args }) {
    const timeStart = Date.now();
    if (!args[0]) {api.sendMessage("Please enter the ip you want to check",event.threadID, event.messageID);}
  else {
var infoip = (await axios.get(`http://ip-api.com/json/${args.join(' ')}?fields=66846719`)).data;
       if (infoip.status == 'fail')
         {api.sendMessage(`Error! An error occurred. Please try again later: ${infoip.message}`, event.threadID, event.messageID)}
          else {
            /////////////////
          //////////////////
 api.sendMessage({body:`======${(Date.now()) - timeStart}ms=====
 🗺️Continent: ${infoip.continent}
🏳️Nation: ${infoip.country}
🎊Country Code: ${infoip.countryCode}
🕋Area: ${infoip.region}
⛱️Region/State: ${infoip.regionName}
🏙️City: ${infoip.city}
🛣️District: ${infoip.district}
📮ZIP code: ${infoip.zip}
🧭Latitude: ${infoip.lat}
🧭Longitude: ${infoip.lon}
⏱️Timezone: ${infoip.timezone}
👨‍✈️Organization Name: ${infoip.org}
💵Currency unit: ${infoip.currency}
`,location: {
				latitude: infoip.lat,
				longitude: infoip.lon,
				current: true
			}}
,event.threadID, event.messageID);}
        }
  }
};
