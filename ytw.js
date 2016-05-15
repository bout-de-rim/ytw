//import $ from 'jquery';
//import ui from 'ui';
//import ytc from 'ytcontrols';

function Player() {
    "use strict";
    this.yt = null;
    this.state = 0;
    this.play = function () {
        if (this.yt) {
            this.yt.playVideo();
            setInterval(this.checkloop.bind(this), 1000 / 25);
        }
    };
    this.pause = function () {
        this.yt.pauseVideo();
    };
    this.playpause = function () {
        if (this.state == 0) {
            this.state = 1;
            this.play();
            return "pause";
        }
        if (this.state == 1) {
            this.state = 0;
            this.pause();
            return "play";
        }
    };
    this.seek = function (time) {
        this.yt.seekTo(time);
    };
    this.speed = 1;
    this.pointa = 0;
    this.setA = function (time) {
        if (typeof time == 'undefined')
            time = this.yt.getCurrentTime();
        if (time > this.pointb)
            this.pointb = time;
        this.pointa = time;
        console.log(this.pointa);
    };
    this.pointb = null;
    this.setB = function (time) {
        if (typeof time == 'undefined')
            time = this.yt.getCurrentTime();
        if (time < this.pointa)
            this.pointa = time;
        this.pointb = time;
        console.log(this.pointb);
    };
    this.setSpeed = function (speed) {
        var natives = this.yt.getAvailablePlaybackRates(),
            natdif = Array.prototype.map.call(natives, x => Math.pow(x - speed, 2)),
            betterspeed = natives[natdif.indexOf(Math.min.apply(Math, natdif))];
        this.speed = betterspeed;
        //        console.log(natives);
        //        console.log(speed);
        //        console.log(natdif);
        //        console.log(this.speed);
        this.yt.setPlaybackRate(this.speed);
        return this.speed;
    };
    this.loop = true;
    this.checkloop = function () {
        var now = this.yt.getCurrentTime();
        if (this.loop && (now >= this.pointb || now < this.pointa))
            this.seek(this.pointa);
    };
    this.setYTAPI = function (yt) {
        this.yt = yt;
        this.pointa = 0;
        //        console.log(this.yt);
        this.pointb = this.yt.getDuration();

    };
};

// We create the pointer, but we cant create the object itself as for its initialization, it needs the YT API to be loaded.
// See in onYouTubeIframeAPIReady().
var player = new Player();

function Annotation(start, duration, content) {
    "use strict";
    this.start = start;
    this.duration = duration;
    this.content = content;
}

test_annot = new Annotation(0.0, 5.0, "test");
