const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");
module.exports = {
	config: {
		name: "avatar3",
		version: "1.0",
		author: "Samir.",
		countDown: 10,
		role: 0,
		shortDescription: "Create fb Banner",
		longDescription: "Create fb banner",
		category: "🖼 | Image",
		guide: {
			en: "{p}{n} character name or code | name | signature",
		}
	},

  

	onStart: async function ({ message, args, event, api }) {
 
    const info = args.join(" ");
		if (!info){
			return message.reply(`Please enter in the format:\navatar3  Character name or code | name | signature`);
      
      }else {
      const msg = info.split("|");
      const id = msg[0];
    const name = msg[1];
    const samir = msg[2];

        

       if (isNaN(id)) { // If input is not a number
          await message.reply("processing your avatar ....");

         let id1;
    try {
        id1 = (await axios.get(`https://www.nguyenmanh.name.vn/api/searchAvt?key=${id}`)).data.result.ID; 
    } catch (error) {
      await message.reply("Character not found, please check the name and try again...");
      return;
    }

        const img = (`https://www.nguyenmanh.name.vn/api/avtWibu?id=${id1}&chunen=${name}&chuky=${samir}&apikey=FSShCQne`)			
                 const form = {
				body: `Here's your avatars✨`
			};
				form.attachment = []
				form.attachment[0] = await global.utils.getStreamFromURL(img);
			message.reply(form); 
         
      

       }else  { 
       await message.reply("processing your avatar please wait....");
         
         const img = (`https://www.nguyenmanh.name.vn/api/avtWibu?id=${id}&chunen=${name}&chuky=${samir}&apikey=FSShCQne`)			
                 const form = {
				body: `Here's Your avatar`
			};
				form.attachment = []
				form.attachment[0] = await global.utils.getStreamFromURL(img);
			message.reply(form); 
        }
      }
    }
   };
