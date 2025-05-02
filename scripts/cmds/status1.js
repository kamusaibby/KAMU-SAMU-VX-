const mongoose = require("mongoose");
const os = require("os");
const axios = require("axios");

const Users = mongoose.models.users || mongoose.model("users", new mongoose.Schema({}, { strict: false }));
const Threads = mongoose.models.threads || mongoose.model("threads", new mongoose.Schema({}, { strict: false }));

module.exports = {
  config: {
    name: "status1",
    aliases: ["rtm1"],
version: "1.7",
    author: "MahMUD",
    countDown: 2,
    role: 0,
    longDescription: "Show bot and server stats",
    category: "system",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    try {
      const totalUsers = await Users.countDocuments().catch(err => 0);
      const totalGroups = await Threads.countDocuments().catch(err => 0);
      const totalCommands = global.GoatBot?.commands?.size || 0;

      const botUptime = process.uptime();
      const serverUptime = os.uptime();
      const botPing = Date.now() - event.timestamp;
      const cpuModel = os.cpus()[0].model;
      const cpuUsage = (os.loadavg()[0] * 100).toFixed(2);
      const totalMemory = (os.totalmem() / 1024 / 1024).toFixed(2);
      const freeMemory = (os.freemem() / 1024 / 1024).toFixed(2);
      const osVersion = os.version ? os.version() : os.release();
      const botName = global.GoatBot?.config?.nickNameBot || "Unknown Bot";
      const formatTime = (sec) => {
        let h = Math.floor(sec / 3600);
        let m = Math.floor((sec % 3600) / 60);
        return `${h}h ${m}m`;
      };

      const res = await axios.post('https://mahmud-stats.onrender.com/api/stats', {
        totalUsers,
        totalGroups,
        totalCommands,
        botUptime: formatTime(botUptime),
        serverUptime: formatTime(serverUptime),
        botPing,
        cpuModel,
        cpuUsage,
        totalMemory,
        freeMemory,
        osVersion,
        botName
      });

      return api.sendMessage(res.data.message, event.threadID, event.messageID);

    } catch (error) {
      return api.sendMessage(`❌ Error: ${error.message}`, event.threadID, event.messageID);
    }
  }
};
