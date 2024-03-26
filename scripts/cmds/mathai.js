const axios = require("axios");

module.exports = {
  config: {
    name: "math",
    version: "1.0",
    author: "Samir Œ",
    countDown: 5,
    role: 0,
    category: "📖 | Education"
  },
  onStart: async function({ message, event, args, commandName }) {
  const gay = args.join(' ');
  
  try {
    const response = await axios.get(`https://bnw.samirzyx.repl.co/mathai?q=${encodeURIComponent(gay)}`);

    if (response.data && response.data.data) {
      const answer = response.data.data;
      const lesbian = `${answer}`;
      message.reply({ body: lesbian,
                  
                    }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } 

  } catch (error) {
    console.error("Error:", error.message);
  }
},

onReply: async function({ message, event, Reply, args }) {
  let { author, commandName } = Reply;
  if (event.senderID != author) return;
  const binary = args.join(' ');
   try {
    const response = await axios.get(`https://bnw.samirzyx.repl.co/mathai?q=${encodeURIComponent(binary)}`);
    
    if (response.data && response.data.data) {
      const answer = response.data.data;
      const hijra = `${answer}`;
      message.reply({ body: hijra,
                    
                    }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } 

  } catch (error) {
    console.error("Error:", error.message);
  }
}
};
