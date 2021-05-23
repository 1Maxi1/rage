require('authenticate.js');
require('peds.js');
require ('noclip.js');
global.playerheading = require('./game_resources/plugins/rotatorplayer.js'); // оптимизация

let hud;
mp.events.add('showhud', () => {
	hud = mp.browsers.new('package://ui/cef/test.html');
})

mp.discord.update('Играет на', 'SWG RP');//АКТИВНОСТЬ В ДС
mp.game.controls.disableControlAction(2, 243, true); //УБЕРАЕТ ЧИТ-КОДЫ
mp.game.gxt.set("PM_PAUSE_HDR", "SWG RP | Новая политека"); //ТЕКСТ НАД КАРТОЙ В ESC