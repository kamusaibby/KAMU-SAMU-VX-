const countries = [
  { name: "United States", flag: "🇺🇸" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "France", flag: "🇫🇷" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "India", flag: "🇮🇳" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "Russia", flag: "🇷🇺" },
  { name: "China", flag: "🇨🇳" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "Argentina", flag: "🇦🇷" },
  { name: "Egypt", flag: "🇪🇬" },
  { name: "Nigeria", flag: "🇳🇬" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "Switzerland", flag: "🇨🇭" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "Belgium", flag: "🇧🇪" },
  { name: "Greece", flag: "🇬🇷" },
  { name: "Turkey", flag: "🇹🇷" },
  { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "Thailand", flag: "🇹🇭" },
  { name: "Vietnam", flag: "🇻🇳" },
  { name: "Philippines", flag: "🇵🇭" },
  { name: "Malaysia", flag: "🇲🇾" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "New Zealand", flag: "🇳🇿" },
  { name: "Ireland", flag: "🇮🇪" },
  { name: "Portugal", flag: "🇵🇹" },
  { name: "Poland", flag: "🇵🇱" },
  { name: "Austria", flag: "🇦🇹" },
  { name: "Denmark", flag: "🇩🇰" },
  { name: "Finland", flag: "🇫🇮" },
  { name: "Norway", flag: "🇳🇴" },
  { name: "Iceland", flag: "🇮🇸" },
  { name: "Czech Republic", flag: "🇨🇿" },
  { name: "Hungary", flag: "🇭🇺" },
  { name: "Ukraine", flag: "🇺🇦" },
  { name: "Israel", flag: "🇮🇱" },
  { name: "Qatar", flag: "🇶🇦" },
  { name: "United Arab Emirates", flag: "🇦🇪" },
  { name: "Pakistan", flag: "🇵🇰" },
  { name: "Bangladesh", flag: "🇧🇩" },
  { name: "Sri Lanka", flag: "🇱🇰" },
  { name: "Nepal", flag: "🇳🇵" },
  { name: "Afghanistan", flag: "🇦🇫" },
  { name: "Iraq", flag: "🇮🇶" },
  { name: "Iran", flag: "🇮🇷" },
  { name: "Kazakhstan", flag: "🇰🇿" },
  { name: "Uzbekistan", flag: "🇺🇿" },
  { name: "Azerbaijan", flag: "🇦🇿" },
  { name: "Georgia", flag: "🇬🇪" },
  { name: "Armenia", flag: "🇦🇲" },
  { name: "Lebanon", flag: "🇱🇧" },
  { name: "Jordan", flag: "🇯🇴" },
  { name: "Oman", flag: "🇴🇲" },
  { name: "Kuwait", flag: "🇰🇼" },
  { name: "Bahrain", flag: "🇧🇭" },
  { name: "Maldives", flag: "🇲🇻" },
  { name: "Mongolia", flag: "🇲🇳" },
  { name: "Cambodia", flag: "🇰🇭" },
  { name: "Laos", flag: "🇱🇦" },
  { name: "Myanmar", flag: "🇲🇲" },
  { name: "Brunei", flag: "🇧🇳" },
  { name: "Timor-Leste", flag: "🇹🇱" },
  { name: "Fiji", flag: "🇫🇯" },
  { name: "Samoa", flag: "🇼🇸" },
  { name: "Tonga", flag: "🇹🇴" },
  { name: "Vanuatu", flag: "🇻🇺" },
  { name: "Solomon Islands", flag: "🇸🇧" },
  { name: "Papua New Guinea", flag: "🇵🇬" },
  { name: "Kenya", flag: "🇰🇪" },
  { name: "Ethiopia", flag: "🇪🇹" },
  { name: "Tanzania", flag: "🇹🇿" },
  { name: "Uganda", flag: "🇺🇬" },
  { name: "Ghana", flag: "🇬🇭" },
  { name: "Senegal", flag: "🇸🇳" },
  { name: "Morocco", flag: "🇲🇦" },
  { name: "Algeria", flag: "🇩🇿" },
  { name: "Tunisia", flag: "🇹🇳" },
  { name: "Libya", flag: "🇱🇾" },
  { name: "Sudan", flag: "🇸🇩" },
  { name: "South Sudan", flag: "🇸🇸" },
  { name: "Cameroon", flag: "🇨🇲" },
  { name: "Ivory Coast", flag: "🇨🇮" },
  { name: "Mali", flag: "🇲🇱" },
  { name: "Niger", flag: "🇳🇪" },
  { name: "Chad", flag: "🇹🇩" },
  { name: "Somalia", flag: "🇸🇴" },
  { name: "Madagascar", flag: "🇲🇬" },
  { name: "Mozambique", flag: "🇲🇿" },
  { name: "Zambia", flag: "🇿🇲" },
  { name: "Zimbabwe", flag: "🇿🇼" },
  { name: "Botswana", flag: "🇧🇼" },
  { name: "Namibia", flag: "🇳🇦" },
  { name: "Angola", flag: "🇦🇴" },
  { name: "Cuba", flag: "🇨🇺" },
  { name: "Jamaica", flag: "🇯🇲" },
  { name: "Haiti", flag: "🇭🇹" },
  { name: "Dominican Republic", flag: "🇩🇴" },
  { name: "Puerto Rico", flag: "🇵🇷" },
  { name: "Costa Rica", flag: "🇨🇷" },
  { name: "Panama", flag: "🇵🇦" },
  { name: "Colombia", flag: "🇨🇴" },
  { name: "Venezuela", flag: "🇻🇪" },
  { name: "Ecuador", flag: "🇪🇨" },
  { name: "Peru", flag: "🇵🇪" },
  { name: "Chile", flag: "🇨🇱" },
  { name: "Bolivia", flag: "🇧🇴" },
  { name: "Paraguay", flag: "🇵🇾" },
  { name: "Uruguay", flag: "🇺🇾" },
];

module.exports = {
  config: {
    name: "flag",
    aliases: ["flagGame"],
    version: "3.0",
    author: "SA IF👨‍🍼",
    countDown: 0,
    role: 0,
    description: {
      en: "Guess the flag name",
    },
    category: "game",
    guide: {
      en: "{pn}",
    },
  },
  onReply: async function ({ api, event, Reply, usersData }) {
    const { country, attempts } = Reply;
    const maxAttempts = 5;
    if (event.type == "message_reply") {
      const reply = event.body.toLowerCase();
      const getCoin = 2 * 120.5;
      const getExp = 1 * 121;
      const userData = await usersData.get(event.senderID);
      if (attempts >= maxAttempts) {
        await api.sendMessage(
          "🚫 | You have reached the maximum number of attempts (5).",
          event.threadID,
          event.messageID,
        );
        return;
      }
      if (isNaN(reply)) {
        if (reply == country.toLowerCase()) {
          try {
            await api.unsendMessage(Reply.messageID);
            await usersData.set(event.senderID, {
              money: userData.money + getCoin,
              exp: userData.exp + getExp,
              data: userData.data,
            });
          } catch (err) {
            console.log("Error: ", err.message);
          } finally {
            const message = `✅ | Correct answer!\nYou have earned ${getCoin} coins and ${getExp} exp.`;
            await api.sendMessage(message, event.threadID, event.messageID);
          }
        } else {
          Reply.attempts += 1;
          global.GoatBot.onReply.set(Reply.messageID, Reply);
          api.sendMessage(
            `❌ | Wrong Answer. You have ${maxAttempts - Reply.attempts} attempts left.\n✅ | Try Again baby!`,
            event.threadID,
            event.messageID,
          );
        }
      }
    }
  },

  onStart: async function ({ api, args, event, usersData }) {
    try {
      if (!args[0]) {
        // Select a random country from the dataset
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        const { name, flag } = randomCountry;

        await api.sendMessage(
          {
            body: `Guess the country name for this flag: ${flag}`,
          },
          event.threadID,
          (error, info) => {
            global.GoatBot.onReply.set(info.messageID, {
              commandName: this.config.name,
              type: "reply",
              messageID: info.messageID,
              author: event.senderID,
              country: name,
              attempts: 0,
            });
          },
          event.messageID,
        );
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      api.sendMessage(
        `Error: ${error.message}`,
        event.threadID,
        event.messageID,
      );
    }
  },
};
