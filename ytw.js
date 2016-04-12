// http://tutorialzine.com/2015/08/how-to-control-youtubes-video-player-with-javascript/

var player;

function onYouTubeIframeAPIReady() {
	player = new YT.Player('video-placeholder', {
	width: 600,
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
		onReady: initialize
	}
	});
}

function initialize(){

	// Update the controls on load
	updateTimerDisplay();
	//updateProgressBar();

	// Clear any old interval.
	//clearInterval(time_update_interval);

	// Start interval to update elapsed time display and
	// the elapsed part of the progress bar every second.
	time_update_interval = setInterval(function () {
		updateTimerDisplay();
		//updateProgressBar();
	}, 1000)

}

// This function is called by initialize()
function updateTimerDisplay(){
	// Update current time text display.
	$('#current-time').text(formatTime( player.getCurrentTime() ));
	$('#duration').text(formatTime( player.getDuration() ));
}

function formatTime(time){
	time = Math.round(time);

	var minutes = Math.floor(time / 60),
	seconds = time - minutes * 60;

	seconds = seconds < 10 ? '0' + seconds : seconds;

	return minutes + ":" + seconds;
}

function Annotation(start, end, content){
	this.start = start; 
	this.end = end; 
	this.content = content; 
	this.html = function () {
		return "<div class='annotation'>\
		<span class='start'>"+this.start+"</span>\
		<span class='end'>"+this.end+"</span>\
		<span class='content'>"+this.content+"</span>\
		</div>"; 
	}
}

test_annot = new Annotation(0.0,5.0,"test"); 
test_annot.html(); 
$('#annot-list').html(test_annot.html()); 
