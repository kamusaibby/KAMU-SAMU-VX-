const { getStreamFromURL } = require("fb-watchman");

module.exports = {
  config: {
    name: "owner",
    version: 2.0,
    author: "Jani nh ke manger nati cng marche 🙂",
    longDescription: "info about bot and owner",
    category: "Special",
    guide: {
      en: "{p}{n}",
    },
  },

  onStart: async function ({ api, event, args, message, usersData }) {
    const imgURL = "http://remakeai-production.up.railway.app/Remake_Ai/Nyx_Remake_1745559922636.mp4";
    const attachment = await global.utils.getStreamFromURL(imgURL);

    const id = event.senderID;
    const userData = await usersData.get(id);
    const name = userData.name;

    const ment = [{ id: id, tag: name }];
    
    const a = "-`𝐁𝐚𝐛𝐲 くめ";
    const b = "."; // Prefix
    const c = "卡姆鲁尔";
    const e = "𝐌𝐚𝐥𝐞";
    const f = "17 ±";
    const g = "𝐌𝐚𝐫𝐫𝐢𝐞𝐝";
    const h = "𝐒𝐞𝐜𝐫𝐞𝐭";
    const i = "𝐑𝐚𝐧𝐠𝐩𝐮𝐫";
    const d = "𝐕𝐚𝐠";

    message.reply({ 
      body: `᯽ ${name} ᯽

᯽ 𝐁𝐨𝐭'𝐬 𝐍𝐚𝐦𝐞: ${a}
᯽ 𝐁𝐨𝐭'𝐬 𝐏𝐫𝐞𝐟𝐢𝐱: ${b}  
᯽ 𝐎𝐰𝐧𝐞𝐫: ${c}
᯽ 𝐆𝐞𝐧𝐝𝐞𝐫: ${e}
᯽ 𝐎𝐰𝐧𝐞𝐫𝐬 𝐌𝐞𝐬𝐬𝐞𝐧𝐠𝐞𝐫: ${d}
᯽ 𝐀𝐠𝐞: ${f}
᯽ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩: ${g}
᯽ 𝐂𝐥𝐚𝐬𝐬: ${h}
᯽ 𝐁𝐚𝐬𝐡𝐚: ${i}`,
      mentions: ment,
      attachment: attachment
    });
  }
};
