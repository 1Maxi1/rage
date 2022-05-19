
﻿mp.events.add('playerDeath', (player, reason, killer) => { //Ивент смерти
    const deathName = player.name; //Узнаем имя умершего
    if (killer) {
        const killerName = killer.name; //Узнаем имя убийци
        player.notify('~r~' + deathName + ' был убит ' + killerName + "!"); //Лог в игру над картой
        console.log("<Kill log> " + deathName + " был убит " + killerName + "!"); //ЛОГ В КОНСОЛЬ
    } else {
        player.notify('~r~' + deathName + ' покончил с собой!'); //Лог в игру над картой
        console.log("<Kill log> " + deathName + " покончил с собой!"); //ЛОГ В КОНСОЛЬ
    }
     
    let pos;
    pos = player.position; 
    player.spawn(pos); //Спавним игрока на позиции его смерти
    player.health = 100; //Выставляем фулл хп
    player.playAnimation('mp_arresting', 'idle', 1, 49) //Выдаем анимацию игроку
    setTimeout(() => {
        player.spawn(new mp.Vector3(-466.1144, -290.8322, 34.9115)); //ЧЕРЕЗ МИНУТУ ТЕПАЕТ В БОЛЬКУ И ДАЕТ 10 HP
        player.notify('~g~Ваше лечение начато!');
        player.health = 10;
        setTimeout(() => {
        player.notify('~g~+90 HP');
        player.health = +90;
        player.notify('~g~Вы закончили личение');
    }, 1000) 
    }, 60000)
});
