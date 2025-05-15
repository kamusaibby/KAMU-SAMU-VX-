const { config } = global.GoatBot;
const { client } = global;
const { writeFileSync } = require("fs-extra");

module.exports = {
  config: {
    name: "whitelistthread",
    aliases: ["wlt"],
    version: "2.0",
    author: "NTKhang + Modified by tom",
    countDown: 5,
    role: 2,
    description: {
      en: "Manage thread access through whitelist"
    },
    category: "admin",
    guide: {
      en:
        '{pn} [add | -a | +] [<tid>...]: Add threads to whitelist\n' +
        '{pn} [remove | -r | -] [<tid>...]: Remove threads from whitelist\n' +
        '{pn} [list | -l]: List all whitelisted threads\n' +
        '{pn} [mode | -m] <on|off>: Enable/disable whitelist mode\n' +
        '{pn} [mode | -m] noti <on|off>: Toggle notification for blocked threads'
    }
  },

  langs: {
    en: {
      added: `\n╭─✦✅ | Added %1 thread(s)\n%2`,
      alreadyAdmin: `╭✦⚠️ | Already whitelisted %1 thread(s)\n%2\n`,
      missingAdd: "⚠️ | Please enter TID(s) to add to whitelist",
      removed: `\n╭✦✅ | Removed %1 thread(s)\n%2`,
      notAdmin: `╭✦❎ | These thread(s) were not in the whitelist\n%1\n`,
      missingIdRemove: "⚠️ | Please enter TID(s) to remove from whitelist",
      listAdmin: `╭✦✨ | Whitelisted Threads:\n%1\n╰─────────────────⧕`,
      turnedOn: "✅ | Whitelist mode enabled",
      turnedOff: "❎ | Whitelist mode disabled",
      turnedOnNoti: "✅ | Notification enabled for blocked threads",
      turnedOffNoti: "❎ | Notification disabled for blocked threads",
      notWhitelisted: "⚠️ | This thread is not whitelisted to use the bot."
    }
  },

  onStart: async function ({ message, args, event, getLang, api }) {
    config.whiteListModeThread ??= {};
    config.whiteListModeThread.whiteListThreadIds ??= [];
    config.hideNotiMessage ??= {};

    // Block access if whitelist mode is on and thread not in list
    if (config.whiteListModeThread.enable && !config.whiteListModeThread.whiteListThreadIds.includes(event.threadID)) {
      if (!config.hideNotiMessage?.whiteListModeThread) {
        return message.reply(getLang("notWhitelisted"));
      }
      return;
    }

    switch (args[0]) {
      case "add":
      case "-a":
      case "+": {
        let tids = args.slice(1).filter(arg => !isNaN(arg));
        if (tids.length === 0) tids.push(event.threadID);

        const alreadyAdded = [];
        const toAdd = tids.filter(tid => {
          if (config.whiteListModeThread.whiteListThreadIds.includes(tid)) {
            alreadyAdded.push(tid);
            return false;
          }
          return true;
        });

        config.whiteListModeThread.whiteListThreadIds.push(...toAdd);

        const getNames = await Promise.all(tids.map(async tid => {
          const d = await api.getThreadInfo(tid) || {};
          return { tid, name: d.threadName || "Not found" };
        }));

        writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));

        return message.reply(
          (toAdd.length > 0 ? getLang("added", toAdd.length, getNames.filter(({ tid }) => toAdd.includes(tid)).map(({ tid, name }) => `├‣ NAME: ${name}\n╰‣ ID: ${tid}`).join("\n")) : "") +
          (alreadyAdded.length > 0 ? getLang("alreadyAdmin", alreadyAdded.length, alreadyAdded.map(tid => `╰‣ ID: ${tid}`).join("\n")) : "")
        );
      }

      case "remove":
      case "rm":
      case "-r":
      case "-": {
        let tids = args.slice(1).filter(arg => !isNaN(arg));
        if (tids.length === 0) tids.push(event.threadID);

        const removed = [];
        const notFound = [];

        for (const tid of tids) {
          if (config.whiteListModeThread.whiteListThreadIds.includes(tid)) {
            config.whiteListModeThread.whiteListThreadIds = config.whiteListModeThread.whiteListThreadIds.filter(id => id !== tid);
            removed.push(tid);
          } else {
            notFound.push(tid);
          }
        }

        const getNames = await Promise.all(removed.map(async tid => {
          const d = await api.getThreadInfo(tid) || {};
          return { tid, name: d.threadName || "Not found" };
        }));

        writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));

        return message.reply(
          (removed.length > 0 ? getLang("removed", removed.length, getNames.map(({ tid, name }) => `├‣ NAME: ${name}\n╰‣ ID: ${tid}`).join("\n")) : "") +
          (notFound.length > 0 ? getLang("notAdmin", notFound.map(tid => `╰‣ ID: ${tid}`).join("\n")) : "")
        );
      }

      case "list":
      case "-l": {
        const list = await Promise.all(config.whiteListModeThread.whiteListThreadIds.map(async tid => {
          const info = await api.getThreadInfo(tid) || {};
          return `├‣ NAME: ${info.threadName || "Unknown"}\n╰‣ ID: ${tid}`;
        }));
        return message.reply(getLang("listAdmin", list.join("\n")));
      }

      case "mode":
      case "m":
      case "-m": {
        const isNoti = args[1] === "noti";
        const value = args[isNoti ? 2 : 1];

        if (value !== "on" && value !== "off") {
          return message.reply("⚠️ | Please use 'on' or 'off'");
        }

        const val = value === "on";

        if (isNoti) {
          config.hideNotiMessage.whiteListModeThread = !val;
          message.reply(getLang(val ? "turnedOnNoti" : "turnedOffNoti"));
        } else {
          config.whiteListModeThread.enable = val;
          message.reply(getLang(val ? "turnedOn" : "turnedOff"));
        }

        writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
        break;
      }

      default:
        return message.reply(getLang("missingAdd"));
    }
  }
};
