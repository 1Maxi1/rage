gm.utility      = require('../core/utility.js');

mp.events.add('sendShitToServer', (player, user, pass, state) =>
{
    switch(state)
    {
        case 0:
        {
            gm.mysql.Handle.query("SELECT password FROM `user` WHERE name = ? LIMIT 1", [user], function(e, result)
            {
                if(result.length)
                {
                    let sqlPassword = result[0]["password"];
                    player.name = user;
                    gm.bcrypt.compare(pass, sqlPassword, function(err, res)
                    {
                        if(res == true)
                        {
                            console.log("<LOG> " + player.name + " защел в игру!");
                            player.call("authReply", ["success"]);
                        }
                        else
                        {
                            player.outputChatBox("Неверный пороль!");
                            console.log("<LOG> " + player.name + " ввел неверный пороль!");
                            player.call("authReply", ["wrongpass"]);
                        }
                    });
                }
            });
            break;
        }
        case 1:
        {
            gm.mysql.Handle.query("SELECT `id` FROM `user` WHERE name = ? LIMIT 1", [user], function(e, result)
            {
                if(result.length)
                {
                    player.outputChatBox("Аккаунт уже существует!");
                }
                else
                {
                    gm.bcrypt.genSalt(10, function(err, res)
                    {
                        var hash = gm.bcrypt.hashSync(pass, res);
                        gm.mysql.Handle.query("INSERT INTO `user` SET name = ?, password = ?, ip = ?, serial = ?, admin = ?, premium = ?, created_at = CURRENT_TIMESTAMP, last_login = CURRENT_TIMESTAMP, money = ?",
                        [user, hash, player.ip, player.serial, 0, 0, 1000], function(e, result)
                        {
                            player.name = user;
                            player.call("authReply", ["success"]);
                            console.log("<SRV> " + player.name + " был зареган на сервере!");
                        });
                    });
                }
            });
            break;
        }
    }
});

mp.events.add("testSpawn", (player) =>
{
    gm.utility.loadAccount(player);
	player.logged = 1;
    player.outputChatBox("Добро пожаловать на SWG RP <span style='color:#e038ac'>" + player.name + "</span><span style='color:#ffffff'>.</span>");
   // player.outputChatBox("<span style='color:#cf0b0b'>" + "<SRV>" + "</span> <span style='color:#ffffff'>Чтобы просмотреть список команд, введите /help!</span>");
   // player.notify('');
    player.notify("Добро пожаловать <span style='color:#e038ac'>" + player.name + "</span><span style='color:#ffffff'>!</span>");
    if (player.admin < 1)
        {
            //player.name = "~r~Администратор ${player.name} (${player.id})";
            console.log("<LOG> " + player.name + " зашел как администратор: " + player.admin + " уровня!");
            player.outputChatBox("<span style='color:#cf0b0b'>" + "<SRV>" + "</span><span style='color:#ffffff'>Команда /ah для просмотра списка действий администратора!</span>");
        }
    player.name = `{FFFFFF}${player.name} (${player.id})`;
    player.spawn(new mp.Vector3(-1037.7287, -2737.8232, 20.1962));
    player.call('showhud');
    mp.players.forEach((_player, player, id) =>
    {
       // _player.notify("'~r~' + player.name + '~w~ присоединился!'");
    });

    setTimeout(function()
    {
        if (player.admin > 0)
        {
            //player.name = `!{FF0000}Администратор ${player.name} (${player.id})`;
            console.log("<LOG> " + player.name + " зашел как администратор: " + player.admin + " уровня!");
            player.outputChatBox("<span style='color:#cf0b0b'>" + "<SRV>" + "</span><span style='color:#ffffff'>Команда /ah для просмотра списка действий администратора!</span>");
            player.notify('Вы зашли как админ ' + player.admin + " уровня!");
        }
    }, 1000);

});
