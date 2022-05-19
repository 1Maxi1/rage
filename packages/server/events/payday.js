let startScript = (new Date().getHours()+1)%24;//Берем текущий час например 21 прибавляем 1, 21 + 1 = 22 это час когда нужно запустить скрипт
setInterval(timer30sec, 30000);//проверка текущего времени 1 раз в 30 секунд, если нужно чтобы скрипт запускался с точностью до секунды (22:00:00) поставить ~500
function timer30sec(){
    let date = new Date();//Берем текущее время
    if(date.getMinutes() == 0 && date.getHours()==startScript){//Если минут равны нулю и текущий час тому в котором нужно запустить скрипт
           startScript = (startScript+1)%24 ;//прибавляем +1 к часу в котором нужно запустить скрипт
            PayDay();// и запускаем скрипт
    }
}

function PayDay() {
    console.log("\x1b[33m[PAYDAY]\x1b[0m"); //Лог к консоль о PayDay
    mp.players.broadcast(`<span style='color:#FFC300'>[PAYDAY]<span style='color:#FFFFF'> +100$`); //Пишет всему серверу что щас Pay Day
}
