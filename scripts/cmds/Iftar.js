const axios = require('axios');
const moment = require('moment-timezone');

module.exports = {
    config: {
        name: "iftar", 
        aliases: ["ifter","ramadan","sehri","seheri"], 
        version: "1.0",
        author: "RUBISH",
        countDown: 5,
        role: 0,
        description: {
            vi: "Lấy thời gian Iftar cho một thành phố",
             en: "Get detailed Iftar time for a city."
        },
        category: "👥 | Member",
        guide: {
            vi: "{pn} <tên thành phố>",
            en: "{pn} <city name>"
        }
    },

    onStart: async function ({ api, args, event }) {
        const [cityName] = args;
      
       if (!cityName) {
         return api.sendMessage("❎ | Please Enter a City Name...", event.threadID, event.messageID);
       }
        try {
            const response = await axios.get(`https://noobs-api.onrender.com/dipto/iftar?name=${encodeURIComponent(cityName)}`);
            const iftarInfo = response.data;

            if (!iftarInfo) {
                return api.sendMessage("❎ | Iftar time not found or invalid response.", event.threadID);
            }

            const currentDate = moment().tz('Asia/Dhaka');

            const formattedResponse = `
🤍 𝙸𝚏𝚝𝚊𝚛 𝚃𝚒𝚖𝚎 𝙵𝚘𝚛: ${cityName.toUpperCase()} 🥀

📅 𝙳𝚊𝚢 - ${currentDate.format('dddd')}
﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

▣ 𝚁𝚊𝚖𝚊𝚍𝚊𝚗: ${iftarInfo.ramadan}

▣ 𝚃𝚘𝚍𝚊𝚢'𝚜 𝙳𝚊𝚝𝚎: ${iftarInfo.todaytime} 2024

▣ 𝚃𝚘𝚖𝚘𝚛𝚛𝚘𝚠'𝚜 𝙳𝚊𝚝𝚎: ${iftarInfo.tomorrowtime} 2024

▣ 𝙸𝚏𝚝𝚊𝚛 𝚃𝚒𝚖𝚎: ${iftarInfo.iftar_time}

▣ 𝚂𝚎𝚑𝚛𝚒 𝚃𝚒𝚖𝚎: ${iftarInfo.sher_itime}

▣ 𝚂𝚞𝚗𝚜𝚎𝚝 𝚃𝚒𝚖𝚎: ${iftarInfo.sunset}

▣ 𝙼𝚊𝚐𝚑𝚛𝚒𝚋 𝚃𝙸𝚖𝚎: ${iftarInfo.oju_time_sondha}

▣ 𝙰𝚜𝚛 𝚃𝚒𝚖𝚎: ${iftarInfo.oju_time_bikal}

▣ 𝙳𝚑𝚞𝚑𝚛 𝚃𝚒𝚖𝚎: ${iftarInfo.oju_time_sokal}

▣ 𝙵𝚊𝚓𝚛 𝚃𝚒𝚖𝚎: ${iftarInfo.fazar_time}

▣ 𝙲𝚒𝚝𝚢𝙽𝚊𝚖𝚎: ${cityName.toUpperCase()}
﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

🕛 𝙲𝚞𝚛𝚛𝚎𝚗𝚝 𝚃𝚒𝚖𝚎 - ${currentDate.format('hh:mm A')}

🥰 𝐀𝐬𝐬𝐚𝐥𝐚𝐦𝐮 𝐀𝐥𝐚𝐢𝐤𝐮𝐦 🥰
            `;

            await api.sendMessage({ 
                body: formattedResponse,
                attachment: await global.utils.getStreamFromURL(iftarInfo.url)
             }, event.threadID);
        } catch (error) {
            console.error('❎ | Error fetching iftar data:', error);
                api.sendMessage("❎ | An error occurred while processing the request.", event.threadID);
        }
    }
};
