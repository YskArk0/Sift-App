
function timeline() {
    var now = new Date();
    var month = now.getMonth();
    var day = now.getDate();
    var hour = now.getHours();
    var minutes = now.getMinutes() ;
    var seconds = now.getSeconds() ;
    document.getElementById('time').innerText = ('00' + hour).slice(-2) + ":" + ('00' + minutes).slice(-2);
    console.log(month,day,hour,minutes, seconds);
    element = document.getElementById('animeab');
    time = document.getElementById("time");
    line = document.getElementById("line");
    //console.log(element);
    var n;

    
    if (month == 8 && day == 4) {
        if (hour == 10) {
            n = 60;
            time.className = "active";
            line.className = "active";
        }
        else if (hour == 11) {
            n = 180;
            time.className = "active";
            line.className = "active";
        }
        else if (hour == 12) {
            n = 300;
            time.className = "active";
            line.className = "active";
        }
        else if (hour == 13) {
            n = 420;
            time.className = "active";
            line.className = "active";
        }
        else if (hour == 14) {
            n = 540;
            time.className = "active";
            line.className = "active";
        }
        else if (hour == 15) {
            n = 660;
            time.className = "active";
            line.className = "active";
        }
        else if (hour == 16) {
            n = 780;
            time.className = "active";
            line.className = "active";
        }
        else if (hour == 17) {
            n = 900;
            time.className = "active";
            line.className = "active";
            minutes=0;
            seconds=0;
        }
    }
    else if(month==10&&day==6){
        if (hour == 10) {
            n = 980;
            time.className = "active";
            line.className = "active";
        }
        else if (hour == 11) {
            n = 1100;
            time.className = "active";
            line.className = "active";
        }
        else if (hour == 12) {
            n = 1220;
            time.className = "active";
            line.className = "active";
        }
        else if (hour == 13) {
            n = 1340;
            time.className = "active";
            line.className = "active";
        }
        else if (hour == 14) {
            n = 1460;
            time.className = "active";
            line.className = "active";
        }
        else if (hour == 15) {
            n = 1580;
            time.className = "active";
            line.className = "active";
        }
        else if (hour == 16) {
            n = 1700;
            time.className = "active";
            line.className = "active";
            minutes=0;
            seconds=0;
        }
        
    }
    else {
        time.className = "";
        line.className = "";
    }
    var addPx = minutes * 120 / 60 + seconds * 120 / 3600;
    element.style.top = n + addPx + "px";
    console.log(n, addPx);
}
function setscroll() {
    var line = document.getElementById('animeab');
    var content_position = line.getBoundingClientRect().top;
    window.scrollTo(0, content_position);
    console.log(line, content_position);
}
timeline();
//window.onload = setscroll;
setInterval(timeline, 1000);