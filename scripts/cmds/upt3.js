module.exports = {
	config: {
		name: "uptime2",
		aliases: ["upt2"],
		role: 0,
		shortDescription: {
			en: "Show server uptime",
			tl: "Ipakita ang uptime ng server",
		},
		longDescription: {
			en: "Shows the duration for which the server has been running",
			tl: "Ipapakita ang tagal na gumagana ang server",
		},
		category: "👥 | Member",
		guide: {
			en: "{n}",
			tl: "{n}",
		},
	},

  onStart: async function(){},
  onChat: async function ({ api, event, args, usersData, threadsData }) {
    const input = event.body;
          if(input && input.trim().toLowerCase().startsWith('upt3') ||     input && input.trim().toLowerCase().startsWith('uptime3')){
           const data = input.split(" ");
           data.shift();
    try {
      const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();
      const uptime = process.uptime();
		const os = require("os");


		const days = Math.floor(uptime / (3600 * 24));
		const hours = Math.floor((uptime % (3600 * 24)) / 3600);
		const mins = Math.floor((uptime % 3600) / 60);
		const seconds = Math.floor(uptime % 60);

        const timeStart = Date.now();
        const ping = Date.now() - timeStart;

		const system = `OS: ${os.platform()} ${os.release()}`;
		const cores = `Cores: ${os.cpus().length}`;
		const arch = `Architecture: ${os.arch()}`;
		const totalMemory = `Total Memory: ${Math.round(os.totalmem() / (1024 * 1024 * 1024))} GB`;
		const freeMemory = `Free Memory: ${Math.round(os.freemem() / (1024 * 1024 * 1024))} GB`;
		const uptimeString = `Uptime: ${days} days, ${hours} hours, ${mins} minutes, and ${seconds} seconds`;

      api.sendMessage(`🕒 ${uptimeString}\n📡 ${system}\n🛡 ${cores}\n⚔ No AI Status\n📈 Total Users: ${allUsers.length}\n📉 Total Threads: ${allThreads.length}\n⚖ AI Usage: 2.0\n📊 RAM Usage: ${Math.round(process.memoryUsage().rss / (1024 * 1024))} MB\n💰 Total(RAM): ${Math.round(os.totalmem() / (1024 * 1024 * 1024))} GB\n💸 Current(RAM): ${Math.round(os.freemem() / (1024 * 1024 * 1024))} GB\n🛫 Ping: ${ping} ms\n🕰 Uptime(Seconds): ${Math.floor(process.uptime())}`, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while retrieving data.", event.threadID);
    }
  }
	},
  };
