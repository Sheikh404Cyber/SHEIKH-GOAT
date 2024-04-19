module.exports = {
    config: {
        name: "namaj", 
        aliases: ["namaz","নামাজ"], 
        version: "1.0",
        author: "Kingi Charles",
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

onStart: async function ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
const res = await axios.get(`https://sms-bomb.vercel.app/api/namaz.php`);
var fajr = res.data.data.timings.Fajr;
var sunrise = res.data.data.timings.Sunrise;
var johor = res.data.data.timings.Dhuhr;
var asr = res.data.data.timings.Asr;
var sunset = res.data.data.timings.Sunset;
var magrib = res.data.data.timings.Maghrib;
var isha = res.data.data.timings.Isha;



return api.sendMessage(`আজকের নামাজের সময়সূচী:

সূর্যোদয়: ${sunrise}
সূর্যাস্ত: ${sunset}

ফজর: ${fajr}
যোহর: ${johor}
আছর: ${asr}
মাগরিব: ${magrib}
এশা: ${isha}

~Oggy Bot`, event.threadID, event.messageID)
} 
}
