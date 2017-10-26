/*******/
/* VAR */
/*******/

var x_sec = 0
  , x_min = 0
  , y_min = 0
  , x_hour = 0
  , y_hour = 0
  , y_sec = 0
  , x_sec_er = 292
  , y_sec_er = 90
  , x_min_er = 292
  , y_min_er = 90
  , x_hour_er = 292
  , y_hour_er = 90
  , sec = 0
  , min = 0
  , hour = 0
  , angle_sec = 0
  , angle_min = 0
  , angle_hour = 0
  , min_interval = 59
  , hour_interval = 359

  , mycanvas = null
  , ctx = null
  , timercanvas = null
  , timerctx = null
  , countcanvs = null
  , countctx = null
  , countFillStyle = "black"

  , current_Time = null
  , currenthours = null
  , currentminutes = null
  , currentseconds = null

  /* moment in time when alarm was started */
  , currentTime0 = null
  , currenthours0 = null
  , currentminutes0 = null
  , currentseconds0 = null

  , alarmHours1 = 0
  , alarmHours2 = 0
  , alarmMinutes1 = 0
  , alarmMinutes2 = 0
  
  , countHours1 = 0
  , countHours2 = 0
  , countMinutes1 = 0
  , countMinutes2 = 0
  , countSeconds1 = 0
  , countSeconds2 = 0
  
  , generalIntervalId = 0
  , countdownIntervalId = 0
  , parserUserAgent = null

  , isAudioInitialized = false
  , myAudioEnabled = false
  , snoozeFlag = false
  , isClockRun = false
  , isCountdownRun = false
  , countdownState = 'DEACTIVATED' /* DEACTIVATED, RUNNING, FINISH */
  , triggerAlarmThisDayFlag = false

  , sound = 0
  , audio = null
  , melodies = {
        mp3: [
            './sounds/horoz.mp3',
            './sounds/alarm_clock_1.mp3',
            './sounds/club1.mp3',
            './sounds/zerosound.mp3',
            './sounds/club2.mp3',
            './sounds/club3.mp3',
            './sounds/minigun.mp3',
            './sounds/nukleer.mp3',
            './sounds/club4.mp3',
            './sounds/club5.mp3',
            './sounds/club6.mp3',
            './sounds/club7.mp3',
            './sounds/club8.mp3',
            './sounds/club9.mp3'
        ],
        ogg: [
            './sounds/horoz.ogg',
            './sounds/alarm_clock_1.ogg',
            './sounds/club1.ogg',
            './sounds/zerosound.ogg',
            './sounds/club2.ogg',
            './sounds/club3.ogg',
            './sounds/minigun.ogg',
            './sounds/nukleer.ogg',
            './sounds/club4.ogg',
            './sounds/club5.ogg',
            './sounds/club6.ogg',
            './sounds/club7.ogg',
            './sounds/club8.ogg',
            './sounds/club9.ogg'
        ],
        aac: [
            './sounds/horoz.aac',
            './sounds/alarm_clock_1.aac',
            './sounds/club1.aac',
            './sounds/zerosound.aac',
            './sounds/club2.aac',
            './sounds/club3.aac',
            './sounds/minigun.aac',
            './sounds/nukleer.aac',
            './sounds/club4.aac',
            './sounds/club5.aac',
            './sounds/club6.aac',
            './sounds/club7.aac',
            './sounds/club8.aac',
            './sounds/club9.aac'
        ]
    };

/*********/
/* CLOCK */
/*********/
function initTime() {
    current_Time = new Date;
    currenthours = current_Time.getHours();
    currentminutes = current_Time.getMinutes();
    currentseconds = current_Time.getSeconds();

    generalIntervalId = setInterval(function() {
        current_Time = new Date;
        currenthours = current_Time.getHours();
        currentminutes = current_Time.getMinutes();
        currentseconds = current_Time.getSeconds();

        if (isClockRun) {
            stepClock();
        }

        if (countdownState === 'RUNNING') {
            
            // current time-zero > current time means that the time have just passed midnight, so we should set thiggerAlarmThisDayFlag to true
            if (timeBiggerThan(currenthours0, currentminutes0, currentseconds0,
                               currenthours, currentminutes, currentseconds) && !triggerAlarmThisDayFlag) 
            {
                triggerAlarmThisDayFlag = true;
            }

            calculateCountdownVariables();
        }
        if (countdownState === 'RUNNING' || countdownState === 'FINISH') {
            stepCountdown();
        }
        
    }, 1000);   
}
function initClock() {
    mycanvas = document.getElementById("clockcanvas")
    ctx = mycanvas.getContext("2d");

    ctx.beginPath(),
    ctx.fillStyle = "black",
    ctx.arc(292, 240, 200, 0, 2 * Math.PI, !0),
    ctx.fill(),
    ctx.closePath(),
    ctx.beginPath(),
    ctx.fillStyle = "white",
    ctx.arc(292, 240, 195, 0, 2 * Math.PI, !0),
    ctx.fill(),
    ctx.closePath(),
    ctx.beginPath(),
    ctx.fillStyle = "black",
    ctx.arc(292, 240, 6, 0, 2 * Math.PI, !0),
    ctx.fill(),
    ctx.closePath(),
    ctx.beginPath(),
    ctx.fillStyle = "black",
    ctx.font = "bold 32px Arial, arial",
    ctx.fillText("1", 370, 98, 200),
    ctx.fillText("2", 436, 163, 200),
    ctx.fillText("3", 463, 250, 200),
    ctx.fillText("4", 438, 340, 200),
    ctx.fillText("5", 373, 405, 200),
    ctx.fillText("6", 284, 428, 200),
    ctx.fillText("7", 196, 405, 200),
    ctx.fillText("8", 128, 335, 200),
    ctx.fillText("9", 105, 250, 200),
    ctx.fillText("10", 120, 166, 200),
    ctx.fillText("11", 185, 105, 200),
    ctx.fillText("12", 273, 77, 200);

    $("#saat").tzineClock();

    angle_hour = (currenthours % 12 * 10 + Math.floor(currentminutes / 6)) * (Math.PI / 60);
    angle_min = currentminutes * Math.PI / 30;
    angle_sec = currentseconds * Math.PI / 30;
    min_interval = 59 - currentseconds;
    hour_interval = 359 - currentminutes % 6 * 60 - currentseconds;
    
    clockHours();
    clockMinutes();
    clockSeconds();

    isClockRun = true;
}
function stepClock() {
    if (hour_interval == 0) {
        clockHours();
        hour_interval = 360;
    }
    hour_interval--;

    if (min_interval == 0) {
        clockMinutes();
        min_interval = 60;
    }
    min_interval--;

    clockSeconds();
}
function clockHours() {
    erase(x_hour_er, y_hour_er),
    x_hour = 292 + 100 * Math.sin(angle_hour),
    y_hour = 240 - 100 * Math.cos(angle_hour),
    x_hour_er = 292 + 102 * Math.sin(angle_hour),
    y_hour_er = 240 - 102 * Math.cos(angle_hour),
    angle_hour += Math.PI / 60,
    drawHours(x_hour, y_hour)
}
function clockMinutes() {
    erase(x_min_er, y_min_er),
    x_min = 292 + 150 * Math.sin(angle_min),
    y_min = 240 - 150 * Math.cos(angle_min),
    x_min_er = 292 + 152 * Math.sin(angle_min),
    y_min_er = 240 - 152 * Math.cos(angle_min),
    angle_min += Math.PI / 30,
    drawHours(x_hour, y_hour),
    drawMinutes(x_min, y_min)
}
function clockSeconds() {
    erase(x_sec_er, y_sec_er),
    x_sec = 292 + 150 * Math.sin(angle_sec),
    y_sec = 240 - 150 * Math.cos(angle_sec),
    x_sec_er = 292 + 152 * Math.sin(angle_sec),
    y_sec_er = 240 - 152 * Math.cos(angle_sec),
    angle_sec += Math.PI / 30,
    drawHours(x_hour, y_hour),
    drawMinutes(x_min, y_min),
    drawSeconds(x_sec, y_sec),
    ctx.beginPath(),
    ctx.fillStyle = "black",
    ctx.arc(292, 240, 6, 0, 2 * Math.PI, !0),
    ctx.fill(),
    ctx.closePath()
}
function erase(e, t) {
    x_sec == x_min && y_sec == y_min || (ctx.beginPath(),
    ctx.lineWidth = 8,
    ctx.moveTo(292, 240),
    ctx.lineTo(e, t),
    ctx.strokeStyle = "white",
    ctx.stroke(),
    ctx.closePath())
}
function drawHours(e, t) {
    ctx.beginPath(),
    ctx.lineWidth = 6,
    ctx.moveTo(292, 240),
    ctx.lineTo(e, t),
    ctx.strokeStyle = "black",
    ctx.stroke(),
    ctx.closePath()
}
function drawMinutes(e, t) {
    ctx.beginPath(),
    ctx.lineWidth = 4,
    ctx.moveTo(292, 240),
    ctx.lineTo(e, t),
    ctx.strokeStyle = "black",
    ctx.stroke(),
    ctx.closePath()
}
function drawSeconds(e, t) {
    ctx.beginPath(),
    ctx.lineWidth = 2,
    ctx.moveTo(292, 240),
    ctx.lineTo(e, t),
    ctx.strokeStyle = "red",
    ctx.stroke(),
    ctx.closePath()
}

/*********/
/* ALARM */
/*********/
function initAlarm() {
    timercanvas = document.getElementById("timercanvas");
    timerctx = timercanvas.getContext("2d");

    timerctx.fillStyle = "black",
    timerctx.strokeStyle = "black",
    timerctx.strokeRect(0, 0, 293, 80),
    timerctx.fillRect(1, 1, 291, 78),
    timerctx.fillStyle = "white",
    timerctx.strokeStyle = "white",
    timerctx.strokeRect(5, 5, 283, 70),
    timerctx.fillRect(5, 5, 283, 70);
    drawAlarm();
}
function drawAlarm() {
    timerctx.beginPath(),
    timerctx.fillStyle = "black",
    timerctx.font = "bold 60px Tahoma, tahoma",
    timerctx.fillText(alarmHours1, 10, 62, 150),
    timerctx.fillText(alarmHours2, 70, 62, 150),
    timerctx.fillText(":", 135, 67, 150),
    timerctx.fillText(alarmMinutes1, 180, 62, 150),
    timerctx.fillText(alarmMinutes2, 240, 62, 150),
    timerctx.closePath()
}
function eraseAlarm() {
    timerctx.fillStyle = "white",
    timerctx.strokeStyle = "white",
    timerctx.strokeRect(5, 5, 283, 70),
    timerctx.fillRect(5, 5, 283, 70)
}
function increaseAlarmHours() {
    eraseAlarm(),
    alarmHours1 < 2 ? alarmHours2 < 9 ? alarmHours2++ : (alarmHours1++,
    alarmHours2 = 0) : alarmHours2 < 3 ? alarmHours2++ : (alarmHours1 = 0,
    alarmHours2 = 0),
    drawAlarm()
}
function increaseAlarmMinutes() {
    eraseAlarm(),
    alarmMinutes1 < 5 ? alarmMinutes2 < 9 ? alarmMinutes2++ : (alarmMinutes1++,
    alarmMinutes2 = 0) : alarmMinutes2 < 9 ? alarmMinutes2++ : (alarmMinutes1 = 0,
    alarmMinutes2 = 0),
    drawAlarm()
}
function decreaseAlarmHours() {
    eraseAlarm(),
    0 == alarmHours1 && 0 == alarmHours2 ? (alarmHours1 = 2,
    alarmHours2 = 3) : alarmHours2 > 0 ? alarmHours2-- : (alarmHours1--,
    alarmHours2 = 9),
    drawAlarm()
}
function decreaseAlarmMinutes() {
    eraseAlarm(),
    0 == alarmMinutes1 && 0 == alarmMinutes2 ? (alarmMinutes1 = 5,
    alarmMinutes2 = 9) : alarmMinutes2 > 0 ? alarmMinutes2-- : (alarmMinutes1--,
    alarmMinutes2 = 9),
    drawAlarm()
}
function recreateRemainingTime() {
    eraseAlarm();
    var date = new Date
      , min = date.getMinutes()
      , hours = date.getHours();
    alarmHours1 = Math.floor(hours / 10),
    alarmHours2 = hours % 10,
    alarmMinutes1 = Math.floor(min / 10),
    alarmMinutes2 = min % 10,
    
    (alarmMinutes1 += 1) >= 6 && (alarmMinutes1 = 0,
    10 == (alarmHours2 += 1) && (alarmHours2 = 0,
    alarmHours1 += 1),
    2 == alarmHours1 && 4 == alarmHours2 && (alarmHours1 = 0,
    alarmHours2 = 0)),
    drawAlarm()
}

/*************/
/* COUNTDOWN */
/************/
function drawCountdownIndicator(isSnooze) {
    countcanvas = document.getElementById("countcanvas");
    countctx = countcanvas.getContext("2d");
    countctx.fillStyle = "black",
    countctx.strokeStyle = "black",
    countctx.strokeRect(0, 0, 305, 60),
    countctx.fillRect(0, 0, 305, 60),
    countctx.fillStyle = "white",
    countctx.strokeStyle = "white",
    countctx.strokeRect(5, 5, 295, 50),
    countctx.fillRect(5, 5, 295, 50);
    
    if (isSnooze) {
        setCountdownVariablesIfSnooze();
    } else {
        calculateCountdownVariables();
    }

    currentTime0 = new Date();
    currenthours0 = currentTime0.getHours();
    currentminutes0 = currentTime0.getMinutes();
    currentseconds0 = currentTime0.getSeconds();

    var alarmHours = alarmHours1 + ''; alarmHours = parseInt(alarmHours + alarmHours2);
    var alarmMinutes = alarmMinutes1 + ''; alarmMinutes = parseInt(alarmMinutes + alarmMinutes2);
    if (timeBiggerThan(alarmHours, alarmMinutes, 0, currenthours, currentminutes, currentseconds)) {
        triggerAlarmThisDayFlag = true;
    }
    
    countctx.beginPath(),
    countctx.fillStyle = countFillStyle,
    countctx.font = "bold 48px Tahoma, tahoma",
    countctx.fillText(countHours1, 17, 48, 200),
    countctx.fillText(countHours2, 52, 48, 200),
    countctx.fillText(":", 92, 43, 200),
    countctx.fillText(countMinutes1, 122, 48, 200),
    countctx.fillText(countMinutes2, 157, 48, 200),
    countctx.fillText(":", 197, 43, 200),
    countctx.fillText(countSeconds1, 227, 48, 200),
    countctx.fillText(countSeconds2, 262, 48, 200),
    countctx.closePath(),

    countFillStyle = 'black';

    isCountdownRun = true;
    countdownState = 'RUNNING';
}
function eraseCountdownVars() {
    countHours1 = 0;
    countHours2 = 0;
    countMinutes1 = 0;
    countMinutes2 = 0;
    countSeconds1 = 0;
    countSeconds2 = 0;

    currenthours0 = 0;
    currentminutes0 = 0;
    currentseconds0 = 0;
    triggerAlarmThisDayFlag = false;
}
function setCountdownVariablesIfSnooze() {
    countSeconds1 = 0;
    countSeconds2 = 0;
    countMinutes1 = 1;
    countMinutes2 = 0;
    countHours1 = 0;
    countHours2 = 0;
}
function calculateCountdownVariables() {
    var dh = -1
      , dm = -1
      , ds = -1
      , decreaseHour = false
      , decreaseMinute = false;

    dh = (alarmHours1 == "0") ? parseInt(alarmHours2) - currenthours : parseInt(alarmHours1 + "" + alarmHours2) - currenthours;
    dm = (alarmMinutes1 == "0") ? parseInt(alarmMinutes2) - currentminutes : parseInt(alarmMinutes1 + "" + alarmMinutes2) - currentminutes;
    ds = 60 - currentseconds;
    
    if (dh < 0) {
        dh += 24;
    }

    if (dm < 0) {
        dm += 60;
        decreaseHour = true;   
    }

    if (ds === 60) {
        ds = 0;
    } else if (ds > 0) {
        decreaseMinute = true;
    } 

    if (decreaseMinute) {
        if (dm === 0) {
            dm = 59;
            decreaseHour = true;
        } else {
            dm--;
        }
    }

    if (decreaseHour) {
        if (dh === 0) {
            dh = 23;
        } else {
            dh--;
        }
    }

    countSeconds1 = Math.floor(ds / 10);
    countSeconds2 = ds % 10;
    countMinutes1 = Math.floor(dm / 10);
    countMinutes2 = dm % 10;
    countHours1 = Math.floor(dh / 10);
    countHours2 = dh % 10;
}
function stepCountdown() {
    if (countdownState === 'FINISH') {
        countFillStyle = (countFillStyle === "black") ? "red" : "black";
    }

    var alarmHours = alarmHours1 + ''; alarmHours = parseInt(alarmHours + alarmHours2);
    var alarmMinutes = alarmMinutes1 + ''; alarmMinutes = parseInt(alarmMinutes + alarmMinutes2);

    console.log('countdownState=', countdownState, ', triggerAlarmThisDayFlag=', triggerAlarmThisDayFlag,
        ', timebigger=', timeBiggerThan(currenthours, currentminutes, currentseconds, alarmHours, alarmMinutes, 0));
    if (countdownState !== 'FINISH' && triggerAlarmThisDayFlag 
        && timeBiggerThan(currenthours, currentminutes, currentseconds, alarmHours, alarmMinutes, 0)) 
    {
        console.log('trigger alarm');
        countdownState = 'FINISH';
        eraseCountdownVars();
        enableSnooze();
        enableSound();
        document.getElementById("start_stop").innerHTML = "Проснулся";
        countFillStyle = "red";
    }

    countctx.fillStyle = "black",
    countctx.strokeStyle = "black",
    countctx.strokeRect(0, 0, 305, 60),
    countctx.fillRect(0, 0, 305, 60),
    countctx.fillStyle = "white",
    countctx.strokeStyle = "white",
    countctx.strokeRect(5, 5, 295, 50),
    countctx.fillRect(5, 5, 295, 50),
    countctx.beginPath(),
    countctx.fillStyle = countFillStyle,
    countctx.font = "bold 48px Tahoma, tahoma",
    countctx.fillText(countHours1, 17, 48, 200),
    countctx.fillText(countHours2, 52, 48, 200),
    countctx.fillText(":", 92, 43, 200),
    countctx.fillText(countMinutes1, 122, 48, 200),
    countctx.fillText(countMinutes2, 157, 48, 200),
    countctx.fillText(":", 197, 43, 200),
    countctx.fillText(countSeconds1, 227, 48, 200),
    countctx.fillText(countSeconds2, 262, 48, 200),
    countctx.closePath()
}


/*********/
/* SOUND */
/*********/
function chooseRandomSound() {
    var e = [];
    $.each($("#select option"), function() {
        "Random" != $(this).val() && e.push($(this).attr("onClick").match(/\(([^)]+)\)/)[1])
    });
    var t = e[Math.floor(Math.random() * e.length)];
    chooseSound(1 * t)
}
function chooseSound(e) {
    sound = 0 == e ? 0 : 1 == e ? 1 : 2 == e ? 2 : 3 == e ? 3 : 4 == e ? 4 : 5 == e ? 5 : 6 == e ? 6 : 7 == e ? 7 : 8 == e ? 8 : 9 == e ? 9 : 10 == e ? 10 : 11 == e ? 11 : 12 == e ? 12 : 13 == e ? 13 : 14 == e ? 14 : 15
}
function chooseAudiofileCrossbrowserly(number) {
    var browser = parserUserAgent.getBrowser().name;
    var os = parserUserAgent.getOS().name;
    var audioformat = 'ogg';
    
    if (
        browser === 'Edge' ||
        browser === 'IE' ||
        (browser === 'Firefox' && os === 'Android') ||
        browser === 'Android Browser'
        ) 
    {
        audioformat = 'mp3';
    }

    if (browser === 'Safari' || browser === 'Mobile Safari') {
        audioformat = 'aac';
    }

    return melodies[audioformat][number];
}
function preloadMelody() {

}
function countdownOnOff() {
    if (countdownState === 'DEACTIVATED') {
        countdownState = 'RUNNING';
        document.getElementById("start_stop").innerHTML = "Проснулся";
        disablePlusMinusButtons();
        $("#button_stop").stop().fadeOut(500);
        $("#button_play").stop().fadeOut(500);
        document.getElementById("select").disabled = "disabled";
        document.getElementById("remaining").innerHTML = "<div class='last1'><p class='time_rem'>Осталось спать:</p></div><div class='height'><canvas align='center' width='307' height='70' id='countcanvas'>корректно работает в Firefox и Chrome</canvas></div>";
        drawCountdownIndicator(false);
        preloadMelody();
    } else if (countdownState === 'RUNNING' || countdownState === 'FINISH') {
        countdownState = 'DEACTIVATED';
        $("#button_stop").stop().fadeIn(500);
        $("#button_play").stop().fadeIn(500);
        document.getElementById("start_stop").innerHTML = "Будить";
        document.getElementById("remaining").innerHTML = "<div class='last1'><h3 class='alarm'></h3></div><div class='height'></height>";
        disableSound();
        document.getElementById("snooze").disabled = "disabled";
        enablePlusMinusButtons();
        document.getElementById("select").disabled = "";
        isCountdownRun = false;
        eraseCountdownVars();
        countFillStyle = "black";
    } else {
        console.log('WARN: wrong countdown state \'' + countdownState + '\'!');
        return;
    }
}
function disablePlusMinusButtons() {
    $("#timer1").prop('disabled', true);
    $("#timer2").prop('disabled', true);
    $("#timer3").prop('disabled', true);
    $("#timer4").prop('disabled', true);
}
function enablePlusMinusButtons() {
    $("#timer1").prop('disabled', false);
    $("#timer2").prop('disabled', false);
    $("#timer3").prop('disabled', false);
    $("#timer4").prop('disabled', false);
}
function initAudio(callback) {
    // Must ddiffSec audio element initialization according to fix limitations on mobiles
    // Solution from https://ru.stackoverflow.com/questions/635035/%D0%9E%D1%88%D0%B8%D0%B1%D0%BA%D0%B0-play-can-only-be-initiated-by-a-user-gesture-%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9-chrome
    //           and https://stackoverflow.com/questions/32424775/failed-to-execute-play-on-htmlmediaelement-api-can-only-be-initiated-by-a-u
    audio = new Audio(chooseAudiofileCrossbrowserly(3));
    
    myAudioEnabled = true;
    
    var play = audio.play();

    if (play && play.then) {
        play.then(function() {
            disableSound();
            isAudioInitialized = true;
            callback();
        }).catch(function(err){
            callback(err);
        });
    } else {
        $(audio).on('ended', function() {
            disableSound();
            isAudioInitialized = true;
            callback();
        })
    }
}
function enableSound() {
    if (myAudioEnabled) {
        console.log('WARN (audio): sound is already enabled');
        return;
    }

    if ($('#select option:selected').val() === 'Random') {
        chooseRandomSound();
    }

    $(audio).attr('src', chooseAudiofileCrossbrowserly(sound));
    
    $(audio).on('ended', function() {
        this.currentTime = 0;
        this.play();
    });

    if ($("#smoothly").is(":checked")) {
        setVolume(audio);
    }

    myAudioEnabled = true;
    audio.play();
}
function setVolume(e) {
    e.volume = .1;
    var t = setInterval(function() {
        e.volume < 1 ? e.volume = Math.round(100 * (e.volume + .1)) / 100 : clearInterval(t)
    }, 1e4)
}
function disableSound() {
    if (myAudioEnabled) {
        audio.pause();
        myAudioEnabled = false;
    }
}
function enableSnooze() {
    document.getElementById("snooze").disabled = ""
}
function disableSnooze() {
    if (countdownState !== 'FINISH') {
        console.log('WARN: Wrong countdown state \'' + countdownState + '\'');
        return;
    }
    countdownState = 'RUNNING';
    disableSound();
    document.getElementById("start_stop").innerHTML = "Проснулся";
    document.getElementById("snooze").disabled = "disabled";
    isCountdownRun = false;
    eraseCountdownVars();
    countFillStyle = "black";
    recreateRemainingTime();
    drawCountdownIndicator(true);
}
function checkRefresh() {
    document.getElementById("snooze").disabled = "disabled",
    disableSound(),
    enablePlusMinusButtons(),
    document.getElementById("select_td").innerHTML = "<select align='bottom' id='select' width='250' class='sound'><option value='Horoz' onclick='chooseSound(0);'>Петух</option><option value='Normal' onclick='chooseSound(1);'>Будильник</option><option value='Siren' onclick='chooseSound(3);'>Сирена 1</option><option value='nukleer' onclick='chooseSound(7);'>Сирена 2</option><option value='silah' onclick='chooseSound(6);'>Стрельба</option><option value='Club1' onclick='chooseSound(2);'>Клуб 1</option><option value='Club2' onclick='chooseSound(4);'>Клуб 2</option><option value='Club3' onclick='chooseSound(5);'>Клуб 3</option></select>"
}

/* CONTROLS */
function initControls() {
    var e, t;
    
    // CLOCK BUTTONS
    jQuery("#timer1").on("vmousedown", function(n) {
        e = setInterval(function() {
            clearInterval(e),
            t = setInterval(function() {
                decreaseAlarmHours()
            }, 100)
        }, 300)
    });
    jQuery("#timer2").on("vmousedown", function(n) {
        e = setInterval(function() {
            clearInterval(e),
            t = setInterval(function() {
                increaseAlarmHours()
            }, 100)
        }, 300)
    });
    jQuery("#timer3").on("vmousedown", function(n) {
        e = setInterval(function() {
            clearInterval(e),
            t = setInterval(function() {
                decreaseAlarmMinutes()
            }, 100)
        }, 300)
    });
    jQuery("#timer4").on("vmousedown", function(n) {
        e = setInterval(function() {
            clearInterval(e),
            t = setInterval(function() {
                increaseAlarmMinutes()
            }, 100)
        }, 300)
    });
    jQuery(".first2 button").on("vmouseup", function(n) {
        clearInterval(e),
        clearInterval(t)
    });
    $("#timer1").on("vclick", decreaseAlarmHours);
    $("#timer2").on("vclick", increaseAlarmHours);
    $("#timer3").on("vclick", decreaseAlarmMinutes);
    $("#timer4").on("vclick", increaseAlarmMinutes);

    // SOUND BUTTONS
    $("#button_play").click(function(e) {
        e.preventDefault();
        if (!isAudioInitialized) {
            initAudio(function(err) {
                if (err) {
                    console.error(err);
                    return;
                } 
                enableSound();
            });
        } else {
            disableSound();
            enableSound();
        }
    });
    $("#button_stop").click(function(e) {
        e.preventDefault();
        disableSound();
    });

    $(".sound").change(function(event) {
        $("option:selected", $(this)).each(function() {
            eval($(this).attr("onclick"))
        })
    });

    $("#start_stop").click(function() {
        if (!isAudioInitialized) {
            initAudio(function(err) { 
                if (err) {
                    console.error(err);
                    return;
                }
                countdownOnOff(); 
            });
        } else {
            countdownOnOff();
        }
    });
}

/* HELPERS */
function timeBiggerThan(hours1, minutes1, seconds1, hours2, minutes2, seconds2) {
    if (hours1 > hours2) {
        return true;
    } else if (hours1 < hours2) {
        return false;
    } else {
        if (minutes1 > minutes2) {
            return true;
        } else if (minutes1 < minutes2) {
            return false;
        } else {
            if (seconds1 > seconds2) {
                return true;
            } else {
                return false;
            }
        }
    }
}

/* BEGIN */
$(function() {
    parserUserAgent = new UAParser();

    initTime();
    initClock();
    initAlarm();
    initControls();
});
