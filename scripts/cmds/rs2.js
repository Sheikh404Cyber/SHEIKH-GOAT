module.exports = {
    config: {
        name: "rsspam",
        version: "6.9",
        author: "Dipto",
        countDown: 5,
        role: 0,
        description: "Reaction spammer",
        category: "👑 | Robot-Owner",
        guide: {
            en: "{pn}"
        }
    },

    onStart: async function ({ api, args, message, event}) {
        try {    
            const permission = global.GoatBot.config.DEV;
            const emojis = ["😄", "🐸", "😎", "😂", "🥳", "🤩", "😜", "😉", "🐤", "🐢","🐐","🐥"];
            
            const [times] = args;
            const time = parseInt(times) || parseInt(emojis.length);
            if (!permission.includes(event.senderID)) {
            api.sendMessage(time, event.threadID, event.messageID);
            return;
          }
            for (let i = 0; i < time; i++) {
              setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * emojis.length);
                const randomEmoji = emojis[randomIndex];
                api.setMessageReaction(randomEmoji, event.messageReply.messageID, (err) => {}, true);
              }, i * 1000);
          };

        } catch (err) {
            console.log(err);
        }
    }
};
