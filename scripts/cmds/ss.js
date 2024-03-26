module.exports = {
    config: {
        name: 'screenshot',
        aliases: ['ss'],
        version: '1.2',
        author: 'Samir Œ',
        shortDescription: 'Send a screenshot photo from a URL.',
        longDescription: 'Sends a screenshot photo from a specified URL.',
        category: '👥 | Member',
        guide: {
            en: '{pn} [URL] | [device]',
        },
    },
    onStart: async function({
        message,
        event,
        args
    }) {
      const fuck = args.join(' ');
      const permission = global.GoatBot.config.DEV;
      if (!permission.includes(event.senderID)) {
        api.sendMessage(fuck, event.threadID, event.messageID);
        return;
      }
        try {
            const argString = args.join(' ');
            const [providedURL, device] = argString.split('|').map(arg => arg.trim());
            if (!providedURL) {
                return message.reply('Please provide a URL.')
            }
            const deviceMap = {
                '1': 'desktop',
                '2': 'tablet',
                '3': 'mobile',
            };
            const selectedDevice = device && deviceMap[device] ? deviceMap[device] : 'mobile';
            const api = `https://api-samir.onrender.com/ssweb?url=${encodeURIComponent(providedURL)}&device=${selectedDevice}`;
            message.reply({
                attachment: await global.utils.getStreamFromURL(api),
            })
        } catch (error) {
            console.error(error);
            message.reply('An error occurred while processing the screenshot command.')
        }
    },
}
