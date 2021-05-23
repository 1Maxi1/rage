
global.gm       = {};
global.server   = {};


//Лого которе я заебался делать
console.log('\x1b[32m[DONE]\x1b[0m\x1b[32m[=========================================================]\x1b[0m');
console.log('\x1b[32m[DONE]\x1b[0m 	   Спасибо что используете мод от C4!');
console.log('\x1b[32m[DONE]\x1b[0m');
console.log('\x1b[32m[DONE]\x1b[0m');
console.log('\x1b[32m[DONE]\x1b[0m		░█████╗░░░██╗██╗');
console.log('\x1b[32m[DONE]\x1b[0m		██╔══██╗░██╔╝██║');
console.log('\x1b[32m[DONE]\x1b[0m		██║░░╚═╝██╔╝░██║');
console.log('\x1b[32m[DONE]\x1b[0m		██║░░██╗███████║');
console.log('\x1b[32m[DONE]\x1b[0m		╚█████╔╝╚════██║');
console.log('\x1b[32m[DONE]\x1b[0m		░╚════╝░░░░░░╚═╝');
console.log('\x1b[32m[DONE]\x1b[0m		Server loading...');
console.log('\x1b[32m[DONE]\x1b[0m');
console.log('\x1b[32m[DONE]\x1b[0m\x1b[32m[=========================================================]\x1b[0m');

gm.cronjob      = require('node-cron');
gm.bcrypt		= require('bcrypt-nodejs');
gm.mysql        = require('./core/mysql');
gm.utility      = require('./core/utility');

const express = require('express');
const app = express();

gm.mysql.Connect(function() { });

let fs          = require('fs');
let path        = require('path');

require('./commands/player');
require('./commands/admin');
require('./game/test');
require('./game/house');

var registeredEvents = [];

fs.readdirSync(path.resolve(__dirname, 'events')).forEach(src =>
{
	process.stdout.write('\t\"EVENT LOADED: ')
	process.stdout.write('\t\"' + src + '\"' + '\n');
	registeredEvents = registeredEvents.concat(require('./events/' + src));
});

registeredEvents.forEach(event => { mp.events.add(event); });

gm.cronjob.schedule('5 * * * *', function()
{
	mp.vehicles.forEach((vehicle) =>
	{
		if(vehicle.getOccupants().length == 0)
		{
			vehicle.destroy();
		}
	});
	console.log("<LOG> Все автомобили были зареспавнены! ");
});

gm.cronjob.schedule('10 * * * *', function()
{
	mp.players.forEach((player, id) =>
	{
		if(player.logged = 1)
		{
			gm.utility.saveAccount(player);
		}
		console.log("<LOG> Все аккаунты были успешно сохранены!");
	});
});

mp.events.add('render', () => {
    mp.game.player.restoreStamina(100);
});

const exit = async () => {
  yarp.log.warning('Closing Connection. Bye-bye.');
  await mp.players.broadcast(`!{red}Сервер закрыл соединение. Подключитесь сново с помощью F1.`);
  for (let player of mp.players.toArray()) {
    player.kick('The server is closing.');
    yarp.log.info(`${player.name}(${player.socialClub}/${player.ip}) вышел.`+'Причина: Сервер выключен. (kicked)');
  }
  process.exit();
};