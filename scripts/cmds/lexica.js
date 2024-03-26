const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

module.exports = {
	config: {
		name: "lexica", 
		aliases: ["lex"], 
		version: "1.0.2", 
		author: "Samir B. Thakuri", 
		role: 0,
		countDown: 5,
		shortDescription:{
			en: "Search image through promot"}, 
		longDescription:{
			en:"Generate image from your prompt through lexica api"}, 
		category: "🖼 | Image", 
		guide: {
			en: "{pn} <prompt> | <number of images>"
		}
	}, 

	onStart: async function({ api, event, args }) {
		const keySearch = args.join(" ");
    if(keySearch.includes("|") == false) return api.sendMessage('Please enter in the correct format, use /help lexica to see user manual for this command.', event.threadID, event.messageID)
    const keySearchs = keySearch.substr(0, keySearch.indexOf('|'))
    const numberSearch = keySearch.split("|").pop() || 6
    const res = await axios.get(`https://samirthakuri.restfulapi.repl.co/lexica?q=${encodeURIComponent(keySearchs)}&apikey=samirey`);
    const data = res.data.images;
    var num = 0;
    var imgData = [];
    for (var i = 0; i < parseInt(numberSearch); i++) {
      let path = __dirname + `/tmp/${num+=1}.jpg`;
      let getDown = (await axios.get(`${data[i]}`, { responseType: 'arraybuffer' })).data;
      fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));
      imgData.push(fs.createReadStream(__dirname + `/tmp/${num}.jpg`));
    }
    api.sendMessage({
        attachment: imgData,
        body: numberSearch + 'results for your prompt: '+ keySearchs
    }, event.threadID, event.messageID)
    for (let ii = 1; ii < parseInt(numberSearch); ii++) {
        fs.unlinkSync(__dirname + `/tmp/${ii}.jpg`)
    }
}
};
