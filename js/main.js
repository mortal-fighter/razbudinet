function clockHours() {
    erase(x_hour_er, y_hour_er),
    x_hour = 292 + 100 * Math.sin(angle_hour),
    y_hour = 240 - 100 * Math.cos(angle_hour),
    x_hour_er = 292 + 102 * Math.sin(angle_hour),
    y_hour_er = 240 - 102 * Math.cos(angle_hour),
    angle_hour += Math.PI / 60,
    drawHours(x_hour, y_hour)
}
function intervalClockHours() {
    0 == hour_interval && (clockHours(),
    hour_interval = 360),
    hour_interval--
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
function intervalClockMinutes() {
    0 == min_interval && (clockMinutes(),
    min_interval = 60),
    min_interval--
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
function checkRandom(e) {
    "Random" == e && chooseRandomSound()
}
function chooseRandomSound() {
    var e = [];
    $.each($("#select option"), function() {
        "Random" != $(this).val() && e.push($(this).attr("onClick").match(/\(([^)]+)\)/)[1])
    });
    var t = e[Math.floor(Math.random() * e.length)];
    chooseSound(1 * t),
    console.log(t)
}
function chooseSound(e) {
    sound = 0 == e ? 0 : 1 == e ? 1 : 2 == e ? 2 : 3 == e ? 3 : 4 == e ? 4 : 5 == e ? 5 : 6 == e ? 6 : 7 == e ? 7 : 8 == e ? 8 : 9 == e ? 9 : 10 == e ? 10 : 11 == e ? 11 : 12 == e ? 12 : 13 == e ? 13 : 14 == e ? 14 : 15
}
function startStopUyandım() {
    "Будить" == document.getElementById("start_stop").innerHTML ? (enableSound(),
    disableSound(),
    document.getElementById("start_stop").innerHTML = "Проснулся",
    disablePlusMinusButtons(),
    $("#button_stop").stop().fadeOut(500),
    $("#button_play").stop().fadeOut(500),
    document.getElementById("select").disabled = "disabled",
    document.getElementById("remaining").innerHTML = "<div class='last1'><p class='time_rem'>Осталось спать:</p></div><div class='height'><canvas align='center' width='307' height='70' id='countcanvas'>корректно работает в Firefox и Chrome</canvas></div>",
    drawCountdown = !0,
    drawRemaining(!1)) : ($("#button_stop").stop().fadeIn(500),
    $("#button_play").stop().fadeIn(500),
    document.getElementById("start_stop").innerHTML = "Будить",
    document.getElementById("remaining").innerHTML = "<div class='last1'><h3 class='alarm'></h3></div><div class='height'></height>",
    disableSound(),
    document.getElementById("snooze").disabled = "disabled",
    enablePlusMinusButtons(),
    document.getElementById("select").disabled = "",
    clearInterval(countdownIntervalId),
    eraseCountdownVars(),
    drawCountdown = !1)
}
function disablePlusMinusButtons() {
    document.getElementById("timer1").disabled = "disabled",
    document.getElementById("timer2").disabled = "disabled",
    document.getElementById("timer3").disabled = "disabled",
    document.getElementById("timer4").disabled = "disabled"
}
function enablePlusMinusButtons() {
    document.getElementById("timer1").disabled = "",
    document.getElementById("timer2").disabled = "",
    document.getElementById("timer3").disabled = "",
    document.getElementById("timer4").disabled = ""
}
function enableSound() {
    myAudioEnabled || (0 == sound && ((myAudio = new Audio("sounds/horoz.ogg")).addEventListener("ended", function() {
        this.currentTime = 0,
        this.play()
    }, !1),
    $("#smoothly").is(":checked") && setVolume(myAudio),
    myAudio.play()),
    1 == sound && ((myAudio = new Audio("sounds/alarm_clock_1.ogg")).addEventListener("ended", function() {
        this.currentTime = 0,
        this.play()
    }, !1),
    $("#smoothly").is(":checked") && setVolume(myAudio),
    myAudio.play()),
    2 == sound && ((myAudio = new Audio("sounds/club1.ogg")).addEventListener("ended", function() {
        this.currentTime = 0,
        this.play()
    }, !1),
    $("#smoothly").is(":checked") && setVolume(myAudio),
    myAudio.play()),
    4 == sound && ((myAudio = new Audio("sounds/club2.ogg")).addEventListener("ended", function() {
        this.currentTime = 0,
        this.play()
    }, !1),
    $("#smoothly").is(":checked") && setVolume(myAudio),
    myAudio.play()),
    5 == sound && ((myAudio = new Audio("sounds/club3.ogg")).addEventListener("ended", function() {
        this.currentTime = 0,
        this.play()
    }, !1),
    $("#smoothly").is(":checked") && setVolume(myAudio),
    myAudio.play()),
    6 == sound && ((myAudio = new Audio("sounds/minigun.ogg")).addEventListener("ended", function() {
        this.currentTime = 0,
        this.play()
    }, !1),
    $("#smoothly").is(":checked") && setVolume(myAudio),
    myAudio.play()),
    7 == sound && ((myAudio = new Audio("sounds/nukleer.ogg")).addEventListener("ended", function() {
        this.currentTime = 0,
        this.play()
    }, !1),
    $("#smoothly").is(":checked") && setVolume(myAudio),
    myAudio.play()),
    8 == sound && ((myAudio = new Audio("sounds/club4.ogg")).addEventListener("ended", function() {
        this.currentTime = 0,
        this.play()
    }, !1),
    $("#smoothly").is(":checked") && setVolume(myAudio),
    myAudio.play()),
    9 == sound && ((myAudio = new Audio("sounds/club5.ogg")).addEventListener("ended", function() {
        this.currentTime = 0,
        this.play()
    }, !1),
    $("#smoothly").is(":checked") && setVolume(myAudio),
    myAudio.play()),
    10 == sound && ((myAudio = new Audio("sounds/club6.ogg")).addEventListener("ended", function() {
        this.currentTime = 0,
        this.play()
    }, !1),
    $("#smoothly").is(":checked") && setVolume(myAudio),
    myAudio.play()),
    11 == sound && ((myAudio = new Audio("sounds/club7.ogg")).addEventListener("ended", function() {
        this.currentTime = 0,
        this.play()
    }, !1),
    $("#smoothly").is(":checked") && setVolume(myAudio),
    myAudio.play()),
    12 == sound && ((myAudio = new Audio("sounds/club8.ogg")).addEventListener("ended", function() {
        this.currentTime = 0,
        this.play()
    }, !1),
    $("#smoothly").is(":checked") && setVolume(myAudio),
    myAudio.play()),
    13 == sound && ((myAudio = new Audio("sounds/club9.ogg")).addEventListener("ended", function() {
        this.currentTime = 0,
        this.play()
    }, !1),
    $("#smoothly").is(":checked") && setVolume(myAudio),
    myAudio.play()),
    myAudioEnabled = !0)
}
function setVolume(e) {
    console.log($(e)),
    e.volume = .1;
    var t = setInterval(function() {
        e.volume < 1 ? e.volume = Math.round(100 * (e.volume + .1)) / 100 : clearInterval(t)
    }, 1e4)
}
function disableSound() {
    myAudioEnabled && (myAudio.pause(),
    myAudioEnabled = !1)
}
function playZeroSound() {
    // Fix sound on mobile phones
    // Solution from https://stackoverflow.com/questions/32424775/failed-to-execute-play-on-htmlmediaelement-api-can-only-be-initiated-by-a-u
    var sound = new Audio('./sounds/zerosound.ogg');
    $(sound).on('canPlayThrough', function() {
        this.play();
        this.pause();
    })
}
function eraseCountdownVars() {
    countHours1 = 0,
    countHours2 = 0,
    countMinutes1 = 0,
    countMinutes2 = 0,
    countSeconds1 = 0,
    countSeconds2 = 0
}
function drawRemaining(e) {
    if (drawCountdown) {
        var t = document.getElementById("countcanvas").getContext("2d");
        t.fillStyle = "black",
        t.strokeStyle = "black",
        t.strokeRect(0, 0, 305, 60),
        t.fillRect(0, 0, 305, 60),
        t.fillStyle = "white",
        t.strokeStyle = "white",
        t.strokeRect(5, 5, 295, 50),
        t.fillRect(5, 5, 295, 50);
        var n = "black"
          , o = 0;
        getCountDown(e),
        t.beginPath(),
        t.fillStyle = n,
        t.font = "bold 48px Tahoma, tahoma",
        t.fillText(countHours1, 17, 48, 200),
        t.fillText(countHours2, 52, 48, 200),
        t.fillText(":", 92, 43, 200),
        t.fillText(countMinutes1, 122, 48, 200),
        t.fillText(countMinutes2, 157, 48, 200),
        t.fillText(":", 197, 43, 200),
        t.fillText(countSeconds1, 227, 48, 200),
        t.fillText(countSeconds2, 262, 48, 200),
        t.closePath(),
        countdownIntervalId = setInterval(function() {
            0 != countSeconds1 || 0 != countSeconds2 ? countSeconds2 > 0 ? countSeconds2-- : (countSeconds1--,
            countSeconds2 = 9) : 0 != countMinutes1 || 0 != countMinutes2 ? (countMinutes2 > 0 ? countMinutes2-- : (countMinutes1--,
            countMinutes2 = 9),
            countSeconds1 = 5,
            countSeconds2 = 9) : 0 == countHours1 && 0 == countHours2 || (countHours2 > 0 ? countHours2-- : (countHours1--,
            countHours2 = 9),
            countMinutes2 > 0 ? countMinutes2-- : (countMinutes1--,
            countMinutes2 = 9),
            countMinutes1 = 5,
            countMinutes2 = 9,
            countSeconds1 = 5,
            countSeconds2 = 9),
            0 == countHours1 && 0 == countHours2 && 0 == countMinutes1 && 0 == countMinutes2 && 0 == countSeconds1 && 0 == countSeconds2 && (n = "black" == n ? "red" : "black",
            0 == o && (enableSnooze(),
            enableSound(),
            document.getElementById("start_stop").innerHTML = "Проснулся",
            o = 1)),
            t.fillStyle = "black",
            t.strokeStyle = "black",
            t.strokeRect(0, 0, 305, 60),
            t.fillRect(0, 0, 305, 60),
            t.fillStyle = "white",
            t.strokeStyle = "white",
            t.strokeRect(5, 5, 295, 50),
            t.fillRect(5, 5, 295, 50),
            t.beginPath(),
            t.fillStyle = n,
            t.font = "bold 48px Tahoma, tahoma",
            t.fillText(countHours1, 17, 48, 200),
            t.fillText(countHours2, 52, 48, 200),
            t.fillText(":", 92, 43, 200),
            t.fillText(countMinutes1, 122, 48, 200),
            t.fillText(countMinutes2, 157, 48, 200),
            t.fillText(":", 197, 43, 200),
            t.fillText(countSeconds1, 227, 48, 200),
            t.fillText(countSeconds2, 262, 48, 200),
            t.closePath()
        }, 1e3)
    }
}
function getCountDown(e) {
    var t = -1
      , n = -1
      , o = -1
      , u = !1
      , i = !1
      , c = !1;
    e ? (countSeconds1 = "0",
    countSeconds2 = "0",
    countMinutes1 = "1",
    countMinutes2 = "0",
    countHours1 = "0",
    countHours2 = "0") : (t = "0" == alarmHours1 ? parseInt(alarmHours2) - currenthours : parseInt(alarmHours1 + "" + alarmHours2) - currenthours,
    n = "0" == alarmMinutes1 ? parseInt(alarmMinutes2) - currentminutes : parseInt(alarmMinutes1 + "" + alarmMinutes2) - currentminutes,
    o = 60 - currentseconds,
    n < 0 ? (n = 60 + n,
    u = !0) : 0 == n && (c = !0),
    t < 0 ? t = 24 + t : 0 == t && (i = !0),
    (u || c) && (i ? t = 23 : t--),
    60 == o ? o = 0 : 0 != n ? n-- : 0 != o && (n = 59),
    n += "",
    t += "",
    1 == (o += "").length ? countSeconds2 = o : (countSeconds1 = o.charAt(0),
    countSeconds2 = o.charAt(1)),
    1 == n.length ? countMinutes2 = n : (countMinutes1 = n.charAt(0),
    countMinutes2 = n.charAt(1)),
    1 == t.length ? countHours2 = t : (countHours1 = t.charAt(0),
    countHours2 = t.charAt(1)))
}
function enableSnooze() {
    document.getElementById("snooze").disabled = ""
}
function recreateRemainingTime() {
    eraseAlarm();
    var e = new Date
      , t = e.getMinutes()
      , n = e.getHours();
    alarmHours1 = Math.floor(n / 10),
    alarmHours2 = n % 10,
    alarmMinutes1 = Math.floor(t / 10),
    alarmMinutes2 = t % 10,
    (alarmMinutes1 += 1) >= 6 && (alarmMinutes1 = 0,
    10 == (alarmHours2 += 1) && (alarmHours2 = 0,
    alarmHours1 += 1),
    2 == alarmHours1 && 4 == alarmHours2 && (alarmHours1 = 0,
    alarmHours2 = 0)),
    drawAlarm()
}
function disableSnooze() {
    document.getElementById("snooze").disabled = "disabled",
    disableSound(),
    document.getElementById("start_stop").innerHTML = "Проснулся",
    clearInterval(countdownIntervalId),
    eraseCountdownVars(),
    drawCountdown = !0,
    drawRemaining(!0),
    recreateRemainingTime()
}
function checkRefresh() {
    document.getElementById("snooze").disabled = "disabled",
    disableSound(),
    enablePlusMinusButtons(),
    document.getElementById("select_td").innerHTML = "<select align='bottom' id='select' width='250' class='sound'><option value='Horoz' onclick='chooseSound(0);'>Петух</option><option value='Normal' onclick='chooseSound(1);'>Будильник</option><option value='Siren' onclick='chooseSound(3);'>Сирена 1</option><option value='nukleer' onclick='chooseSound(7);'>Сирена 2</option><option value='silah' onclick='chooseSound(6);'>Стрельба</option><option value='Club1' onclick='chooseSound(2);'>Клуб 1</option><option value='Club2' onclick='chooseSound(4);'>Клуб 2</option><option value='Club3' onclick='chooseSound(5);'>Клуб 3</option></select>"
}
$(function() {
    $("#saat").tzineClock(),
    function() {
        var e, t;
        jQuery("#timer1").on("vmousedown", function(n) {
            e = setInterval(function() {
                clearInterval(e),
                t = setInterval(function() {
                    decreaseAlarmHours()
                }, 100)
            }, 300)
        }),
        jQuery("#timer2").on("vmousedown", function(n) {
            e = setInterval(function() {
                clearInterval(e),
                t = setInterval(function() {
                    increaseAlarmHours()
                }, 100)
            }, 300)
        }),
        jQuery("#timer3").on("vmousedown", function(n) {
            e = setInterval(function() {
                clearInterval(e),
                t = setInterval(function() {
                    decreaseAlarmMinutes()
                }, 100)
            }, 300)
        }),
        jQuery("#timer4").on("vmousedown", function(n) {
            e = setInterval(function() {
                clearInterval(e),
                t = setInterval(function() {
                    increaseAlarmMinutes()
                }, 100)
            }, 300)
        }),
        jQuery(".first2 button").on("vmouseup", function(n) {
            clearInterval(e),
            clearInterval(t)
        })
    }()
});
var mycanvas = document.getElementById("clockcanvas")
  , ctx = mycanvas.getContext("2d");
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
var current_Time = new Date
  , currenthours = current_Time.getHours()
  , currentminutes = current_Time.getMinutes()
  , currentseconds = current_Time.getSeconds();
setInterval(function() {
    current_Time = new Date,
    currenthours = current_Time.getHours(),
    currentminutes = current_Time.getMinutes(),
    currentseconds = current_Time.getSeconds()
}, 1e3);
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
  , hour_interval = 359;
angle_hour = (currenthours % 12 * 10 + Math.floor(currentminutes / 6)) * (Math.PI / 60),
angle_min = currentminutes * Math.PI / 30,
angle_sec = currentseconds * Math.PI / 30,
min_interval = 59 - currentseconds,
hour_interval = 359 - currentminutes % 6 * 60 - currentseconds,
clockHours(),
setInterval(intervalClockHours, 1e3),
clockMinutes(),
setInterval(intervalClockMinutes, 1e3),
clockSeconds(),
setInterval(clockSeconds, 1e3);
var timercanvas = document.getElementById("timercanvas")
  , timerctx = timercanvas.getContext("2d");
timerctx.fillStyle = "black",
timerctx.strokeStyle = "black",
timerctx.strokeRect(0, 0, 293, 80),
timerctx.fillRect(1, 1, 291, 78),
timerctx.fillStyle = "white",
timerctx.strokeStyle = "white",
timerctx.strokeRect(5, 5, 283, 70),
timerctx.fillRect(5, 5, 283, 70);
var alarmHours1 = 0
  , alarmHours2 = 0
  , alarmMinutes1 = 0
  , alarmMinutes2 = 0;
drawAlarm();
var sound = 0
  , drawCountdown = !1
  , myAudio = new Audio("")
  , myAudioEnabled = !1
  , countHours1 = 0
  , countHours2 = 0
  , countMinutes1 = 0
  , countMinutes2 = 0
  , countSeconds1 = 0
  , countSeconds2 = 0
  , countdownIntervalId = 0;
$(function() {
    
    playZeroSound(); // Fix playing sound on mobiles
    
    $("#timer1").on("vclick", decreaseAlarmHours);
    $("#timer2").on("vclick", increaseAlarmHours);
    $("#timer3").on("vclick", decreaseAlarmMinutes);
    $("#timer4").on("vclick", increaseAlarmMinutes);

    $(".sound").change(function(event) {
        $("option:selected", $(this)).each(function() {
            eval($(this).attr("onclick"))
        })
    }),
    $("#button_play").click(function(e) {
        e.preventDefault(),
        disableSound(),
        enableSound()
    }),
    $("#button_stop").click(function(e) {
        e.preventDefault(),
        disableSound()
    })
});
