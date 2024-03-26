module.exports = {
    config: {
        name: "rsspam",
        version: "6.9",
        author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
        countDown: 5,
        role: 2,
        description: "Reaction spammer",
        category: "👑 | Robot-Owner",
        guide: {
            en: "{pn}"
        }
    },

    onStart: async function ({ api, args, message, event}) {
        try {    
            const permission = global.GoatBot.config.DEV;
            const { messageID } = event.messageReply;
            const reactions = ['🥺', '😗', '🐥', '😝', '🥱'];
            const rTimes = [4, 5, 7, 9, 10, 15];
            const rT = rTimes[Math.floor(Math.random() * rTimes.length)];
            const [time] = args;
            const Times = parseInt(time) || parseInt(rT);
            if (!permission.includes(event.senderID)) {
                api.sendMessage(Times, event.threadID, event.messageID);
                return;
              }
            const rReaction = reactions[Math.floor(Math.random() * reactions.length)];

            var k = function (k) { api.setMessageReaction(k, messageID, (err) => {}, true)};
            for (i = 0; i < Times; i++) {
                 k(`${rReaction}`);
            } 

        } catch (err) {
            console.log(err);
        }
    }
};
