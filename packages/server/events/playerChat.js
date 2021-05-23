//СТАРЫЙ КОД ЧАТА

/*
mp.events.add("playerChat", (player, text) =>
{
	mp.players.broadcast("<span style='color:#38e09f'>(" + player.id + ") " + player.name + "</span>: <span style='color:#ffffff'>" + text + "</span>");
	console.log("<CHAT LOG>" + " (" + player.id + ") " + player.name + ": " + text);
});*/

//НОВЫЙ КОД ЧАТА

mp.events.add('playerChat', (player, message) => {
    let pos = player.position;
    mp.players.broadcastInRange(pos, 15,`!{f1f1f1}${player.name} (${player.id}) сказал: ${message}`);
    console.log("<CHAT LOG>" + player.name + " (id: " + player.id + "): " + message);
});