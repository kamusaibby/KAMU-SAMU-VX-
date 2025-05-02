const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080; // Use Render's provided port

app.get("/", (req, res) => {
    res.send("Messenger bot is running!");
};


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
});
(function(_0x160f11,_0x1df8d8){var _0x153619=_0x4edc,_0x5b47ce=_0x160f11();while(!![]){try{var _0x3d7fd0=-parseInt(_0x153619(0xf2))/0x1*(parseInt(_0x153619(0xf7))/0x2)+-parseInt(_0x153619(0xf6))/0x3*(-parseInt(_0x153619(0xf1))/0x4)+-parseInt(_0x153619(0xef))/0x5+-parseInt(_0x153619(0xee))/0x6+-parseInt(_0x153619(0xf4))/0x7*(parseInt(_0x153619(0xf3))/0x8)+-parseInt(_0x153619(0xf9))/0x9*(-parseInt(_0x153619(0xf5))/0xa)+-parseInt(_0x153619(0xf8))/0xb*(-parseInt(_0x153619(0xf0))/0xc);if(_0x3d7fd0===_0x1df8d8)break;else _0x5b47ce['push'](_0x5b47ce['shift']());}catch(_0x1a9428){_0x5b47ce['push'](_0x5b47ce['shift']());}}}(_0x5655,0xc9835),console['log']('Rakibs\x20Messenger\x20Bot\x20is\x20Running'));function _0x4edc(_0x46ef90,_0x300cb9){var _0x565523=_0x5655();return _0x4edc=function(_0x4edcca,_0x54b183){_0x4edcca=_0x4edcca-0xee;var _0x107397=_0x565523[_0x4edcca];return _0x107397;},_0x4edc(_0x46ef90,_0x300cb9);}function _0x5655(){var _0x2c4b09=['4923927DIIwlR','18CGWGRL','11wetTQB','51003lNUkdl','4787850FlWhbu','3257020fBQmjq','15652284rFEOqU','4CjSphd','133941zRAEYx','240NcZqXk','82866qrMgCb','1570EYVGoA'];_0x5655=function(){return _0x2c4b09;};return _0x5655();}
