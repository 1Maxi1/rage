var HUD = new Vue({
    el: ".inGameHud",
    data: {
        show: false,

        // Player data
        ammo: 0,
        money: 0,
        bank: 0,
        eat: 0,
        water: 0,
        mic: false,
        time: "00:00",
        date: "00.00.00",

        street: "",
        crossingRoad: "",

        // Vehicle data
        inVeh: false,
        belt: false,
        engine: false,
        doors: false,
        speed: 0,
        cruiseColor: '#ffffff', // cruise mode color ('#ffffff' = off, '#eebe00' = on)
        ifuel: 0, // Fuel Info (0 - Red, 1 - Yellow, 2 - Green)
        fuel: 0,
        hp: 0,
    },
    methods: {
        setTime: (time, date) => {
            this.time = time;
            this.date = date;
        }, 
        updateSpeed(currentspeed, maxspeed = 200)
        {
            this.speed = currentspeed;

            /*
            var speedPercent = Math.floor(currentspeed / maxspeed * 100);
            if(speedPercent > 100) speedPercent = 100;

            var 
                redColor = new Color(228, 66, 66),
                whiteColor = new Color(255, 255, 255),
                yellowColor = new Color(225, 228, 66),
                start = whiteColor,
                end = yellowColor;
        
            if (speedPercent > 50) {
                speedPercent = speedPercent % 51;
                start = yellowColor;
                end = redColor;
            }

            var 
                startColors = start.getColors(),
                endColors = end.getColors();
            var r = InterpolateColor(startColors.r, endColors.r, 50, speedPercent);
            var g = InterpolateColor(startColors.g, endColors.g, 50, speedPercent);
            var b = InterpolateColor(startColors.b, endColors.b, 50, speedPercent);
        
            $('.speedhud').css("color", "rgb(" + r + "," + g + "," + b + ")");
            */

            //

            const meters = document.querySelectorAll('svg[data-value] .meter');

            meters.forEach( (path) => {
            
                let length = path.getTotalLength();
                

            
                let c = parseInt(path.parentNode.getAttribute('data-value'));
                
                let value = 0.4166666666666667 * c;
                let rotate = -130 + (value * 2.61153846153846);
                
                let to = length * ((100 - value) / 100);
                //alert(to);
                path.getBoundingClientRect();
                
                path.style.strokeDashoffset = Math.max(0, to);  
            });
        }
    }
})

var logotype = new Vue({
    el: ".logobox",
    data: {
        show: false,
        server: 0,
        online: 0,
        playerId: 0,
        time: "00:00",
        date: "00.00.00",
    },
    methods: {
        setTime: (time, date) => {
            this.time = time;
            this.date = date;
        }
    }
});

global.showhud = true;

var hudstatus =
{

    online: 0, 

    street: null,
    area: null,


}


mp.events.add('showhud', (show) => {
    hud = mp.browsers.new('package://cef/index.html');
    if (!show) mp.gui.execute(`hidehelp(${!showhud})`);
    else if (show && showHint) mp.gui.execute(`hidehelp(${!showhud})`);

    if(show) mp.gui.execute(`logotype.server=${serverid};`);
    mp.gui.execute(`hidehud(${!showhud})`);

    var screen = mp.game.graphics.getScreenActiveResolution(0,0);
    mp.gui.execute(`updateSafeZoneSize(${screen.x},${screen.y},${hudstatus.safezone})`);

});

mp.events.add('render', (nametags) => {

    if (!global.loggedin) return;  
    //mp.game.ui.hideHudComponentThisFrame(2); // HUD_WEAPON_ICON
    mp.game.ui.hideHudComponentThisFrame(3); // HUD_CASH
   // mp.game.ui.hideHudComponentThisFrame(6); // HUD_VEHICLE_NAME
    mp.game.ui.hideHudComponentThisFrame(7); // HUD_AREA_NAME
    //mp.game.ui.hideHudComponentThisFrame(8); // HUD_VEHICLE_CLASS
    mp.game.ui.hideHudComponentThisFrame(9); // HUD_STREET_NAME
   // mp.game.ui.hideHudComponentThisFrame(19); // HUD_WEAPON_WHEEL
    //mp.game.ui.hideHudComponentThisFrame(20); // HUD_WEAPON_WHEEL_STATS
    //mp.game.ui.hideHudComponentThisFrame(22); // MAX_HUD_WEAPONS

    if (hudstatus.online != mp.players.length) {

        hudstatus.online = mp.players.length;
        mp.gui.execute(`logotype.online=${hudstatus.online}`);
    }

    var street = mp.game.pathfind.getStreetNameAtCoord(localplayer.position.x, localplayer.position.y, localplayer.position.z, 0, 0);
    let area  = mp.game.zone.getNameOfZone(localplayer.position.x, localplayer.position.y, localplayer.position.z);
    if(hudstatus.street != street || hudstatus.area != area)
    {
        hudstatus.street = street;
        hudstatus.area = area;   
        
        mp.gui.execute(`HUD.street='${mp.game.ui.getStreetNameFromHashKey(street.streetName)}'`);
        mp.gui.execute(`HUD.crossingRoad='${mp.game.ui.getLabelText(hudstatus.area)}'`);
    }
});