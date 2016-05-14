// http://tutorialzine.com/2015/08/how-to-control-youtubes-video-player-with-javascript/

var ytplayer;

function onYouTubeIframeAPIReady() {
    "use strict";
    ytplayer = new YT.Player('video-placeholder', {
        width: 800,
        height: 400,
        videoId: 'VIzvhm6lLu8',
        playerVars: {
            color: 'white',
            controls: 2,
            iv_load_policy: 3,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            playlist: ''
        },
        events: {
        }
    });
    player.yt=ytplayer;
}
