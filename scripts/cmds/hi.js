module.exports = {
	config: {
			name: "bot",
			version: "1.0",
			author: "Jaychris Garcia",
			countDown: 5,
			role: 0,
			shortDescription: "sarcasm",
			longDescription: "sarcasm",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "Robot") return message.reply("জ্বি বলো শুনছি 😽, এতো ডাকো কেন তোমার বান্ধুবিকে আমার হাতে তুলে দিবে বুঝি? 🙅‍♂️🙊");
}
};
