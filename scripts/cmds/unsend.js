module.exports = {
  config: {
    name: "unsend",
    aliases: ["u", "uns", "unsend"],
    version: "1.2",
    author: "NTKhang",
    role: 0,
    description: {
      vi: "Gỡ tin nhắn của bot",
      en: "Unsend bot's message"
    },
    category: "box chat",
    guide: {
      vi: "reply tin nhắn muốn gỡ của bot và gọi lệnh {pn}",
      en: "reply the message you want to unsend and call the command {pn}"
    },
    usePrefix: false
  },

  langs: {
    vi: {
      syntaxError: "Vui lòng reply tin nhắn muốn gỡ của bot"
    },
    en: {
      syntaxError: "Please reply the message you want to unsend"
    }
  },

  // Prefix দিয়ে চালালে এইটা ট্রিগার হবে
  onStart: async function ({ message, event, api, getLang }) {
    if (!event.messageReply || event.messageReply.senderID != api.getCurrentUserID()) {
      return message.reply(getLang("syntaxError"));
    }
    message.unsend(event.messageReply.messageID);
  },

  // No Prefix দিয়ে চালালে এইটা ট্রিগার হবে
  onChat: async function ({ message, event, api, getLang }) {
    const prefix = global.GoatBot.config.prefix;
    const body = (event.body || "").toLowerCase().trim();

    const triggers = [
      "u", "uns", "unsend",
      `${prefix}u`, `${prefix}uns`, `${prefix}unsend`
    ];
    if (!triggers.includes(body)) return;

    if (!event.messageReply || event.messageReply.senderID != api.getCurrentUserID()) {
      return message.reply(getLang("syntaxError"));
    }

    message.unsend(event.messageReply.messageID);
  }
};
