const os = require('os');
const { createCanvas, loadImage } = require('canvas');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const moment = require('moment-timezone');
const fs = require('fs');

module.exports = {
    config: {
        name: "uptime4",
        aliases: ["upt4", "up4"],
        version: "1.3",
        author: "XOS Ayan",
        role: 0,
        shortDescription: {
            en: "Check bot uptime with an image."
        },
        longDescription: {
            en: "Generates an image with uptime while other system stats are sent as text."
        },
        category: "system",
        guide: {
            en: "Type {pn} to check bot uptime."
        }
    },

    onStart: async function ({ message, usersData, threadsData }) {
        try {
            // Calculate uptime
            const uptime = process.uptime();
            const s = Math.floor(uptime % 60);
            const m = Math.floor((uptime / 60) % 60);
            const h = Math.floor((uptime / 3600) % 24);
            const upTimeStr = `${h}h ${m}m ${s}s`;

            // Get system info
            const cpuModel = os.cpus()[0].model;
            const totalMemory = os.totalmem();
            const freeMemory = os.freemem();
            const usedMemory = totalMemory - freeMemory;
            const diskUsage = await getDiskUsage();
            const processMemory = prettyBytes(process.memoryUsage().rss);
            const totalUsers = (await usersData.getAll()).length;
            const totalThreads = (await threadsData.getAll()).length;
            const currentTime = moment.tz("Asia/Dhaka").format("DD/MM/YYYY || HH:mm:ss");

            // Load background image
            const background = await loadImage("https://i.imgur.com/5nXfWlu.jpeg");

            // Create canvas
            const canvas = createCanvas(800, 400);
            const ctx = canvas.getContext("2d");

            // Draw background
            ctx.drawImage(background, 0, 0, 800, 400);

            // Set text styles
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "bold 45px Arial";
            ctx.textAlign = "left";  // Left align text
            ctx.fillText("BOT UPTIME", 30, 80); // Left top corner
            ctx.font = "bold 40px Arial";
            ctx.fillText(`${upTimeStr}`, 30, 140); // Uptime text in left corner

            // Save image
            const imagePath = `${__dirname}/uptime_image.png`;
            const buffer = canvas.toBuffer();
            fs.writeFileSync(imagePath, buffer);

            // Send text & image separately
            await message.reply({
                body: `•━━━━━━━━━━━━━━━━━•
> 𝖡𝗈𝗍 𝖴𝗉𝗍𝗂𝗆𝖾 : ${upTimeStr}

> 𝖣𝖺𝗍𝖾 & 𝖳𝗂𝗆𝖾 : ${currentTime}

> 𝖳𝗈𝗍𝖺𝗅 𝖴𝗌𝖾𝗋𝗌 : ${totalUsers}

> 𝖳𝗈𝗍𝖺𝗅 𝖦𝗋𝗈𝗎𝗉𝗌 : ${totalThreads}

> 𝖣𝗂𝗌𝗄 : ${prettyBytes(diskUsage.used)} / ${prettyBytes(diskUsage.total)}

> 𝖱𝖺𝗆 : ${prettyBytes(usedMemory)} / ${prettyBytes(totalMemory)}

> 𝖢𝗉𝗎 : ${cpuModel} 

•━━━━━━━━━━━━━━━━━•
> 𝖮𝗐𝗇𝖾𝗋 : 𝗧𝗢𝗠 <'3 
> Fb : 𝗙𝗨𝗖𝗞𝗕𝗢𝗢𝗞 𝗡𝗔𝗜`,
                attachment: fs.createReadStream(imagePath)
            });

            // Delete image after sending
            fs.unlinkSync(imagePath);

        } catch (err) {
            console.error(err);
            await message.reply("❌ An error occurred while generating the uptime image.");
        }
    }
};

// Function to get disk usage
async function getDiskUsage() {
    const { stdout } = await exec('df -k /');
    const [_, total, used] = stdout.split('\n')[1].split(/\s+/).filter(Boolean);
    return { total: parseInt(total) * 1024, used: parseInt(used) * 1024 };
}

// Function to convert bytes into human-readable format
function prettyBytes(bytes) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (bytes >= 1024 && i < units.length - 1) {
        bytes /= 1024;
        i++;
    }
    return `${bytes.toFixed(2)} ${units[i]}`;
                                }
