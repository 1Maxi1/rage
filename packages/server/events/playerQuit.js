module.exports =
{
    "playerQuit": (player, reason, kickReason) =>
    {
        if(player.logged == 1)
        {
            gm.utility.saveAccount(player);
            console.log("<LOG> " + player.name + " аккаунт сохранен!");
            console.log("[-] " + player.name + " вышел с сервера!!");
        }

        mp.players.forEach((_player, player, id) =>
        {
            //_player.notify(`"~r~ ${player.name}~w~ вышел!"`);
            //console.log("[-] " + player.name + " вышел с сервера!!");
        });
    }
};
