
//КОМАНДА do КОТОРАЯ ПРИ ИСПОЛЬЗЫВАНИЕ ОПИСЫВАЕТ МЕСТНОСТЬ
mp.events.addCommand('do', (player, message) => {
    //chatCommand(player, message, '(описание): /do [описание]', `!{c2a3da}*  ${message} ((${player.name}))`, 20);
    if (message == undefined || message == undefined) return player.outputChatBox('(описание): /do [описание]');
    mp.players.broadcast(`!{c2a3da}*  ${message} ((${player.name}!{c2a3da} ))`, 20);
});

//КОМАНДА me КОТОРАЯ ПРИ ИСПОЛЬЗОВАНИЕ ПОКАЗЫВАЕТ ДЕЙСТВИЕ ИГРОКА
mp.events.addCommand('me', (player, message) => {
    //chatCommand(player, message, '(действие): /me [действие]', `!{c2a3da}* ${player.name} ${message}`, 20);
    if (message == undefined || message == undefined) return player.outputChatBox('(действие): /me [действие]');
    mp.players.broadcast(`!{c2a3da}* ${player.name} !{c2a3da}${message}`, 20);
});

//КОМАНДА b НОН РП ЧАТ
mp.events.addCommand('b', (player, message) => {
    //chatCommand(player, message, '(OOC): /b [message]', `!{424242} ((${player.name}: ${message}))`, 25)
    if (message == undefined || message == undefined) return player.outputChatBox('(OOC): /b [message]');
    mp.players.broadcast(`!{424242} ((!{FFFFFF}${player.name}!{FFFFFF}: ${message}!{424242} ))`, 25);
});

//КОМАНДА s КОТОРАЯ ПОКАЗЫВАЕТ ЧТО ИГРОК КРИЧИТ ОПРЕДЕЛЕННЫЙ ТЕКСТ
mp.events.addCommand('s', (player, message) => {
    //chatCommand(player, message, '(крикнуть): /s [message]', `!{FFFFFF} ${player.name} крикнул: ${message}`, 25);
    if (message == undefined || message == undefined) return player.outputChatBox('(крикнуть): /s [message]');
    mp.players.broadcast(`!{FFFFFF} ${player.name} !{FFFFFF}крикнул: ${message}`, 25);
});
