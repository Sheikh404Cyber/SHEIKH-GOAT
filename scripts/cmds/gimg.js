const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

module.exports = {
	config: {
		name: "googleimg", 
		aliases: ["gimg"], 
		version: "1.0.2", 
		author: "Samir", 
		role: 0,
		countDown: 5,
		shortDescription:{
			en: "Search image google"}, 
		longDescription:{
			en:"Search Images from Google"}, 
		category: "👥 | Member", 
		guide: {
			en: "{pn} <name>"
		}
	}, 

	onStart: async function({ api, event, args }) {
		const keySearch = args.join(" ");
    if(keySearch.includes("-") == false) return api.sendMessage('Please enter in the format, example: gimg Naruto - 10 (it depends on you how many images you want to appear in the result)', event.threadID, event.messageID)
    const keySearchs = keySearch.substr(0, keySearch.indexOf('-'))
    const numberSearch = keySearch.split("-").pop() || 6
    const res = await axios.get(`https://api.heckerman06.repl.co/api/search/google-image?query=${encodeURIComponent(keySearchs)}&apikey=buynew`);
    const data = res.data.data;
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
        body: 'Here\'s' + numberSearch + ' Results For Keywords: ' + keySearchs + 'From Google Server'
    }, event.threadID, event.messageID)
    for (let ii = 1; ii < parseInt(numberSearch); ii++) {
        fs.unlinkSync(__dirname + `/tmp/${ii}.jpg`)
    }
}
};
