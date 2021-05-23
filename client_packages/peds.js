////////////////////////////////////////////////////////////
//	
//					ПЕДЫ И МАРКЕРЫ
//		https://wiki.gtanet.work/index.php/Peds
//					ВИКИ ПЕДОВ
//
///////////////////////////////////////////////////////////
/*
var Peds = [
...
{ Hash: -413447396, Pos: new mp.Vector3(-795.5082, -220.2381, 37.0796), Angle: 177.2829 }, // ПЕД НА СВАПНЕ
];
*/
// -795.5082, -220.2381, 37.0796 маркер для премиум авто

/*mp.markers.new(29, pos, scale,
{
    direction: direction,
    rotation: rotation,
    color: color,
    visible: visible,
    dimension: dimension
});*/

mp.peds.new(0x8384FC9F, new mp.Vector3(-1037.8530, -2732.2778, 20.1692), 180, 0); //Фермер

//КАРТА ПРЕМ САЛОНА
let CarpBLIP = mp.blips.new(530, new mp.Vector3(-795.5082, -220.2381, 37.0796),
    {
        name: 'Салон премиум авто',
        color: 4,
        shortRange: true,
});

//БОЛЬНИЦА LS
let HispitalBLIP = mp.blips.new(61, new mp.Vector3(-443.0191, -348.6816, 34.9107),
    {
        name: 'Больница',
        color: 4,
        shortRange: true,
});

//МЕРИЯ
let MeriyaBLIP = mp.blips.new(419, new mp.Vector3(-550.7510, -194.5242, 38.2203),
    {
        name: 'Мерия',
        color: 4,
        shortRange: true,
});

//LSC 1
let lsc1BLIP = mp.blips.new(72, new mp.Vector3(-338.2213, -136.1446, 39.009),
    {
        name: 'LSC',
        color: 4,
        shortRange: true,
});

//LSC 2
let lsc2BLIP = mp.blips.new(72, new mp.Vector3(-1153.6303, -2006.8615, 13.1802),
    {
        name: 'LSC',
        color: 4,
        shortRange: true,
});

//LSC 3
let lsc3BLIP = mp.blips.new(72, new mp.Vector3(732.5170, -1084.1004, 22.1689),
    {
        name: 'LSC',
        color: 4,
        shortRange: true,
});

//КАЗИНО
let casinoBLIP = mp.blips.new(680, new mp.Vector3(932.6956, 41.1053, 80.2917),
    {
        name: 'Казино Diamond',
        color: 1,
        shortRange: true,
});

// 24/7
let shop1BLIP = mp.blips.new(11, new mp.Vector3(2554.9423, 386.4131, 108.6229),
    {
        name: 'Магазин 24/7',
        color: 2,
        shortRange: true,
});

// АЗС
let azs1BLIP = mp.blips.new(361, new mp.Vector3(2580.7646, 362.2629, 108.4687),
    {
        name: 'АЗС',
        color: 1,
        shortRange: true,
});

//АБ

let autob1BLIP = mp.blips.new(530, new mp.Vector3(-805.6118, -1305.2236, 5.0003),
    {
        name: 'Авто базар',
        color: 4,
        shortRange: true,
});
