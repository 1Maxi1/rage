mp.events.add('playerChat', (player, message) => {
    let pos = player.position;
    mp.players.broadcastInRange(pos, 15,`!{f1f1f1}${player.name} (${player.id}) сказал: ${message}`);
    console.log("<CHAT LOG>" + player.name + " (id: " + player.id + "): " + message);
});
