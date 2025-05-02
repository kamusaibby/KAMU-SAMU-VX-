const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "Saif",
    version: "2.0",
    author: "Saif",
    countDown: 3,
    role: 0,
    shortDescription: "Instant Tom Identifier",
    longDescription: "Automatically responds with Tom's details when mentioned",
    category: "automation",
    envConfig: {}
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    try {
      if (!event.body) return;

      const triggers = ["tom", "twinkle"];
      const input = event.body.toLowerCase().trim();

      if (!triggers.includes(input)) return;

      // Configuration
      const media = {
        videoUrl: "https://i.imgur.com/pBGHlIe.mp4",
        fileName: "tom_identifier.mp4",
        tempDir: path.join(__dirname, "cache")
      };

      // Ensure cache directory exists
      await fs.ensureDir(media.tempDir);
      const filePath = path.join(media.tempDir, media.fileName);

      // Download media with progress tracking
      console.log("Fetching Tom's information...");
      const response = await axios({
        method: 'GET',
        url: media.videoUrl,
        responseType: 'stream',
        timeout: 15000
      });

      // Write file stream
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', () => reject(new Error('Failed to save media')));
      });

      // Modern response template
      const infoResponse = `
✦ 𝗧𝗢𝗠 𝗜𝗗𝗘𝗡𝗧𝗜𝗙𝗜𝗘𝗗 ✦

❖ 𝗢𝘄𝗻𝗲𝗿: 𝗧𝗢𝗠 💋
✧ 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲: 𝗕𝗔'𝗕𝗬 くめ

✦ 𝗔𝘂𝘁𝗼-𝗿𝗲𝘀𝗽𝗼𝗻𝗱 𝘀𝘆𝘀𝘁𝗲𝗺 ✦
`;

      await message.reply({
        body: infoResponse,
        attachment: fs.createReadStream(filePath)
      });

      // Cleanup
      fs.unlink(filePath).catch(() => {});

    } catch (error) {
      console.error("Tom Identifier Error:", error);
      await message.reply("🔧 System temporarily unavailable. Try again soon!");
    }
  }
};
