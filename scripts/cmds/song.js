const axios = require('axios');
const config = {
  name:"song",
  author:"Nyx",
  category:'song downloader'
}
const onStart = async ({args,api,message,event}) => {
  const data = args.join(' ')
  try {
    const req = await axios.get(`https://www.noobz-api.rf.gd/api/SoundCloudsearch?query=${data}`)
    api.setMessageReaction("🐢", event.messageID, () => {}, true);
    const item1 = req.data[0];
    const title = item1.title;
    const url = item1.permalink_url;
    const downloadRequest = await axios.get(`https://www.noobz-api.rf.gd/api/soundcloud?url=${url}`)
    const url2 = downloadRequest.data.cloudinary_url;
    message.reply({
        body: `Here's Your song 🎵
   \n title:${title}`,
        attachment: await global.utils.getStreamFromUrl(url2),
      });
      api.setMessageReaction("🪄", event.messageID, () => {}, true);
  } catch (e) {
    message.reply(e.message)
  }
}
module.exports = {
  config,
  onStart
}
