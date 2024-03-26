module.exports = {
	config: {
		name: "outall",
		version: "1.0",
		author: "Samir",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "Leave All Chatbox In Bot Server",
			en: "Leave All Chatbox In Bot Server"
		},
		longDescription: {
			vi: "Leave All Chatbox In Bot Server",
			en: "Leave All Chatbox In Bot Server"
		},
		category: "👑 | Robot-Owner"
 },
  onStart: async function({ message, event, api, commandName, threadsData, args, usersData }) {
     if (args[0]) {
       try { 
         const Tid = args[0] || event.threadID;
api.removeUserFromGroup(event.userID, Tid);
         message.reply('✅ | Done ✓');
       } catch (error) {
         return message.reply('😠 | error 😔');
       }
       return;
     } else {
    const t = await api.getThreadList(100, null, []);
    const tt = [];
    for (const thread of t) {
      const threadInfo = await threadsData.get(thread.threadID);
      if (threadInfo && threadInfo.members && threadInfo.isGroup && threadInfo.threadID != event.threadID) {
        const botMember = threadInfo.members.find(member => member.userID === event.userID && member.inGroup === true);
        if (botMember) {
          tt.push(thread.threadID);
        }
        if (tt.length == 0) {
          message.reply('✅ | No other groups founded the bot is only in this group');
          return;
        }
      }
    }
    await message.reply('📝 | Found ' + tt.length + ' group\n✅ | Confirm out with reaction', (err, info) => {
        global.GoatBot.onReaction.set(info.messageID, {
        commandName: 'outall',
        author: event.senderID,
        mid: info.messageID,
        tt: tt,
      });
    });
   }
  },
onReaction: async function({ api, message, event, Reaction }) {
    async function removeUserFromGroup(userId, groupId) {
      let removedCount = 0;
      let errorCount = 0;
      try {
        await api.removeUserFromGroup(userId, groupId);
        removedCount++;
      } catch (error) {
        errorCount++;
      }
      return { removedCount, errorCount };
    }
    const { tt, author, mid, commandName } = Reaction;
    if (event.userID != author) return;
    message.reply('✅ | Start outing all groups...');
    const BOT = api.getCurrentUserID();
    let totalRemovedCount = 0;
    let totalErrorCount = 0;
    for (const group of tt) {
      const result = await removeUserFromGroup(BOT, group);
      totalRemovedCount += result.removedCount;
      totalErrorCount += result.errorCount;
    }
    api.sendMessage(`✅ | Successfully removed from ${totalRemovedCount} groups.`, author);
    api.sendMessage(`❎ | Errors occurred in ${totalErrorCount} groups.`, author);
  }
};
