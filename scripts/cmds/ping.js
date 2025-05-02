module.exports = {
  config: {
    name: "ping",
    aliases: ["ms"],
    version: "1.0",
    author: "Sandu",
    role: 0,
    shortDescription: {
      en: "Displays the current ping of the bot's system."
    },
    longDescription: {
      en: "Displays the current ping of the bot's system."
    },
    category: "system",
    guide: {
      en: "Use {p}ping to check the current ping of the bot's system."
    }
  },
  onStart: async function ({ api, event, args }) {
    const timeStart = Date.now();
    await api.sendMessage("𝗖𝗵𝗲𝗰𝗸𝗶𝗻𝗴 𝗕𝗮𝗯𝘆 𝗽𝗶𝗻𝗴", event.threadID);
    const ping = Date.now() - timeStart;
    api.sendMessage(`𝗕𝗮𝗯𝘆 𝗰𝘂𝗿𝗿𝗲𝗻𝘁 𝗽𝗶𝗻𝗴 ${ping} ☘︎`, event.threadID);
  }
};
