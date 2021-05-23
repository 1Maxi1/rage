///////////////////////////////////////////////////////////////////////////////
//
//      ВСЕГО УРОВНЕЙ АДМИНИСТРАЦИИ 4 (обновил 20.05.2021)
//      ВЫДАВАТЬ АДМИНКУ МОЖНО ТОКО В MYSQL
//      ЭТО ЛИШЬ ШАБЛОН СЕРВЕРА, А НЕ ПОЛНОСТЬЮ РАБОЧИЙ ПРОЕКТ
//      ПЕРЕД ТЕМ КАК ИСПОЛЬЗОВАТЬ ЕГО СОВЕТУЮ УЗНАТЬ ОБОВСЕМ МОДЕ!
//
///////////////////////////////////////////////////////////////////////////////
//
//      Используй
//      player.call("server_to_client_AddNotify", [5000, `HTML текст`, 0]);
//      Для норм уведомлений над картой...
//      Не юзай сток говно
//      Это лучше)
//
///////////////////////////////////////////////////////////////////////////////
  
//ВКЛЮЧИТЬ АНИМКУ
mp.events.addCommand('anim', (player, _, dict, name, speed, flag) => {
	if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    player.outputChatBox('/anim [animDic] [animName] [duration] [flag]');
    player.playAnimation(dict, name, speed, flag);

})
mp.events.addCommand('test', (player, text) => {
    if(player.admin < 4) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    player.notify("[=======Test=======]\nкорды " + player.position + "\nmoney " + player.data.money + "$");
})

mp.events.addCommand('makeadmin', (player, _, id, alvl) => {
        if(player.admin < 4) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
        if (typeof alvl == 'undefined' || typeof alvl == 'undefined') return player.outputChatBox("<b style='color:#999'>(Syntax)</b> /makeadmin [id] [admin level]");
        //if (id == null) return player.notify('~r~Игрок небыл найден!');
        gm.mysql.Handle.query("UPDATE `user` SET admin = ? WHERE id = ?", [alvl, id]);
        player.notify('~g~Игрок установлен на должность админа!');
    });

mp.events.addCommand('nick', (player, idnick) => {
    if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    if (!idnick || isNaN(idnick)){
    return player.outputChatBox(`Uso: /nick 0-1`);
    }
    switch (Number(idnick)){
    case 0:
        //player.name = `{FFFFFF}${player.name} (${player.id})`;
        player.name = `${player.name} (${player.id})`;
        player.notify('~g~Краысный ник убран!');
        break;
    case 1:
        //player.name = `!{FF0000}Администратор ${player.name} (${player.id})`;
        player.name = `!{FF0000}Администратор ${player.name}`;
        player.notify('~g~Краысный ник установлен!');
        break;
    }
});

mp.events.addCommand('money', (player) => {
    player.outputChatBox("Money: " + player.data.money + "$");
});

mp.events.addCommand('setmoney', (player, num) => {
    if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    if(!num || isNaN(num)) return player.outputChatBox('SYNTAX: /setmoney [amount]');
    gm.mysql.Handle.query('UPDATE `user` SET money = ? WHERE name = ?', [num, player.name], function(err, res){
        if(!err){
            player.data.money = num;
            player.outputChatBox("Money Updated");
        } else {
            console.log(err)
        }
    });
});

//КОМАНДЫ ДЛЯ АДМИНИСТРАЦИИ
mp.events.addCommand('ah', (player, text) =>
{
    if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
 		player.notify('/a - админ чат\n/kick - кик игрокас игры\n/ban - выдать бан игроку');
        player.notify('/spec - зайти в режим наблюдения\n/tphere - телепорт к себе игрока\n/goto - телепорт к игроку');
        player.notify('/gotospawn - телепорт на спавн\n/w - выдать оружие\n/weapons - выдать оркжие (определенное)');
        player.notify('/time - кстпноаить время\n/setw - установить погоду\n/delveh - del все авто');
        player.notify('/sethp - вылечить игрока\n/arm - выдать броню\n/kill - убить игрока');
        player.notify('/veh - заспавнить игрока\n/fix - починить авто\n/color - изменить цвет авто');

    
});

/////////////////////////////////НЕ РАБОЧЕЕ//////////////////////////////////////////////
/*
mp.events.addCommand('gm1', (player) => {
	if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
		Player.setInvincible(true);
      	mp.gui.chat.push("гм активен");
	});

/////////////////////////////////НЕ РАБОЧЕЕ//////////////////////////////////////////////

mp.events.addCommand('gm2', (player) => {
	if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
		Player.setInvincible(false);
      	mp.gui.chat.push("гм отключен");
    });
*/

/////////////////////////////////НЕ РАБОЧЕЕ//////////////////////////////////////////////
//НЕ ДОРАБОТАННОЕ АДМ МЕНЮ
/*
mp.events.addCommand('amenu', (player) =>
{
    if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    player.notify('Админ меню Бета'); //МЕНЮ В КОДЕ ЕСТЬ... ОСТАЛОСЬ ТОКО JS НАПИСАТЬ ЧТОБЫ ВСЯ МЕНЮХА РАБОТАЛА
    player.call('showamenu');
});
*/
/////////////////////////////////НЕ РАБОЧЕЕ//////////////////////////////////////////////
/*mp.events.addCommand('heal', (player) => {
    if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    player.health = 100;
});*/

mp.events.addCommand('sethp', (player, _, target, hp) => {
    if(player.admin < 2) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    if (target == undefined || hp == undefined) return player.outputChatBox('/sethp [player] [hp]');
    var p = mp.players.at(target);
    if (p == null) return player.notify('~r~ID игрока не найден!');
    p.health = parseInt(hp);
})

//ВЫДАТЬ БРОНЮ
mp.events.addCommand('arm', (player, _, target, arm) => {
    if(player.admin < 2) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    if (target == undefined || arm == undefined) return player.outputChatBox('/arm [player] [armour]');
    var p = mp.players.at(target);
    if (p == null) return player.notify('~r~ID игрока не найден!');
    p.armour = parseInt(arm);
})

//УБИТЬ ИГРОКА
mp.events.addCommand('kill', (player) => {
    if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    player.health = 0;
});

/////////////////////////////////НЕ РАБОЧЕЕ//////////////////////////////////////////////
//ТЕЛЕПОРТ ИГРОКА НА СПАВН
/* //УЖЕ ЕСТЬ КОМАНДА gotospawn
mp.events.addCommand('resetpos', (player) => {
    if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    player.spawn(new mp.Vector3(203.907, -931.770, 30.691));
});*/

//АДМИН ЧАТ
mp.events.addCommand('a', (player, text) =>
{
    if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    if(!text) return player.outputChatBox("Правильное использование: /a [text]!");
    mp.players.forEach((_player, id) =>
    {
        if(_player.admin)
        {
            switch(player.admin)
            {
                case 4:
                {
                    _player.outputChatBox("<span style='color:#FFC300'>[A] Разработчик | " + player.name + " (ID:" + player.id + ") :</span> <span style='color:#FFFFFF'>" + text);
                    break;
                }
            	case 3:
                {
                    _player.outputChatBox("<span style='color:#FFC300'>[A] Основатель | " + player.name + " (ID:" + player.id + ") :</span> <span style='color:#FFFFFF'>" + text);
                    break;
                }
                case 2:
                {
                    _player.outputChatBox("<span style='color:#FFC300'>[A] Админ | " + player.name + " (ID:" + player.id + ") :</span> <span style='color:#FFFFFF'>" + text);
                    break;
                }
                case 1:
                {
                    _player.outputChatBox("<span style='color:#FFC300'>[A] М.Админ | " + player.name + " (ID:" + player.id + ") :</span> <span style='color:#FFFFFF'>" + text);
                    break;
                }
            }
        }
    });
    console.log("<ACHAT LOG> " + "(ALVL:" + player.admin + ")" + " (ID: " + player.id + ") " + player.name + ": " + text);
});

//КОМАНДА KICK НА 50% РАБОЧЯЯ
mp.events.addCommand('kick', (player, target, reason) =>
{
    if(player.admin < 2) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    if(typeof target == 'undefined') return player.outputChatBox("Правильное использование: /kick [target] [reason]");
    if(!target || reason.length < 1) return player.outputChatBox("Правильное использование: /kick [target] [reason]");
    const recipient = gm.utility.findPlayerByIdOrNickname(target);
    if(!recipient)
    {
        player.outputChatBox("<ERROR> <b>" + recipient + " не подключен!</b>");
        return false;
    }
    recipient.outputChatBox("<SERVER> Вы были кикнуты с игры дауном: " + player.name + " по причине: " + reason);
    player.outputChatBox("<SERVER> Вы кикнули: " + recipient + " причина: " + reason);
    setTimeout(function()
    {
        recipient.kick(reason);
    }, 1500);
});

//КОМАНДА BAN В ПРОЦЕССЕ...
mp.events.addCommand('ban', (player, target) =>
{
    if(player.admin < 2) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    player.notify('~r~ERROR!');
});

//ИЗМЕНЕНИЕ ВРЕМЕНИ НА СЕРВЕРЕ
mp.events.addCommand('time', (player, time) =>
{
    if(player.admin < 2) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    if (typeof time == 'undefined') return player.outputChatBox("Правильное использование: /time [0-24]");
    if(time < 0 || time > 24) return player.outputChatBox("<SERVER> Временной диапазон 0-24!");
    mp.world.time.hour = parseInt(time);
    player.notify('~g~Вы изменили время!');
    mp.players.broadcast(`${player.name} изменил время игры!`);
    console.log(`<LOG> ${player.name} изменил время игры!`);
});

//ИЗМЕНЕНИЕ ПОГОДЫ
mp.events.addCommand('setw', (player, _, weather) => {
    if(player.admin < 2) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    if (weather == undefined) return player.outputChatBox('/setw [weather]');
    mp.world.weather = weather;
    mp.players.broadcast(`${player.name} изменил погоду в игре!`);
    console.log(`<LOG> ${player.name} изменил погоду в игре!`);
})

//СПЕКТАТОР МОД
mp.events.addCommand('spec', (player, target) =>
{
    if(player.admin < 2) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    freecamToggle();
    //player.call("server_to_client_AddNotify", [5000, `Скоро...`, 2]);
    player.notify('~g~ Freecam');
    //player.outputChatBox("soon");
});

//ТЕЛЕПОРТ К ИГРОКУ
mp.events.addCommand('goto', (player, target) =>
{
	if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    if (typeof target == 'undefined') return player.outputChatBox("Правильное использование: /goto [target]");
    const targetPlayer = gm.utility.findPlayerByIdOrNickname(target);
    let targetPos = targetPlayer.position;
    targetPos.x += 5.0;
    player.position = targetPos;
    player.notify('~g~Вы на месте!');
});

/////////////////////////////////НЕ РАБОЧЕЕ//////////////////////////////////////////////
//ТЕЛЕПОРТ ИГРОКА К СЕБЕ
/*mp.events.addCommand('tphere', (player, target) =>
{
    if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    if (typeof target == 'undefined') return player.outputChatBox("Правильное использование: /tphere [target]");
    const targetPlayer = gm.utility.findPlayerByIdOrNickname(target);
    let playerPos = player.position;
    playerPos.x += 5.0;
    targetPlayer.position = playerPos;
    player.notify('Игрок на месте!');
});*/

//ТЕЛЕПОРТ ИГРОКА К СЕБЕ
mp.events.addCommand('tphere', (player, _, id) => {
    if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    if (id == undefined) return player.outputChatBox('/tphere [id]');
    let target = mp.players.at(id);
    if (target == null) return player.notify('~r~ID игрока не найден!');
    target.dimension = player.dimension;
    target.position = player.position;
    player.notify(`~g~ Вы телепортировали ~y~${target.id} ~g~ID`);
})

//ВЫДАЧА ОРУЖМЯ ПО НАЗВАНИЮ
mp.events.addCommand('w', (player,  _, target, weapon) =>
{
    if(player.admin < 2) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    if (typeof target == 'undefined') return player.outputChatBox("Правильное использование: /w [target] [weapon id]");
    if (target && target.trim().length > 0)
    {
        const targetPlayer = gm.utility.findPlayerByIdOrNickname(target);
        if (!targetPlayer)
        {
            player.outputChatBox("<ERROR> <b>" + targetPlayer + " не подключен!</b>");
            return false;
        }
        targetPlayer.giveWeapon(mp.joaat(weapon), 10000);
        player.notify('~g~ Полученно!');
    }
});

//ВЫДАЧА ОРУЖИЯ ПАЧКОЙ
mp.events.addCommand('weapons', (player) => {
    if(player.admin < 2) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    player.notify('~g~ Полученно!');
    player.giveWeapon([0xC1B3C3D1, 0xCB96392F, 0xBFEFFF6D, 0x83BF0278, 0xA89CB99E], 10000); // ВЫДАЕТЬСЯ МАКСИМУМ ПАТРОН НА ОРУЖИЕ
});

/////////////////////////////////НЕ РАБОЧЕЕ//////////////////////////////////////////////
//ОЧИСТА ВСЕЙ КАРТЫ ОТ ТС В КОТОРЫХ НЕ СИДЯТ ЛЮДИ
/*mp.events.addCommand('clean', (player) =>
{
    if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    mp.vehicles.forEach((vehicle) =>
    {
        if(vehicle.getOccupants().length == 0)
        {
            vehicle.destroy();
        }
    });
    player.notify('Все автомобили убраны!');
    console.log("<LOG> Все авто были зареспавнены! ");
});*/

//УДОЛЯЕТ ВСЕ АВТО + ПИШЕТ НА ВЕСЬ СЕРВЕР ОБ ЭТОМ
mp.events.addCommand(`delveh`,
    (player) => {
        if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
        mp.vehicles.forEach(
            (vehicle) => {
                vehicle.destroy();
            }
        );
        mp.players.broadcast(`${player.name} Удалил все машины!`);
        console.log(`<LOG> ${player.name} Удалил все машины!`);
    }
);

/////////////////////////////////НЕ РАБОЧЕЕ//////////////////////////////////////////////
//СПАВН ЛЮБОГО АВТО
/*mp.events.addCommand('veh', (player,  _, veh_name) =>
{
    if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    if(!veh_name) return player.outputChatBox("Правильное использование: /veh [авто]!");
    let pos = player.position;
    pos.x += 2.0;
    let veh = mp.vehicles.new(mp.joaat(veh_name), pos);
    player.putIntoVehicle(veh, -1);
    veh.dimension = player.dimension;
    veh.numberPlate = "SWG RP";
    veh.data.playerSpawned = 1;
    player.notify('Заспавенно!');
});

/////////////////////////////////НЕ РАБОЧЕЕ//////////////////////////////////////////////
mp.events.addCommand('test', (player) => {
    //player.setCanBeKnockedOffVehicle(state);
    player.notify('тест!');
    let flag = !player.getConfigFlag(32, true);
    player.setConfigFlag(32, flag);
    mp.gui.chat.push('Seatbelt '+(flag?'off':'on'));
})*/
/*
mp.events.addCommand('givemoney', (player, _, money) => {
    player.money += 300;
});*/

//Тюнинг
mp.events.addCommand('tune', (player, _, modType, modIndex) => {
    if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    if (modType == undefined || modIndex == undefined) return player.outputChatBox('/tune [type] [Index]');
    /*let tune1 = parseInt(modType);
    let tune2 = parseInt(modIndex);
    if (tune1 == null) return player.notify('~r~modType игрока не найден!');
    if (tune2 == null) return player.notify('~r~modIndex не найден!');*/
    player.vehicle.setMod(parseInt(modType), parseInt(modIndex));
    //vehicle.setMod(tune1, tune2);
    player.notify('~g~ Выполнено!')
});

//ФИКС КОМАНДЫ (КРЧ НОРМ СПАВН ТУТ)
mp.events.addCommand('veh', (player, _, id, veh, color1, color2) => {
    if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    if (id == undefined || veh == undefined) return player.outputChatBox('/veh [id] [model] [color1] [color2]');
    let target = mp.players.at(id);
    if (target == null) return player.notify('~r~ID игрока не найден!');
    let pos;
    pos = target.position;
    var adminVeh = mp.vehicles.new(mp.joaat(veh), new mp.Vector3(pos.x + 2, pos.y, pos.z));
    adminVeh.setColor(parseInt(color1), parseInt(color2));
    adminVeh.numberPlate = "SWG RP";
    player.dim = player.id;
    setTimeout(() => {
        target.putIntoVehicle(adminVeh, 0) // Спавн за водительское место
    }, 150)
    player.notify('~g~ Заспавенно!');
})

/////////////////////////////////НЕ РАБОЧЕЕ//////////////////////////////////////////////
//ПОЧИНИТЬ АВТО
/*mp.events.addCommand('fix', (player) =>
{
    if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    player.vehicle.repair();
    player.notify('Авто было починено!');
});*/

//ПОЧИНКА АВТО ИСПРАВЛЕННАЯ
mp.events.addCommand('fix', (player, _, id) => {
    if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    if (id == undefined) {
        if (!player.vehicle) return player.notify('~r~Вы не в транспорте!');
        player.vehicle.repair();
    } else {
        let target = mp.players.at(id);
        if (target == null) return player.notify('~r~ID игрока не найден!');
        target.vehicle.repair();
    }
})

//ИЗМЕНЕНИЕ ЦВЕТА АВТО
mp.events.addCommand('colour', (player, colour1, colour2) =>
{
    if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    if (!colour1 || !colour2) return player.outputChatBox("Правильное использование: /colour [primary] [secondary]");
    let veh = player.vehicle;
    let primary = parseInt(colour1);
    let secondary = parseInt(colour2);
    veh.setColor(primary, secondary);
    player.notify('~g~Цвет изменен!');
    //player.outputChatBox("<SRV> Цвет изменен!");
});


//ТЕЛЕПОРТ НА СПАВН
mp.events.addCommand('gotospawn', (player) =>
{
    if(player.admin < 1) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
    player.position = new mp.Vector3(-1037.7287, -2737.8232, 20.1962);
    player.notify('~g~Вы на спавне!');
});

//ТЕЛЕВОРТ НА КОРДИНАТЫ
mp.events.addCommand('gotopos', (player, position) =>
{
    if(player.admin < 4) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!"); //СДЕЛАЛ ДОСТУПНЫМ ТОКО РАЗРАБОТЧИКУ
    if (typeof target == 'undefined') return player.outputChatBox("Правильное использование: /gotopos [coords]");
    let targetPos = parseFloat(position);
    player.position = targetPos;
    player.notify('~g~Вы на месте!');
});

//УЗНАТЬ СВОИ ТОЧНЫЕ КООРДИНАТЫ
mp.events.addCommand('pos', (player) =>
{
    if(player.admin < 4) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!"); //СДЕЛАЛ ДОСТУПНЫМ ТОКО РАЗРАБОТЧИКУ
    let pos = player.position;
    player.outputChatBox("<SRV> " + player.position);
});

//НАЦЕПИТЬ ОДЕЖДУ НА ИГРОКА
mp.events.addCommand('setcloth', (player, _, component, drawable, texture, pallete) => {
    if(player.admin < 3) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!"); //СДЕЛАЛ ДОСТУПНЫМ ТОКО РАЗРАБОТЧИКУ
    if (component == undefined || drawable == undefined) return player.outputChatBox('/setcloth [component] [drawable] [texture? [pallete?]]');
    player.setClothes(parseInt(component), parseInt(drawable), parseInt(texture), parseInt(pallete));
})