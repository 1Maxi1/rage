/*mp.events.add('initVariables', (player) => {
    //player.colshape = null;
    player.house = 0;
});

let housePoints = [
    //[245.884, -1159.265, 29.16]
    //[-1271.1121, -1200.8280, 5.3662]
    [-1090.8760, -2593.1088, 20.1692]
]

let houseColshapes = []

// Создание лейблов и колшейпов
for (let i = 0; i < housePoints.length; i++) {
    let label = mp.labels.new('Дом #1~n~~g~Свободен', new mp.Vector3(housePoints[i][0], housePoints[i][1], housePoints[i][2] + 1), {
        color: [255, 255, 255, 200],
        drawDistance: 10,
        los: true,
        font: 4
    });
    let marker = mp.markers.new(0, new mp.Vector3(housePoints[i][0], housePoints[i][1], housePoints[i][2]), 0.75, {
        color: [255, 255, 0, 200]
    });
    let colshape = mp.colshapes.newSphere(housePoints[i][0], housePoints[i][1], housePoints[i][2], 1);
    colshape.info = {
        id: i + 1,
        label: label,
        marker: marker,
        hemp: 0
    }

    houseColshapes.push(colshape);
}
*/
mp.events.addCommand("addhouse", (player, args) => {
         if(player.admin < 4) return player.outputChatBox("<SERVER> У вас нет доступа к этой команде!");
        if (isNaN(parseInt(rare = args[1])) || isNaN(parseInt(coast = args[2])) || isNaN(interior = parseInt(args[3])) || isNaN(parseInt(garage = args[4])) || isNaN(max_cars = parseInt(args[5]))) return player.outputChatBox("Используйте: /addhouse [rare] [coast] [interior] [garage] [max_cars]"); 
        //if (rare = args[1] == undefined || coast = args[2] == undefined || interior = args[3] == undefined || garage = args[4] == undefined || max_cars = args[5] == undefined) return player.outputChatBox("Используйте: /addhouse [rare] [coast] [interior] [garage] [max_cars]"); 
          if(parseInt(rare) >= 0 && parseInt(coast) >= 0 && parseInt(interior) >= 0 && parseInt(garage) >= 0 && max_cars >= 1) {
            let get_id = 0;
            let get_count = 0;
            gm.mysql.Handle.query('SELECT COUNT(*) AS count FROM houses', [], function (error, results, fields) {
              get_count = results[0].count;
              let array_max_cars = new Array(parseInt(max_cars));
              let array_gen = {x: 'NONE', y: 'NONE', z: 'NONE'};
              for(let i = 0; i < max_cars; i++) {
                array_max_cars = array_gen;
              }
              let max_cars_pos = JSON.stringify(array_max_cars);
              var query = gm.mysql.Handle.query('INSERT INTO houses SET pos_x = ?, pos_y = ?, pos_z = ?, pos_heading = ?, rare = ?, coast = ?, interior = ?, garage = ?, garage_enter_pos_x = ?, garage_enter_pos_y = ?, garage_enter_pos_z = ?, garage_enter_pos_r = ?, max_cars_count = ?, max_cars_pos = ?', [player.position.x, player.position.y, player.position.z, player.heading, rare, coast, interior, garage, 0, 0, 0, 0, max_cars, max_cars_pos], function (error, results, fields) {
                console.log(error);
              });
              configure.housesblips[get_count] = mp.blips.new(40, new mp.Vector3(parseFloat(player.position.x), parseFloat(player.position.y), parseFloat(player.position.z)),
              {
                  name: "Дом",
                  scale: 1,
                  color: 2,
                  drawDistance: 100,
                  shortRange: 100,
                  rotation: 0,
                  dimension: 0,
              });
              configure.housesmarkers[get_count] = mp.markers.new(0, new mp.Vector3(parseFloat(player.position.x), parseFloat(player.position.y), parseFloat(player.position.z)), 1,
              {
                  direction: new mp.Vector3(0,0,0),
                  rotation: new mp.Vector3(0,0,0),
                  visible: true,
                  dimension: 0
              });
              configure.housesmarkers[get_count].setColor(255, 247, 0, 255);
              configure.housescolshapes[get_count] = mp.colshapes.newRectangle(player.position.x, player.position.y, 1, 1);
              configure.housesnumber[get_count] = get_count;
              configure.housestate[get_count] = 0;
              configure.housesrare[get_count] = parseInt(rare);
              configure.housesowner[get_count] = "NONE";
              configure.housescoast[get_count] = parseInt(coast);
              configure.housesinterior[get_count] = parseInt(interior);
              configure.housesgarage[get_count] = parseInt(garage);
              player.outputChatBox("Дом установлен!");
              if(parseInt(garage) >= 1) {
                 player.outputChatBox("Для установки точки выезда/въезда в гараж используйте: /setgarage");
              }
              //logger.write("[" + namepos + "]: " + "X: " + get_pos.x + "; Y: " + get_pos.y + "; Z: " + get_pos.z + ";");
            });
          } else {
            player.outputChatBox("Для установки дома, необходимо выбрать следующее параметры:");
            player.outputChatBox("Классы домов: 0 [H], 1 [M], 2 [R], 3 [A]");
            player.outputChatBox("[/addhouse]: [rare] [coast] [interior] [garage] [max_cars]");
          }
     });