require('./plugins/TweenMax');
require('./plugins/utils/Draggable');


var get = require('./lib/get');


var Music = require('./music');
var Scene = require('./scene');


var about = require('./about');


var menu = require('./menu');


var music = new Music(),
    musicPrev = document.querySelector('.music-prev'),
    musicToggle = document.querySelector('.music-toggle'),
    musicNext = document.querySelector('.music-next');

music.audio.addEventListener('ended', function() {
  music.load(music.songNext);
});

musicToggle.addEventListener('click', function(e) {
  e.stopPropagation();

  if (music.isPaused()) {
    this.classList.remove('is-paused');

    music.play();
  } else {
    this.classList.add('is-paused');

    music.pause();
  }
});

musicPrev.addEventListener('click', function(e) {
  e.stopPropagation();

  musicToggle.classList.remove('is-paused');

  music.prev();
});

musicNext.addEventListener('click', function(e) {
  e.stopPropagation();

  musicToggle.classList.remove('is-paused');

  music.next();
});


var scene = new Scene(music);

scene.createGeometry();
scene.createLight();
scene.createShaders();
scene.render();


get(
  'dist/svg/svg.svg',
  function (response) {
    var wrapper = document.createElement('div');

    wrapper.style.display = 'none';
    wrapper.innerHTML = response.responseText.replace(/\n/g, '');

    document.body.insertBefore(wrapper, document.body.childNodes[0]);
  }
);


window.addEventListener('resize', function() {
  scene.resize();
}, false);

window.addEventListener('click', function(e) {
  scene.click(e);
}, false);

window.addEventListener('mousemove', function(e) {
  scene.mousemove(e);
}, false);

window.addEventListener('mousewheel', function(e) {
  var volume = Math.round(music.audio.volume * 100) / 100;

  if (e.wheelDelta < 0 && volume - 0.05 >= 0) {
    volume = Math.abs(volume - 0.05);
  } else if (e.wheelDelta > 0 && volume + 0.05 <= 1) {
    volume = Math.abs(volume + 0.05);
  }

  music.audio.volume = volume;
});
