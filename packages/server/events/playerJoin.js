module.exports =
{
    "playerJoin": (player) =>
    {
        console.log("\x1b[32m[+] \x1b[0mЗашел игрок " + player.name + " IP: " + player.ip + " - PL: " + player.packetLoss + " ")
        player.customData = {};
    }
};
