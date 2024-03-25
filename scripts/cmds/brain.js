const axios = require("axios");

function formatFont(text) {
    const fontMapping = {
    a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶", j: "𝗷",
    k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽", q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁",
    u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆", z: "𝘇",
    A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜", J: "𝗝",
    K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦", T: "𝗧",
    U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭",
    0: "𝟬", 1: "𝟭", 2: "𝟮", 3: "𝟯", 4: "𝟰", 5: "𝟱", 6: "𝟲", 7: "𝟳", 8: "𝟴", 9: "𝟵"
};


    let formattedText = "";
    for (const char of text) {
        if (char in fontMapping) {
            formattedText += fontMapping[char];
        } else {
            formattedText += char;
        }
    }
    return formattedText;
}

module.exports = {
    config: {
        name: "brain",
        aliases: ['brainshop', 'brainai'],
        version: "1.0",
        author: "Samir B. Thakuri",
        countDown: 5,
        role: 0,
        shortDescription: "📖 | Education",
        longDescription: "Chat With AI ChatBot Powered By BrainShop AI",
        category: "ai",
        guide: {
            en: "{pn} <Query>",
        }
    },

    onStart: async function ({ api, event, args }) {
        const text = encodeURIComponent(args.join(" "));
        const chatId = encodeURIComponent(event.threadID);

        try {
            const response = await axios.get(`https://hazeyy-api.kyrinwu.repl.co/chatbot/brainshop?text=${text}&chatid=7168628619818735`);
            console.log("API Response:", response.data);

            const jsonData = response.data;
            if (jsonData && jsonData.status && jsonData.result) {
                const resultData = jsonData.result;
                const { Id, question, answer } = resultData;
                const message = `${formatFont(answer)}`;
                return api.sendMessage(message, event.threadID, event.messageID);
            } else {
                return api.sendMessage("No valid response from BrainShop AI, please try again later...", event.threadID);
            }
        } catch (error) {
            console.error("API Error:", error);
            return api.sendMessage("An error occurred while fetching data from the Brainshop API.", event.threadID);
        }
    }
};
