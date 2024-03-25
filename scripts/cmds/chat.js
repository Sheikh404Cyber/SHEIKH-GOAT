const axios = require("axios");

// Define the lastQuery variable
let lastQuery = "";

function formatFont(text) {
  const fontMapping = {
    a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲",
    f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶", j: "𝗷",
    k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼",
    p: "𝗽", q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁",
    u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆",
    z: "𝘇", A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗",
    E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜",
    J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡",
    O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦",
    T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫",
    Y: "𝗬", Z: "𝗭",
    0: "𝟬", 1: "𝟭", 2: "𝟮", 3: "𝟯", 4: "𝟰",
    5: "𝟱", 6: "𝟲", 7: "𝟳", 8: "𝟴", 9: "𝟵"
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
    name: "chat",
    version: "1.2",
    author: "Samir B. Thakuri",
    countDown: 5,
    role: 0,
    shortDescription: "AI",
    longDescription: {
      en: "Chat with AI",
    },
    category: "📖 | Education",
    guide: {
      vi: "{pn} <Question>",
      en: "{pn} <Question>",
    },
  },

  // Ensure onStart is defined properly
  onStart: async function ({ args, api, event }) {
    const { threadID, messageID } = event;

    if (!args[0]) {
      api.sendMessage("😿 Please provide me a (Query) to search on Python AI...", threadID, messageID);
      return;
    }

    const query = args.join(" ");

    if (query === lastQuery) {
      api.sendMessage("🕰️ | Updating answer to the previous question...", threadID, messageID);
      return;
    } else {
      lastQuery = query;
    }

    try {
      const response = await axios.get(`https://hazeyy-api-blackbox.kyrinwu.repl.co/ask?q=${encodeURIComponent(query)}`);

      if (response.status === 200 && response.data && response.data.message) {
        const answer = response.data.message;
        const formattedAnswer = formatFont(answer); // Apply font formatting
        api.sendMessage(formattedAnswer, threadID, messageID);
      } else {
        api.sendMessage("😿 Sorry, no relevant answers found...", threadID, messageID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("😿 Unexpected error while searching on Python AI...", threadID, messageID);
      return;
    }
  },
};
