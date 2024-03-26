const axios = require('axios');

module.exports = {
  config: {
    name: "kamla",
    aliases: ["kamla"],
    version: "1.1",
    author: "Samir Œ",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: 'Text to Image'
    },
    longDescription: {
      en: "Text to image"
    },
    category: "🖼 | Image",
    guide: {
      en: '{pn} your prompt | Type' +
        ' here are supported models:' +
        '\n' +
        
 ' 1 | anime ' +
 '\n 2 | enhance ' +
 '\n 3 | digital-art ' +
 '\n 4 | photographic ' +
 '\n 5 | comic-book ' +
 '\n 6 | analog-film' +
 '\n 7 | fantasy-art ' +
 '\n 8 | neonpunk' +
 '\n 9 | analog-film' +
 '\n 10 |  isometric' +
 '\n 11 | lowpoly ' +
 '\n 12 | photorealistic ' +
 '\n 13 | futuristic ' +
 '\n 14 | pixel-art ' +
 '\n 15 | cinematically  ' +
 '\n 16 | line-art ' +
 '\n 17 | origami ' +
 '\n 18 | realism ' +
 '\n 19 | 3d-model' +
 '\n 20 | texture' +
 '\n 21 | futuristic ' +
 '\n 22 | craft-clay ' 

 
    }
  },

  onStart: async function({ message, args }) {
    const text = args.join(" ");
    if (!text) {
      return message.reply("Please provide a prompt.");
    }

    let prompt, model;
    if (text.includes("|")) {
      const [promptText, modelText] = text.split("|").map((str) => str.trim());
      prompt = promptText;
      model = modelText;
    } else {
      prompt = text;
      model = 4; 
    }

    message.reply("✅| Creating your Imagination...").then((info) => { id = info.messageID });
    try {
      const API = `https://imagine.odernder.repl.co/gen?prompt=${encodeURIComponent(prompt)}&style=${model}`;
      const imageStream = await global.utils.getStreamFromURL(API);

      return message.reply({
        attachment: imageStream
      });
    } catch (error) {
      console.log(error);
      message.reply("😔Failed to generate your imagination🙂.").then(() => {
        message.delete(id);
      });
    }
  }
};
