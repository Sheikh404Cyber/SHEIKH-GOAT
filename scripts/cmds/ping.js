 module.exports = {
  config: {
    name: "ping",
    Author: "404",
    version: "1.0",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Ping!"
    },
    longDescription: {
      en: "🔰Checking Bot's ping🔰"
    },
    category: "👑 | Robot-Owner",
    guide: {
      en: "{pn}"
    }
  },
  onStart: async function ({ api, event, args }) {
    const timeStart = Date.now();
    await api.sendMessage("🔰Checking Bot's ping🔰", event.threadID);
    const ping = Date.now() - timeStart;
    api.sendMessage(`[ ${ping}ms ]`, event.threadID);
  }
};
