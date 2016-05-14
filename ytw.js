//import $ from 'jquery';
//import ui from 'ui';
//import ytc from 'ytcontrols';

function Player(yt) {
    "use strict";
    this.yt=yt;
    this.play = function () {
        this.yt.playVideo();
    };
};

var player = new Player(ytplayer);

function Annotation(start, duration, content) {
    "use strict";
    this.start = start;
    this.duration = duration;
    this.content = content;
}

test_annot = new Annotation(0.0, 5.0, "test");
