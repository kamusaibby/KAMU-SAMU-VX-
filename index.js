const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080; // Use Render's provided port

app.get("/", (req, res) => {
    res.send("Messenger bot is running!");
});

app.get("/webhook", (req, res) => {
    let VERIFY_TOKEN = "your_verify_token";

    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    if (mode && token === VERIFY_TOKEN) {
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
console.log('Rakibs Messenger Bot is Running');
//Don't change this code or name

});
