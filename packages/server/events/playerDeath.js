
﻿mp.events.add('playerDeath', (player, reason, killer) => {
    const deathName = player.name;
    if (killer) {
        const killerName = killer.name;
        player.notify('~r~' + deathName + ' был убит ' + killerName);
        console.log("<Kill log> {#FF0000}${deathName} был убит ${killerName}!"); //ЛОГ В КОНСОЛЬ
    } else {
        player.notify('~r~' + deathName + ' покончил с собой');
        console.log("<Kill log> {#FF0000}${deathName} покончил с собой!"); //ЛОГ В КОНСОЛЬ
    }

    setTimeout(() => {
    player.playAnimation('mp_arresting', 'idle', 1, 49) //ЧЕРЕЗ 3 СЕКУНДЫ СТАВИТ АНИМАЦИЮ
        setTimeout(() => {
        player.spawn(new mp.Vector3(-466.1144, -290.8322, 34.9115)); //ЧЕРЕЗ МИНУТУ ТЕПАЕТ В БОЛЬКУ И ДАЕТ 10 HP
        player.health = 10;
        setTimeout(() => {
        player.health = 10;
        setTimeout(() => {
        player.health = 10;
        setTimeout(() => {
        player.health = 10;
        setTimeout(() => {
        player.health = 10;
        setTimeout(() => {
        player.health = 10;
        setTimeout(() => {
        player.health = 10;
        setTimeout(() => {
        player.health = 10;
        setTimeout(() => {
        player.health = 10;
        setTimeout(() => {
        player.health = 10;
        setTimeout(() => {
        player.health = 10;
        player.notify('Вы закончили личение');
    }, 5000)
    }, 5000)
    }, 5000)
    }, 5000)
    }, 5000)
    }, 5000)
    }, 5000)
    }, 5000)
    }, 5000)
    }, 5000)
    }, 60000)
    }, 3000)
});
