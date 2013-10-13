var scAPI = 'http://api.soundcloud.com',
    scClientID = '54c92eba43154126e2a9c5046d707dd2',
    scStreamURL = scAPI + '/tracks/%TRACK_ID%/stream?client_id=' + scClientID,
    scTrackInfoURL = scAPI + '/tracks/%TRACK_ID%/?client_id=' + scClientID,
    trackID = 293,
    audio = new Audio(scStreamURL.replace('%TRACK_ID%', trackID)),
    play = document.getElementById('play'),
    timePlayed = document.getElementById('timePlayed'),
    duration = document.getElementById('duration');

/**
 * get time in format HH:MM
 *
 * @param {number} seconds time in seconds
 * @return {string} the formatted time string
 */
var getTimeFormat = function(seconds) {
  var minutes = parseInt(seconds / 60, 10),
      seconds = ('0' + parseInt(seconds % 60, 10)).substr(-2, 2);

  return (minutes + ':' + seconds);
};

// after we get the event, that metadata is available,
// we can set up the whole player
audio.addEventListener('loadedmetadata', function() {
  // set duration of the track
  duration.innerHTML = getTimeFormat(audio.duration);


  // add play/pause button functionality
  play.addEventListener('click', function() {
    audio[(audio.paused) ? 'play' : 'pause']();
  }, false);

  // add listener to audio api events
  audio.addEventListener('playing', function() {
    play.innerHTML = 'Pause';
  });
  audio.addEventListener('pause', function() {
    play.innerHTML = 'Play';
  });
  audio.addEventListener('timeupdate', function() {
    timePlayed.innerHTML = getTimeFormat(audio.currentTime);
  });

  // enable play/pause button
  play.disabled = false;
});
