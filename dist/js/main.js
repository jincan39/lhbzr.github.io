(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var int = require('./lib/int');

module.exports = (function() {
  var about = document.querySelector('.about');

  Draggable.create(about, {
    bounds: document.body,
    edgeResistance: 1,
    type: 'x, y',
    onDrag: function(e) {
      TweenLite.to(this.target, .1, {
        x: this.x,
        y: this.y
      });
    }
  });

  about.addEventListener('mouseover', function() {
    TweenLite.to(about, .4, {
      background: 'rgba(255, 255, 255, 0)',
      color: 'rgb(255, 255, 255)'
    });
  });

  about.addEventListener('mouseout', function() {
    TweenLite.to(about, .4, {
      background: 'rgba(255, 255, 255, 1)',
      color: 'rgb(0, 0, 0)'
    });
  });

  about.style.left = int(0, window.innerWidth - about.offsetWidth) + 'px';
  about.style.top = int(0, window.innerHeight - about.offsetHeight) + 'px';
})();

},{"./lib/int":3}],2:[function(require,module,exports){
module.exports = function(url, callback) {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      callback(request);
    }
  };

  request.open('GET', url, true);

  request.send();
};

},{}],3:[function(require,module,exports){
module.exports = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

},{}],4:[function(require,module,exports){
module.exports = function(value, index, char) {
  return value.substr(0, index) + char + value.substr(index + 1);
};

},{}],5:[function(require,module,exports){
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

},{"./about":1,"./lib/get":2,"./menu":6,"./music":7,"./scene":12}],6:[function(require,module,exports){
var int = require('./lib/int');
var replace = require('./lib/replace');

module.exports = (function() {
  var link = document.querySelectorAll('.menu-link'),
      linkOverInterval,
      linkOutInterval;

  for (var i = 0; i < link.length; i++) {
    var linkCurrent = link[i],
        linkCurrentParent = linkCurrent.parentNode;

    Draggable.create(linkCurrentParent, {
      bounds: document.body,
      dragClickables: true,
      edgeResistance: 1,
      type: 'x, y',
      onDrag: function(e) {
        TweenLite.to(this.target, .1, {
          x: this.x,
          y: this.y
        });
      }
    });

    linkCurrent.addEventListener('mouseover', function() {
      var link = this;

      linkOverInterval = setInterval(function() {
        var linkValue = link.innerHTML.trim();

        link.innerHTML = replace(
          linkValue,
          int(0, linkValue.length - 1),
          String.fromCharCode(int(65, 122))
        );
      }, 1);

      TweenLite.to(link, .4, {
        background: 'rgba(255, 255, 255, 1)',
        color: 'rgb(0, 0, 0)'
      });
    });

    linkCurrent.addEventListener('mouseout', function() {
      var link = this,
          linkText = link.getAttribute('data-text');

      clearInterval(linkOverInterval);

      var i = 0;

      var linkOutInterval = setInterval(function() {
        if (i < linkText.length) {
          var linKValue = link.innerHTML.trim();

          link.innerHTML = replace(
            linKValue,
            i,
            linkText[i]
          );
        } else {
          clearInterval(linkOutInterval);
        }

        i++;
      }, 1);

      TweenLite.to(link, .4, {
        background: 'rgba(255, 255, 255, 0)',
        color: 'rgb(255, 255, 255)'
      });
    });

    linkCurrentParent.style.left = int(0, window.innerWidth - linkCurrent.offsetWidth) + 'px';
    linkCurrentParent.style.top = int(0, window.innerHeight - linkCurrent.offsetHeight) + 'px';
  }
})();

},{"./lib/int":3,"./lib/replace":4}],7:[function(require,module,exports){
var get = require('./lib/get');

module.exports = Music;

function Music() {
  this.audio = new Audio();
  this.audio.crossOrigin = 'anonymous';


  if (window.AudioContext || window.webkitAudioContext) {
    this.context = new (window.AudioContext || window.webkitAudioContext)();

    this.analyser = this.context.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.1;
    this.analyser.fftSize = 2048;
    this.analyser.connect(this.context.destination);

    this.src = this.context.createMediaElementSource(this.audio);
    this.src.connect(this.context.destination);
    this.src.connect(this.analyser);

    this.frequency = new Uint8Array(this.analyser.frequencyBinCount);
  }

  this.songs = [
    'https://soundcloud.com/leagueoflegends/dj-sona-kinetic-the-crystal',
//    'https://soundcloud.com/alpineband/gasoline-2',
    'https://soundcloud.com/odesza/say_my_name',
    'https://soundcloud.com/edbangerrecords/sebastian-embody',
//    'https://soundcloud.com/0data0/dont-sing-feat-benny-sings',
//    'https://soundcloud.com/c2cdjs/down-the-road',
    'https://soundcloud.com/madeon/pay-no-mind',
    'https://soundcloud.com/futureclassic/hayden-james-something-about-you-2',
    'https://soundcloud.com/kflay/5-am-w-something-a-la-mode',
    'https://soundcloud.com/majorlazer/major-lazer-dj-snake-lean-on-feat-mo',
    'https://soundcloud.com/themagician/lykke-li-i-follow-rivers-the-magician-remix',
//    'https://soundcloud.com/prettylights/pretty-lights-finally-moving',
    'https://soundcloud.com/rac/lana-del-rey-blue-jeans-rac'
  ];

  this.song = Math.floor(Math.random() * this.songs.length);
  this.songPrev = null;
  this.songNext = null;

  this.load(this.song);
};

Music.prototype.isPaused = function() {
  return this.audio.paused;
};


Music.prototype.isPlaying = function() {
  return !this.audio.paused;
};


Music.prototype.getFrequency = function() {
  this.analyser.getByteFrequencyData(this.frequency);

  return this.frequency;
};

Music.prototype.load = function(song) {
  var audio = this.audio;
  var songs = this.songs;

  get(
    '//api.soundcloud.com/resolve.json?url=' + songs[song] + '&client_id=78c6552c14b382e23be3bce2fc411a82',
    function(request) {
      var data = JSON.parse(request.responseText);
      var title = document.querySelector('.music-title');
      var user = document.querySelector('.music-user');

      audio.src = data.stream_url + '?client_id=78c6552c14b382e23be3bce2fc411a82';
      audio.play();

      title.setAttribute('href', data.permalink_url);
      title.textContent = data.title;

      user.setAttribute('href', data.user.permalink_url);
      user.textContent = data.user.username;
    }
  );

  this.song = song;
  this.songPrev = (this.song != 0) ? this.song - 1 : this.songs.length - 1;
  this.songNext = (this.song < this.songs.length - 1) ? this.song + 1 : 0;
};

Music.prototype.next = function() {
  this.load(this.songNext);
};


Music.prototype.prev = function() {
  this.load(this.songPrev);
};


Music.prototype.pause = function() {
  this.audio.pause();
};

Music.prototype.play = function() {
  this.audio.play();
};

},{"./lib/get":2}],8:[function(require,module,exports){
/**
 * @author alteredq / http://alteredqualia.com/
 */

module.exports = THREE.EffectComposer = function ( renderer, renderTarget ) {

	this.renderer = renderer;

	if ( renderTarget === undefined ) {

		var pixelRatio = renderer.getPixelRatio();

		var width  = Math.floor( renderer.context.canvas.width  / pixelRatio ) || 1;
		var height = Math.floor( renderer.context.canvas.height / pixelRatio ) || 1;
		var parameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBuffer: false };

		renderTarget = new THREE.WebGLRenderTarget( width, height, parameters );

	}

	this.renderTarget1 = renderTarget;
	this.renderTarget2 = renderTarget.clone();

	this.writeBuffer = this.renderTarget1;
	this.readBuffer = this.renderTarget2;

	this.passes = [];

	if ( THREE.CopyShader === undefined )
	console.error( "THREE.EffectComposer relies on THREE.CopyShader" );

	this.copyPass = new THREE.ShaderPass( THREE.CopyShader );

};

THREE.EffectComposer.prototype = {

	swapBuffers: function() {

		var tmp = this.readBuffer;
		this.readBuffer = this.writeBuffer;
		this.writeBuffer = tmp;

	},

	addPass: function ( pass ) {

		this.passes.push( pass );

	},

	insertPass: function ( pass, index ) {

		this.passes.splice( index, 0, pass );

	},

	render: function ( delta ) {

		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;

		var maskActive = false;

		var pass, i, il = this.passes.length;

		for ( i = 0; i < il; i ++ ) {

			pass = this.passes[ i ];

			if ( ! pass.enabled ) continue;

			pass.render( this.renderer, this.writeBuffer, this.readBuffer, delta, maskActive );

			if ( pass.needsSwap ) {

				if ( maskActive ) {

					var context = this.renderer.context;

					context.stencilFunc( context.NOTEQUAL, 1, 0xffffffff );

					this.copyPass.render( this.renderer, this.writeBuffer, this.readBuffer, delta );

					context.stencilFunc( context.EQUAL, 1, 0xffffffff );

				}

				this.swapBuffers();

			}

			if ( pass instanceof THREE.MaskPass ) {

				maskActive = true;

			} else if ( pass instanceof THREE.ClearMaskPass ) {

				maskActive = false;

			}

		}

	},

	reset: function ( renderTarget ) {

		if ( renderTarget === undefined ) {

			renderTarget = this.renderTarget1.clone();

			var pixelRatio = this.renderer.getPixelRatio();

			renderTarget.width  = Math.floor( this.renderer.context.canvas.width  / pixelRatio );
			renderTarget.height = Math.floor( this.renderer.context.canvas.height / pixelRatio );

		}

		this.renderTarget1.dispose();
		this.renderTarget1 = renderTarget;
		this.renderTarget2.dispose();
		this.renderTarget2 = renderTarget.clone();

		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;

	},

	setSize: function ( width, height ) {

		this.renderTarget1.setSize( width, height );
		this.renderTarget2.setSize( width, height );

	}

};

},{}],9:[function(require,module,exports){
/**
* @author alteredq / http://alteredqualia.com/
*/

module.exports = THREE.MaskPass = function ( scene, camera ) {

  this.scene = scene;
  this.camera = camera;

  this.enabled = true;
  this.clear = true;
  this.needsSwap = false;

  this.inverse = false;

};

THREE.MaskPass.prototype = {

  render: function ( renderer, writeBuffer, readBuffer, delta ) {

    var context = renderer.context;

    // don't update color or depth

    context.colorMask( false, false, false, false );
    context.depthMask( false );

    // set up stencil

    var writeValue, clearValue;

    if ( this.inverse ) {

      writeValue = 0;
      clearValue = 1;

    } else {

      writeValue = 1;
      clearValue = 0;

    }

    context.enable( context.STENCIL_TEST );
    context.stencilOp( context.REPLACE, context.REPLACE, context.REPLACE );
    context.stencilFunc( context.ALWAYS, writeValue, 0xffffffff );
    context.clearStencil( clearValue );

    // draw into the stencil buffer

    renderer.render( this.scene, this.camera, readBuffer, this.clear );
    renderer.render( this.scene, this.camera, writeBuffer, this.clear );

    // re-enable update of color and depth

    context.colorMask( true, true, true, true );
    context.depthMask( true );

    // only render where stencil is set to 1

    context.stencilFunc( context.EQUAL, 1, 0xffffffff );  // draw if == 1
    context.stencilOp( context.KEEP, context.KEEP, context.KEEP );

  }

};


THREE.ClearMaskPass = function () {

  this.enabled = true;

};

THREE.ClearMaskPass.prototype = {

  render: function ( renderer, writeBuffer, readBuffer, delta ) {

    var context = renderer.context;

    context.disable( context.STENCIL_TEST );

  }

};

},{}],10:[function(require,module,exports){
/**
 * @author alteredq / http://alteredqualia.com/
 */

module.exports = THREE.RenderPass = function ( scene, camera, overrideMaterial, clearColor, clearAlpha ) {

	this.scene = scene;
	this.camera = camera;

	this.overrideMaterial = overrideMaterial;

	this.clearColor = clearColor;
	this.clearAlpha = ( clearAlpha !== undefined ) ? clearAlpha : 1;

	this.oldClearColor = new THREE.Color();
	this.oldClearAlpha = 1;

	this.enabled = true;
	this.clear = true;
	this.needsSwap = false;

};

THREE.RenderPass.prototype = {

	render: function ( renderer, writeBuffer, readBuffer, delta ) {

		this.scene.overrideMaterial = this.overrideMaterial;

		if ( this.clearColor ) {

			this.oldClearColor.copy( renderer.getClearColor() );
			this.oldClearAlpha = renderer.getClearAlpha();

			renderer.setClearColor( this.clearColor, this.clearAlpha );

		}

		renderer.render( this.scene, this.camera, readBuffer, this.clear );

		if ( this.clearColor ) {

			renderer.setClearColor( this.oldClearColor, this.oldClearAlpha );

		}

		this.scene.overrideMaterial = null;

	}

};

},{}],11:[function(require,module,exports){
/**
 * @author alteredq / http://alteredqualia.com/
 */

module.exports = THREE.ShaderPass = function ( shader, textureID ) {

	this.textureID = ( textureID !== undefined ) ? textureID : "tDiffuse";

	this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

	this.material = new THREE.ShaderMaterial( {

		defines: shader.defines || {},
		uniforms: this.uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader

	} );

	this.renderToScreen = false;

	this.enabled = true;
	this.needsSwap = true;
	this.clear = false;


	this.camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
	this.scene  = new THREE.Scene();

	this.quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), null );
	this.scene.add( this.quad );

};

THREE.ShaderPass.prototype = {

	render: function ( renderer, writeBuffer, readBuffer, delta ) {

		if ( this.uniforms[ this.textureID ] ) {

			this.uniforms[ this.textureID ].value = readBuffer;

		}

		this.quad.material = this.material;

		if ( this.renderToScreen ) {

			renderer.render( this.scene, this.camera );

		} else {

			renderer.render( this.scene, this.camera, writeBuffer, this.clear );

		}

	}

};

},{}],12:[function(require,module,exports){
var int = require('./lib/int');

var EffectComposer = require('./processing/effectcomposer');
var MaskPass = require('./processing/maskpass');
var RenderPass = require('./processing/renderpass');
var ShaderPass = require('./processing/shaderpass');
var CopyShader = require('./shaders/copyshader');
var RGBShiftShader = require('./shaders/rgbshift');

module.exports = Scene;

function Scene(music) {
  this.canvas = document.querySelector('.canvas');
  this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  this.camera.position.z = 275;
  this.camera.lookAt = new THREE.Vector3();

  this.scene = new THREE.Scene();

  this.renderer = new THREE.WebGLRenderer({
    alpha: true,
    canvas: this.canvas
  });
  this.renderer.setSize(window.innerWidth, window.innerHeight);

  this.circle = [];
  this.geometry = [];
  this.geometrySleeve = [];
  this.geometryList = [
    new THREE.TetrahedronGeometry(50, 0),
    new THREE.IcosahedronGeometry(40, 0),
    new THREE.OctahedronGeometry(40, 0)
  ];

  this.composer = new EffectComposer(this.renderer);

  this.mouse = {
    x: 0,
    y: 0
  };

  this.music = music;

  this.clicked = false;
}

Scene.GEOMETRY_LENGTH = 100;

Scene.prototype.createGeometry = function() {
  var number = int(0, this.geometryList.length - 1);

  this.circle = new THREE.Object3D();

  for (var i = 0; i < Scene.GEOMETRY_LENGTH; i++) {
    this.geometry[i] = new THREE.Mesh(
      this.geometryList[number],
      new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        wireframe: true
      })
    );

    this.geometry[i].position.y = 100;

    this.geometrySleeve[i] = new THREE.Object3D();
    this.geometrySleeve[i].add(this.geometry[i]);
    this.geometrySleeve[i].rotation.z = i * (360 / Scene.GEOMETRY_LENGTH) * Math.PI / 180;

    this.circle.add(this.geometrySleeve[i]);
  }

  this.scene.add(this.circle);
};

Scene.prototype.createLight = function() {
  var light;

  light = new THREE.DirectionalLight(0xFFFFFF, 1);
  light.position.set(1, 1, 1);

  this.scene.add(light);

  light = new THREE.DirectionalLight(0xFFFFFF, 1);
  light.position.set(-1, -1, 1);

  this.scene.add(light);
};

Scene.prototype.createShaders = function() {
  var effect;

  this.composer.addPass(new RenderPass(this.scene, this.camera));

  effect = new ShaderPass(RGBShiftShader);
  effect.uniforms['amount'].value = 0.05;
  effect.renderToScreen = true;

  this.composer.addPass(effect);

  this.renderer.render(this.scene, this.camera);

  this.effect = effect;
};

Scene.prototype.render = function() {
  requestAnimationFrame(this.render.bind(this));

  if (this.clicked) {
    TweenLite.to(this.effect.uniforms['amount'], 1, {
      value: 0.005
    });
  } else {
    TweenLite.to(this.effect.uniforms['amount'], 1, {
      value: this.mouse.x / window.innerWidth
    });
  }

  for (var i = 0; i < Scene.GEOMETRY_LENGTH; i++) {
    var value = 1;

    if (window.AudioContext || window.webkitAudioContext) {
      value = ((this.music.getFrequency()[i] / 256) * 2.5) + 0.01;
    }

    if (this.clicked) {
      TweenLite.to(this.geometry[i].scale, .1, {
        x: value,
        y: value,
        z: value
      });

      if (i % 2 == 0) {
        TweenLite.to(this.geometry[i].rotation, .1, {
          z: "+= 0.1"
        });
      } else {
        TweenLite.to(this.geometry[i].rotation, .1, {
          z: "-= 0.1"
        });
      }
    } else {
      TweenLite.to(this.geometry[i].scale, .1, {
        z: value
      });
    }
  }

  this.circle.rotation.z += 0.01;

  this.renderer.render(this.scene, this.camera);

  this.composer.render();
};

Scene.prototype.resize = function() {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();

  this.renderer.setSize(window.innerWidth, window.innerHeight);
};

Scene.prototype.mousemove = function(e) {
  this.mouse.x = e.clientX - window.innerWidth / 2;
  this.mouse.y = e.clientY - window.innerHeight / 2;
};

Scene.prototype.click = function() {
  if (this.clicked) {
    for (var i = 0; i < Scene.GEOMETRY_LENGTH; i++) {
      TweenLite.to(this.geometry[i].scale, 1, {
        x: 1,
        y: 1,
        z: 1
      });

      TweenLite.to(this.geometry[i].rotation, 1, {
        x: 0,
        y: 0,
        z: 0
      });

      TweenLite.to(this.geometry[i].position, 1, {
        x: 0,
        y: 100,
        z: 0
      });
    }

    this.clicked = false;
  } else {
    for (var i = 0; i < Scene.GEOMETRY_LENGTH; i++) {
      TweenLite.to(this.geometry[i].rotation, 1, {
        x: int(0, Math.PI),
        y: int(0, Math.PI),
        z: int(0, Math.PI)
      });

      TweenLite.to(this.geometry[i].position, 1, {
        x: "+= " + int(-1000, 1000),
        y: "+= " + int(-1000, 1000),
        z: "+= " + int(-500, -250)
      });
    }

    this.clicked = true;
  }
};

},{"./lib/int":3,"./processing/effectcomposer":8,"./processing/maskpass":9,"./processing/renderpass":10,"./processing/shaderpass":11,"./shaders/copyshader":13,"./shaders/rgbshift":14}],13:[function(require,module,exports){
/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Full-screen textured quad shader
 */

module.exports = THREE.CopyShader = {
  uniforms: {
    "tDiffuse": { type: "t", value: null },
    "opacity":  { type: "f", value: 1.0 }
  },
  vertexShader: [
    "varying vec2 vUv;",
    "void main() {",
    "vUv = uv;",
    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
    "}"
  ].join( "\n" ),
  fragmentShader: [
    "uniform float opacity;",
    "uniform sampler2D tDiffuse;",
    "varying vec2 vUv;",
    "void main() {",
    "vec4 texel = texture2D( tDiffuse, vUv );",
    "gl_FragColor = opacity * texel;",
    "}"
  ].join( "\n" )
};

},{}],14:[function(require,module,exports){
/**
* @author felixturner / http://airtight.cc/
*
* RGB Shift Shader
* Shifts red and blue channels from center in opposite directions
* Ported from http://kriss.cx/tom/2009/05/rgb-shift/
* by Tom Butterworth / http://kriss.cx/tom/
*
* amount: shift distance (1 is width of input)
* angle: shift angle in radians
*/

module.exports = THREE.RGBShiftShader = {
  uniforms: {
    "tDiffuse": { type: "t", value: null },
    "amount":   { type: "f", value: 0.005 },
    "angle":    { type: "f", value: 0.0 }
  },
  vertexShader: [
    "varying vec2 vUv;",
    "void main() {",
    "vUv = uv;",
    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
    "}"
  ].join("\n"),
  fragmentShader: [
    "uniform sampler2D tDiffuse;",
    "uniform float amount;",
    "uniform float angle;",
    "varying vec2 vUv;",
    "void main() {",
    "vec2 offset = amount * vec2( cos(angle), sin(angle));",
    "vec4 cr = texture2D(tDiffuse, vUv + offset);",
    "vec4 cga = texture2D(tDiffuse, vUv);",
    "vec4 cb = texture2D(tDiffuse, vUv - offset);",
    "gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);",
    "}"
  ].join("\n")
};

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYWJvdXQuanMiLCJzcmMvanMvbGliL2dldC5qcyIsInNyYy9qcy9saWIvaW50LmpzIiwic3JjL2pzL2xpYi9yZXBsYWNlLmpzIiwic3JjL2pzL21haW4uanMiLCJzcmMvanMvbWVudS5qcyIsInNyYy9qcy9tdXNpYy5qcyIsInNyYy9qcy9wcm9jZXNzaW5nL2VmZmVjdGNvbXBvc2VyLmpzIiwic3JjL2pzL3Byb2Nlc3NpbmcvbWFza3Bhc3MuanMiLCJzcmMvanMvcHJvY2Vzc2luZy9yZW5kZXJwYXNzLmpzIiwic3JjL2pzL3Byb2Nlc3Npbmcvc2hhZGVycGFzcy5qcyIsInNyYy9qcy9zY2VuZS5qcyIsInNyYy9qcy9zaGFkZXJzL2NvcHlzaGFkZXIuanMiLCJzcmMvanMvc2hhZGVycy9yZ2JzaGlmdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9NQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgaW50ID0gcmVxdWlyZSgnLi9saWIvaW50Jyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuICB2YXIgYWJvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXQnKTtcclxuXHJcbiAgRHJhZ2dhYmxlLmNyZWF0ZShhYm91dCwge1xyXG4gICAgYm91bmRzOiBkb2N1bWVudC5ib2R5LFxyXG4gICAgZWRnZVJlc2lzdGFuY2U6IDEsXHJcbiAgICB0eXBlOiAneCwgeScsXHJcbiAgICBvbkRyYWc6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgVHdlZW5MaXRlLnRvKHRoaXMudGFyZ2V0LCAuMSwge1xyXG4gICAgICAgIHg6IHRoaXMueCxcclxuICAgICAgICB5OiB0aGlzLnlcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGFib3V0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgVHdlZW5MaXRlLnRvKGFib3V0LCAuNCwge1xyXG4gICAgICBiYWNrZ3JvdW5kOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwKScsXHJcbiAgICAgIGNvbG9yOiAncmdiKDI1NSwgMjU1LCAyNTUpJ1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGFib3V0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICBUd2VlbkxpdGUudG8oYWJvdXQsIC40LCB7XHJcbiAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpJyxcclxuICAgICAgY29sb3I6ICdyZ2IoMCwgMCwgMCknXHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgYWJvdXQuc3R5bGUubGVmdCA9IGludCgwLCB3aW5kb3cuaW5uZXJXaWR0aCAtIGFib3V0Lm9mZnNldFdpZHRoKSArICdweCc7XHJcbiAgYWJvdXQuc3R5bGUudG9wID0gaW50KDAsIHdpbmRvdy5pbm5lckhlaWdodCAtIGFib3V0Lm9mZnNldEhlaWdodCkgKyAncHgnO1xyXG59KSgpO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVybCwgY2FsbGJhY2spIHtcclxuICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA9PT0gNCAmJiByZXF1ZXN0LnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgIGNhbGxiYWNrKHJlcXVlc3QpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJlcXVlc3Qub3BlbignR0VUJywgdXJsLCB0cnVlKTtcclxuXHJcbiAgcmVxdWVzdC5zZW5kKCk7XHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obWluLCBtYXgpIHtcclxuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNoYXIpIHtcclxuICByZXR1cm4gdmFsdWUuc3Vic3RyKDAsIGluZGV4KSArIGNoYXIgKyB2YWx1ZS5zdWJzdHIoaW5kZXggKyAxKTtcclxufTtcclxuIiwidmFyIGdldCA9IHJlcXVpcmUoJy4vbGliL2dldCcpO1xyXG5cclxuXHJcbnZhciBNdXNpYyA9IHJlcXVpcmUoJy4vbXVzaWMnKTtcclxudmFyIFNjZW5lID0gcmVxdWlyZSgnLi9zY2VuZScpO1xyXG5cclxuXHJcbnZhciBhYm91dCA9IHJlcXVpcmUoJy4vYWJvdXQnKTtcclxuXHJcblxyXG52YXIgbWVudSA9IHJlcXVpcmUoJy4vbWVudScpO1xyXG5cclxuXHJcbnZhciBtdXNpYyA9IG5ldyBNdXNpYygpLFxyXG4gICAgbXVzaWNQcmV2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm11c2ljLXByZXYnKSxcclxuICAgIG11c2ljVG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm11c2ljLXRvZ2dsZScpLFxyXG4gICAgbXVzaWNOZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm11c2ljLW5leHQnKTtcclxuXHJcbm11c2ljLmF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgbXVzaWMubG9hZChtdXNpYy5zb25nTmV4dCk7XHJcbn0pO1xyXG5cclxubXVzaWNUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgaWYgKG11c2ljLmlzUGF1c2VkKCkpIHtcclxuICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnaXMtcGF1c2VkJyk7XHJcblxyXG4gICAgbXVzaWMucGxheSgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2lzLXBhdXNlZCcpO1xyXG5cclxuICAgIG11c2ljLnBhdXNlKCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbm11c2ljUHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICBtdXNpY1RvZ2dsZS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1wYXVzZWQnKTtcclxuXHJcbiAgbXVzaWMucHJldigpO1xyXG59KTtcclxuXHJcbm11c2ljTmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICBtdXNpY1RvZ2dsZS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1wYXVzZWQnKTtcclxuXHJcbiAgbXVzaWMubmV4dCgpO1xyXG59KTtcclxuXHJcblxyXG52YXIgc2NlbmUgPSBuZXcgU2NlbmUobXVzaWMpO1xyXG5cclxuc2NlbmUuY3JlYXRlR2VvbWV0cnkoKTtcclxuc2NlbmUuY3JlYXRlTGlnaHQoKTtcclxuc2NlbmUuY3JlYXRlU2hhZGVycygpO1xyXG5zY2VuZS5yZW5kZXIoKTtcclxuXHJcblxyXG5nZXQoXHJcbiAgJ2Rpc3Qvc3ZnL3N2Zy5zdmcnLFxyXG4gIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgdmFyIHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICB3cmFwcGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB3cmFwcGVyLmlubmVySFRNTCA9IHJlc3BvbnNlLnJlc3BvbnNlVGV4dC5yZXBsYWNlKC9cXG4vZywgJycpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1swXSk7XHJcbiAgfVxyXG4pO1xyXG5cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcclxuICBzY2VuZS5yZXNpemUoKTtcclxufSwgZmFsc2UpO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gIHNjZW5lLmNsaWNrKGUpO1xyXG59LCBmYWxzZSk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSkge1xyXG4gIHNjZW5lLm1vdXNlbW92ZShlKTtcclxufSwgZmFsc2UpO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCBmdW5jdGlvbihlKSB7XHJcbiAgdmFyIHZvbHVtZSA9IE1hdGgucm91bmQobXVzaWMuYXVkaW8udm9sdW1lICogMTAwKSAvIDEwMDtcclxuXHJcbiAgaWYgKGUud2hlZWxEZWx0YSA8IDAgJiYgdm9sdW1lIC0gMC4wNSA+PSAwKSB7XHJcbiAgICB2b2x1bWUgPSBNYXRoLmFicyh2b2x1bWUgLSAwLjA1KTtcclxuICB9IGVsc2UgaWYgKGUud2hlZWxEZWx0YSA+IDAgJiYgdm9sdW1lICsgMC4wNSA8PSAxKSB7XHJcbiAgICB2b2x1bWUgPSBNYXRoLmFicyh2b2x1bWUgKyAwLjA1KTtcclxuICB9XHJcblxyXG4gIG11c2ljLmF1ZGlvLnZvbHVtZSA9IHZvbHVtZTtcclxufSk7XHJcbiIsInZhciBpbnQgPSByZXF1aXJlKCcuL2xpYi9pbnQnKTtcclxudmFyIHJlcGxhY2UgPSByZXF1aXJlKCcuL2xpYi9yZXBsYWNlJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuICB2YXIgbGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51LWxpbmsnKSxcclxuICAgICAgbGlua092ZXJJbnRlcnZhbCxcclxuICAgICAgbGlua091dEludGVydmFsO1xyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmsubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBsaW5rQ3VycmVudCA9IGxpbmtbaV0sXHJcbiAgICAgICAgbGlua0N1cnJlbnRQYXJlbnQgPSBsaW5rQ3VycmVudC5wYXJlbnROb2RlO1xyXG5cclxuICAgIERyYWdnYWJsZS5jcmVhdGUobGlua0N1cnJlbnRQYXJlbnQsIHtcclxuICAgICAgYm91bmRzOiBkb2N1bWVudC5ib2R5LFxyXG4gICAgICBkcmFnQ2xpY2thYmxlczogdHJ1ZSxcclxuICAgICAgZWRnZVJlc2lzdGFuY2U6IDEsXHJcbiAgICAgIHR5cGU6ICd4LCB5JyxcclxuICAgICAgb25EcmFnOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgVHdlZW5MaXRlLnRvKHRoaXMudGFyZ2V0LCAuMSwge1xyXG4gICAgICAgICAgeDogdGhpcy54LFxyXG4gICAgICAgICAgeTogdGhpcy55XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxpbmtDdXJyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgbGluayA9IHRoaXM7XHJcblxyXG4gICAgICBsaW5rT3ZlckludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGxpbmtWYWx1ZSA9IGxpbmsuaW5uZXJIVE1MLnRyaW0oKTtcclxuXHJcbiAgICAgICAgbGluay5pbm5lckhUTUwgPSByZXBsYWNlKFxyXG4gICAgICAgICAgbGlua1ZhbHVlLFxyXG4gICAgICAgICAgaW50KDAsIGxpbmtWYWx1ZS5sZW5ndGggLSAxKSxcclxuICAgICAgICAgIFN0cmluZy5mcm9tQ2hhckNvZGUoaW50KDY1LCAxMjIpKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0sIDEpO1xyXG5cclxuICAgICAgVHdlZW5MaXRlLnRvKGxpbmssIC40LCB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMSknLFxyXG4gICAgICAgIGNvbG9yOiAncmdiKDAsIDAsIDApJ1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxpbmtDdXJyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBsaW5rID0gdGhpcyxcclxuICAgICAgICAgIGxpbmtUZXh0ID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcpO1xyXG5cclxuICAgICAgY2xlYXJJbnRlcnZhbChsaW5rT3ZlckludGVydmFsKTtcclxuXHJcbiAgICAgIHZhciBpID0gMDtcclxuXHJcbiAgICAgIHZhciBsaW5rT3V0SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoaSA8IGxpbmtUZXh0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgdmFyIGxpbktWYWx1ZSA9IGxpbmsuaW5uZXJIVE1MLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICBsaW5rLmlubmVySFRNTCA9IHJlcGxhY2UoXHJcbiAgICAgICAgICAgIGxpbktWYWx1ZSxcclxuICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgbGlua1RleHRbaV1cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwobGlua091dEludGVydmFsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGkrKztcclxuICAgICAgfSwgMSk7XHJcblxyXG4gICAgICBUd2VlbkxpdGUudG8obGluaywgLjQsIHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwKScsXHJcbiAgICAgICAgY29sb3I6ICdyZ2IoMjU1LCAyNTUsIDI1NSknXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGlua0N1cnJlbnRQYXJlbnQuc3R5bGUubGVmdCA9IGludCgwLCB3aW5kb3cuaW5uZXJXaWR0aCAtIGxpbmtDdXJyZW50Lm9mZnNldFdpZHRoKSArICdweCc7XHJcbiAgICBsaW5rQ3VycmVudFBhcmVudC5zdHlsZS50b3AgPSBpbnQoMCwgd2luZG93LmlubmVySGVpZ2h0IC0gbGlua0N1cnJlbnQub2Zmc2V0SGVpZ2h0KSArICdweCc7XHJcbiAgfVxyXG59KSgpO1xyXG4iLCJ2YXIgZ2V0ID0gcmVxdWlyZSgnLi9saWIvZ2V0Jyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE11c2ljO1xyXG5cclxuZnVuY3Rpb24gTXVzaWMoKSB7XHJcbiAgdGhpcy5hdWRpbyA9IG5ldyBBdWRpbygpO1xyXG4gIHRoaXMuYXVkaW8uY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJztcclxuXHJcblxyXG4gIGlmICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpIHtcclxuICAgIHRoaXMuY29udGV4dCA9IG5ldyAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KSgpO1xyXG5cclxuICAgIHRoaXMuYW5hbHlzZXIgPSB0aGlzLmNvbnRleHQuY3JlYXRlQW5hbHlzZXIoKTtcclxuICAgIHRoaXMuYW5hbHlzZXIuc21vb3RoaW5nVGltZUNvbnN0YW50ID0gMC4xO1xyXG4gICAgdGhpcy5hbmFseXNlci5mZnRTaXplID0gMjA0ODtcclxuICAgIHRoaXMuYW5hbHlzZXIuY29ubmVjdCh0aGlzLmNvbnRleHQuZGVzdGluYXRpb24pO1xyXG5cclxuICAgIHRoaXMuc3JjID0gdGhpcy5jb250ZXh0LmNyZWF0ZU1lZGlhRWxlbWVudFNvdXJjZSh0aGlzLmF1ZGlvKTtcclxuICAgIHRoaXMuc3JjLmNvbm5lY3QodGhpcy5jb250ZXh0LmRlc3RpbmF0aW9uKTtcclxuICAgIHRoaXMuc3JjLmNvbm5lY3QodGhpcy5hbmFseXNlcik7XHJcblxyXG4gICAgdGhpcy5mcmVxdWVuY3kgPSBuZXcgVWludDhBcnJheSh0aGlzLmFuYWx5c2VyLmZyZXF1ZW5jeUJpbkNvdW50KTtcclxuICB9XHJcblxyXG4gIHRoaXMuc29uZ3MgPSBbXHJcbiAgICAnaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS9sZWFndWVvZmxlZ2VuZHMvZGotc29uYS1raW5ldGljLXRoZS1jcnlzdGFsJyxcclxuLy8gICAgJ2h0dHBzOi8vc291bmRjbG91ZC5jb20vYWxwaW5lYmFuZC9nYXNvbGluZS0yJyxcclxuICAgICdodHRwczovL3NvdW5kY2xvdWQuY29tL29kZXN6YS9zYXlfbXlfbmFtZScsXHJcbiAgICAnaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS9lZGJhbmdlcnJlY29yZHMvc2ViYXN0aWFuLWVtYm9keScsXHJcbi8vICAgICdodHRwczovL3NvdW5kY2xvdWQuY29tLzBkYXRhMC9kb250LXNpbmctZmVhdC1iZW5ueS1zaW5ncycsXHJcbi8vICAgICdodHRwczovL3NvdW5kY2xvdWQuY29tL2MyY2Rqcy9kb3duLXRoZS1yb2FkJyxcclxuICAgICdodHRwczovL3NvdW5kY2xvdWQuY29tL21hZGVvbi9wYXktbm8tbWluZCcsXHJcbiAgICAnaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS9mdXR1cmVjbGFzc2ljL2hheWRlbi1qYW1lcy1zb21ldGhpbmctYWJvdXQteW91LTInLFxyXG4gICAgJ2h0dHBzOi8vc291bmRjbG91ZC5jb20va2ZsYXkvNS1hbS13LXNvbWV0aGluZy1hLWxhLW1vZGUnLFxyXG4gICAgJ2h0dHBzOi8vc291bmRjbG91ZC5jb20vbWFqb3JsYXplci9tYWpvci1sYXplci1kai1zbmFrZS1sZWFuLW9uLWZlYXQtbW8nLFxyXG4gICAgJ2h0dHBzOi8vc291bmRjbG91ZC5jb20vdGhlbWFnaWNpYW4vbHlra2UtbGktaS1mb2xsb3ctcml2ZXJzLXRoZS1tYWdpY2lhbi1yZW1peCcsXHJcbi8vICAgICdodHRwczovL3NvdW5kY2xvdWQuY29tL3ByZXR0eWxpZ2h0cy9wcmV0dHktbGlnaHRzLWZpbmFsbHktbW92aW5nJyxcclxuICAgICdodHRwczovL3NvdW5kY2xvdWQuY29tL3JhYy9sYW5hLWRlbC1yZXktYmx1ZS1qZWFucy1yYWMnXHJcbiAgXTtcclxuXHJcbiAgdGhpcy5zb25nID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5zb25ncy5sZW5ndGgpO1xyXG4gIHRoaXMuc29uZ1ByZXYgPSBudWxsO1xyXG4gIHRoaXMuc29uZ05leHQgPSBudWxsO1xyXG5cclxuICB0aGlzLmxvYWQodGhpcy5zb25nKTtcclxufTtcclxuXHJcbk11c2ljLnByb3RvdHlwZS5pc1BhdXNlZCA9IGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiB0aGlzLmF1ZGlvLnBhdXNlZDtcclxufTtcclxuXHJcblxyXG5NdXNpYy5wcm90b3R5cGUuaXNQbGF5aW5nID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuICF0aGlzLmF1ZGlvLnBhdXNlZDtcclxufTtcclxuXHJcblxyXG5NdXNpYy5wcm90b3R5cGUuZ2V0RnJlcXVlbmN5ID0gZnVuY3Rpb24oKSB7XHJcbiAgdGhpcy5hbmFseXNlci5nZXRCeXRlRnJlcXVlbmN5RGF0YSh0aGlzLmZyZXF1ZW5jeSk7XHJcblxyXG4gIHJldHVybiB0aGlzLmZyZXF1ZW5jeTtcclxufTtcclxuXHJcbk11c2ljLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24oc29uZykge1xyXG4gIHZhciBhdWRpbyA9IHRoaXMuYXVkaW87XHJcbiAgdmFyIHNvbmdzID0gdGhpcy5zb25ncztcclxuXHJcbiAgZ2V0KFxyXG4gICAgJy8vYXBpLnNvdW5kY2xvdWQuY29tL3Jlc29sdmUuanNvbj91cmw9JyArIHNvbmdzW3NvbmddICsgJyZjbGllbnRfaWQ9NzhjNjU1MmMxNGIzODJlMjNiZTNiY2UyZmM0MTFhODInLFxyXG4gICAgZnVuY3Rpb24ocmVxdWVzdCkge1xyXG4gICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xyXG4gICAgICB2YXIgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXVzaWMtdGl0bGUnKTtcclxuICAgICAgdmFyIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXVzaWMtdXNlcicpO1xyXG5cclxuICAgICAgYXVkaW8uc3JjID0gZGF0YS5zdHJlYW1fdXJsICsgJz9jbGllbnRfaWQ9NzhjNjU1MmMxNGIzODJlMjNiZTNiY2UyZmM0MTFhODInO1xyXG4gICAgICBhdWRpby5wbGF5KCk7XHJcblxyXG4gICAgICB0aXRsZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBkYXRhLnBlcm1hbGlua191cmwpO1xyXG4gICAgICB0aXRsZS50ZXh0Q29udGVudCA9IGRhdGEudGl0bGU7XHJcblxyXG4gICAgICB1c2VyLnNldEF0dHJpYnV0ZSgnaHJlZicsIGRhdGEudXNlci5wZXJtYWxpbmtfdXJsKTtcclxuICAgICAgdXNlci50ZXh0Q29udGVudCA9IGRhdGEudXNlci51c2VybmFtZTtcclxuICAgIH1cclxuICApO1xyXG5cclxuICB0aGlzLnNvbmcgPSBzb25nO1xyXG4gIHRoaXMuc29uZ1ByZXYgPSAodGhpcy5zb25nICE9IDApID8gdGhpcy5zb25nIC0gMSA6IHRoaXMuc29uZ3MubGVuZ3RoIC0gMTtcclxuICB0aGlzLnNvbmdOZXh0ID0gKHRoaXMuc29uZyA8IHRoaXMuc29uZ3MubGVuZ3RoIC0gMSkgPyB0aGlzLnNvbmcgKyAxIDogMDtcclxufTtcclxuXHJcbk11c2ljLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XHJcbiAgdGhpcy5sb2FkKHRoaXMuc29uZ05leHQpO1xyXG59O1xyXG5cclxuXHJcbk11c2ljLnByb3RvdHlwZS5wcmV2ID0gZnVuY3Rpb24oKSB7XHJcbiAgdGhpcy5sb2FkKHRoaXMuc29uZ1ByZXYpO1xyXG59O1xyXG5cclxuXHJcbk11c2ljLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uKCkge1xyXG4gIHRoaXMuYXVkaW8ucGF1c2UoKTtcclxufTtcclxuXHJcbk11c2ljLnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24oKSB7XHJcbiAgdGhpcy5hdWRpby5wbGF5KCk7XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBAYXV0aG9yIGFsdGVyZWRxIC8gaHR0cDovL2FsdGVyZWRxdWFsaWEuY29tL1xyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVEhSRUUuRWZmZWN0Q29tcG9zZXIgPSBmdW5jdGlvbiAoIHJlbmRlcmVyLCByZW5kZXJUYXJnZXQgKSB7XHJcblxyXG5cdHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcclxuXHJcblx0aWYgKCByZW5kZXJUYXJnZXQgPT09IHVuZGVmaW5lZCApIHtcclxuXHJcblx0XHR2YXIgcGl4ZWxSYXRpbyA9IHJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKTtcclxuXHJcblx0XHR2YXIgd2lkdGggID0gTWF0aC5mbG9vciggcmVuZGVyZXIuY29udGV4dC5jYW52YXMud2lkdGggIC8gcGl4ZWxSYXRpbyApIHx8IDE7XHJcblx0XHR2YXIgaGVpZ2h0ID0gTWF0aC5mbG9vciggcmVuZGVyZXIuY29udGV4dC5jYW52YXMuaGVpZ2h0IC8gcGl4ZWxSYXRpbyApIHx8IDE7XHJcblx0XHR2YXIgcGFyYW1ldGVycyA9IHsgbWluRmlsdGVyOiBUSFJFRS5MaW5lYXJGaWx0ZXIsIG1hZ0ZpbHRlcjogVEhSRUUuTGluZWFyRmlsdGVyLCBmb3JtYXQ6IFRIUkVFLlJHQkZvcm1hdCwgc3RlbmNpbEJ1ZmZlcjogZmFsc2UgfTtcclxuXHJcblx0XHRyZW5kZXJUYXJnZXQgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXQoIHdpZHRoLCBoZWlnaHQsIHBhcmFtZXRlcnMgKTtcclxuXHJcblx0fVxyXG5cclxuXHR0aGlzLnJlbmRlclRhcmdldDEgPSByZW5kZXJUYXJnZXQ7XHJcblx0dGhpcy5yZW5kZXJUYXJnZXQyID0gcmVuZGVyVGFyZ2V0LmNsb25lKCk7XHJcblxyXG5cdHRoaXMud3JpdGVCdWZmZXIgPSB0aGlzLnJlbmRlclRhcmdldDE7XHJcblx0dGhpcy5yZWFkQnVmZmVyID0gdGhpcy5yZW5kZXJUYXJnZXQyO1xyXG5cclxuXHR0aGlzLnBhc3NlcyA9IFtdO1xyXG5cclxuXHRpZiAoIFRIUkVFLkNvcHlTaGFkZXIgPT09IHVuZGVmaW5lZCApXHJcblx0Y29uc29sZS5lcnJvciggXCJUSFJFRS5FZmZlY3RDb21wb3NlciByZWxpZXMgb24gVEhSRUUuQ29weVNoYWRlclwiICk7XHJcblxyXG5cdHRoaXMuY29weVBhc3MgPSBuZXcgVEhSRUUuU2hhZGVyUGFzcyggVEhSRUUuQ29weVNoYWRlciApO1xyXG5cclxufTtcclxuXHJcblRIUkVFLkVmZmVjdENvbXBvc2VyLnByb3RvdHlwZSA9IHtcclxuXHJcblx0c3dhcEJ1ZmZlcnM6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHZhciB0bXAgPSB0aGlzLnJlYWRCdWZmZXI7XHJcblx0XHR0aGlzLnJlYWRCdWZmZXIgPSB0aGlzLndyaXRlQnVmZmVyO1xyXG5cdFx0dGhpcy53cml0ZUJ1ZmZlciA9IHRtcDtcclxuXHJcblx0fSxcclxuXHJcblx0YWRkUGFzczogZnVuY3Rpb24gKCBwYXNzICkge1xyXG5cclxuXHRcdHRoaXMucGFzc2VzLnB1c2goIHBhc3MgKTtcclxuXHJcblx0fSxcclxuXHJcblx0aW5zZXJ0UGFzczogZnVuY3Rpb24gKCBwYXNzLCBpbmRleCApIHtcclxuXHJcblx0XHR0aGlzLnBhc3Nlcy5zcGxpY2UoIGluZGV4LCAwLCBwYXNzICk7XHJcblxyXG5cdH0sXHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24gKCBkZWx0YSApIHtcclxuXHJcblx0XHR0aGlzLndyaXRlQnVmZmVyID0gdGhpcy5yZW5kZXJUYXJnZXQxO1xyXG5cdFx0dGhpcy5yZWFkQnVmZmVyID0gdGhpcy5yZW5kZXJUYXJnZXQyO1xyXG5cclxuXHRcdHZhciBtYXNrQWN0aXZlID0gZmFsc2U7XHJcblxyXG5cdFx0dmFyIHBhc3MsIGksIGlsID0gdGhpcy5wYXNzZXMubGVuZ3RoO1xyXG5cclxuXHRcdGZvciAoIGkgPSAwOyBpIDwgaWw7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRwYXNzID0gdGhpcy5wYXNzZXNbIGkgXTtcclxuXHJcblx0XHRcdGlmICggISBwYXNzLmVuYWJsZWQgKSBjb250aW51ZTtcclxuXHJcblx0XHRcdHBhc3MucmVuZGVyKCB0aGlzLnJlbmRlcmVyLCB0aGlzLndyaXRlQnVmZmVyLCB0aGlzLnJlYWRCdWZmZXIsIGRlbHRhLCBtYXNrQWN0aXZlICk7XHJcblxyXG5cdFx0XHRpZiAoIHBhc3MubmVlZHNTd2FwICkge1xyXG5cclxuXHRcdFx0XHRpZiAoIG1hc2tBY3RpdmUgKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGNvbnRleHQgPSB0aGlzLnJlbmRlcmVyLmNvbnRleHQ7XHJcblxyXG5cdFx0XHRcdFx0Y29udGV4dC5zdGVuY2lsRnVuYyggY29udGV4dC5OT1RFUVVBTCwgMSwgMHhmZmZmZmZmZiApO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuY29weVBhc3MucmVuZGVyKCB0aGlzLnJlbmRlcmVyLCB0aGlzLndyaXRlQnVmZmVyLCB0aGlzLnJlYWRCdWZmZXIsIGRlbHRhICk7XHJcblxyXG5cdFx0XHRcdFx0Y29udGV4dC5zdGVuY2lsRnVuYyggY29udGV4dC5FUVVBTCwgMSwgMHhmZmZmZmZmZiApO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRoaXMuc3dhcEJ1ZmZlcnMoKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggcGFzcyBpbnN0YW5jZW9mIFRIUkVFLk1hc2tQYXNzICkge1xyXG5cclxuXHRcdFx0XHRtYXNrQWN0aXZlID0gdHJ1ZTtcclxuXHJcblx0XHRcdH0gZWxzZSBpZiAoIHBhc3MgaW5zdGFuY2VvZiBUSFJFRS5DbGVhck1hc2tQYXNzICkge1xyXG5cclxuXHRcdFx0XHRtYXNrQWN0aXZlID0gZmFsc2U7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRyZXNldDogZnVuY3Rpb24gKCByZW5kZXJUYXJnZXQgKSB7XHJcblxyXG5cdFx0aWYgKCByZW5kZXJUYXJnZXQgPT09IHVuZGVmaW5lZCApIHtcclxuXHJcblx0XHRcdHJlbmRlclRhcmdldCA9IHRoaXMucmVuZGVyVGFyZ2V0MS5jbG9uZSgpO1xyXG5cclxuXHRcdFx0dmFyIHBpeGVsUmF0aW8gPSB0aGlzLnJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKTtcclxuXHJcblx0XHRcdHJlbmRlclRhcmdldC53aWR0aCAgPSBNYXRoLmZsb29yKCB0aGlzLnJlbmRlcmVyLmNvbnRleHQuY2FudmFzLndpZHRoICAvIHBpeGVsUmF0aW8gKTtcclxuXHRcdFx0cmVuZGVyVGFyZ2V0LmhlaWdodCA9IE1hdGguZmxvb3IoIHRoaXMucmVuZGVyZXIuY29udGV4dC5jYW52YXMuaGVpZ2h0IC8gcGl4ZWxSYXRpbyApO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldDEuZGlzcG9zZSgpO1xyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXQxID0gcmVuZGVyVGFyZ2V0O1xyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXQyLmRpc3Bvc2UoKTtcclxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0MiA9IHJlbmRlclRhcmdldC5jbG9uZSgpO1xyXG5cclxuXHRcdHRoaXMud3JpdGVCdWZmZXIgPSB0aGlzLnJlbmRlclRhcmdldDE7XHJcblx0XHR0aGlzLnJlYWRCdWZmZXIgPSB0aGlzLnJlbmRlclRhcmdldDI7XHJcblxyXG5cdH0sXHJcblxyXG5cdHNldFNpemU6IGZ1bmN0aW9uICggd2lkdGgsIGhlaWdodCApIHtcclxuXHJcblx0XHR0aGlzLnJlbmRlclRhcmdldDEuc2V0U2l6ZSggd2lkdGgsIGhlaWdodCApO1xyXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXQyLnNldFNpemUoIHdpZHRoLCBoZWlnaHQgKTtcclxuXHJcblx0fVxyXG5cclxufTtcclxuIiwiLyoqXHJcbiogQGF1dGhvciBhbHRlcmVkcSAvIGh0dHA6Ly9hbHRlcmVkcXVhbGlhLmNvbS9cclxuKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVEhSRUUuTWFza1Bhc3MgPSBmdW5jdGlvbiAoIHNjZW5lLCBjYW1lcmEgKSB7XHJcblxyXG4gIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcclxuXHJcbiAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuICB0aGlzLmNsZWFyID0gdHJ1ZTtcclxuICB0aGlzLm5lZWRzU3dhcCA9IGZhbHNlO1xyXG5cclxuICB0aGlzLmludmVyc2UgPSBmYWxzZTtcclxuXHJcbn07XHJcblxyXG5USFJFRS5NYXNrUGFzcy5wcm90b3R5cGUgPSB7XHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24gKCByZW5kZXJlciwgd3JpdGVCdWZmZXIsIHJlYWRCdWZmZXIsIGRlbHRhICkge1xyXG5cclxuICAgIHZhciBjb250ZXh0ID0gcmVuZGVyZXIuY29udGV4dDtcclxuXHJcbiAgICAvLyBkb24ndCB1cGRhdGUgY29sb3Igb3IgZGVwdGhcclxuXHJcbiAgICBjb250ZXh0LmNvbG9yTWFzayggZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UgKTtcclxuICAgIGNvbnRleHQuZGVwdGhNYXNrKCBmYWxzZSApO1xyXG5cclxuICAgIC8vIHNldCB1cCBzdGVuY2lsXHJcblxyXG4gICAgdmFyIHdyaXRlVmFsdWUsIGNsZWFyVmFsdWU7XHJcblxyXG4gICAgaWYgKCB0aGlzLmludmVyc2UgKSB7XHJcblxyXG4gICAgICB3cml0ZVZhbHVlID0gMDtcclxuICAgICAgY2xlYXJWYWx1ZSA9IDE7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIHdyaXRlVmFsdWUgPSAxO1xyXG4gICAgICBjbGVhclZhbHVlID0gMDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29udGV4dC5lbmFibGUoIGNvbnRleHQuU1RFTkNJTF9URVNUICk7XHJcbiAgICBjb250ZXh0LnN0ZW5jaWxPcCggY29udGV4dC5SRVBMQUNFLCBjb250ZXh0LlJFUExBQ0UsIGNvbnRleHQuUkVQTEFDRSApO1xyXG4gICAgY29udGV4dC5zdGVuY2lsRnVuYyggY29udGV4dC5BTFdBWVMsIHdyaXRlVmFsdWUsIDB4ZmZmZmZmZmYgKTtcclxuICAgIGNvbnRleHQuY2xlYXJTdGVuY2lsKCBjbGVhclZhbHVlICk7XHJcblxyXG4gICAgLy8gZHJhdyBpbnRvIHRoZSBzdGVuY2lsIGJ1ZmZlclxyXG5cclxuICAgIHJlbmRlcmVyLnJlbmRlciggdGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHJlYWRCdWZmZXIsIHRoaXMuY2xlYXIgKTtcclxuICAgIHJlbmRlcmVyLnJlbmRlciggdGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHdyaXRlQnVmZmVyLCB0aGlzLmNsZWFyICk7XHJcblxyXG4gICAgLy8gcmUtZW5hYmxlIHVwZGF0ZSBvZiBjb2xvciBhbmQgZGVwdGhcclxuXHJcbiAgICBjb250ZXh0LmNvbG9yTWFzayggdHJ1ZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSApO1xyXG4gICAgY29udGV4dC5kZXB0aE1hc2soIHRydWUgKTtcclxuXHJcbiAgICAvLyBvbmx5IHJlbmRlciB3aGVyZSBzdGVuY2lsIGlzIHNldCB0byAxXHJcblxyXG4gICAgY29udGV4dC5zdGVuY2lsRnVuYyggY29udGV4dC5FUVVBTCwgMSwgMHhmZmZmZmZmZiApOyAgLy8gZHJhdyBpZiA9PSAxXHJcbiAgICBjb250ZXh0LnN0ZW5jaWxPcCggY29udGV4dC5LRUVQLCBjb250ZXh0LktFRVAsIGNvbnRleHQuS0VFUCApO1xyXG5cclxuICB9XHJcblxyXG59O1xyXG5cclxuXHJcblRIUkVFLkNsZWFyTWFza1Bhc3MgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIHRoaXMuZW5hYmxlZCA9IHRydWU7XHJcblxyXG59O1xyXG5cclxuVEhSRUUuQ2xlYXJNYXNrUGFzcy5wcm90b3R5cGUgPSB7XHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24gKCByZW5kZXJlciwgd3JpdGVCdWZmZXIsIHJlYWRCdWZmZXIsIGRlbHRhICkge1xyXG5cclxuICAgIHZhciBjb250ZXh0ID0gcmVuZGVyZXIuY29udGV4dDtcclxuXHJcbiAgICBjb250ZXh0LmRpc2FibGUoIGNvbnRleHQuU1RFTkNJTF9URVNUICk7XHJcblxyXG4gIH1cclxuXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBAYXV0aG9yIGFsdGVyZWRxIC8gaHR0cDovL2FsdGVyZWRxdWFsaWEuY29tL1xyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVEhSRUUuUmVuZGVyUGFzcyA9IGZ1bmN0aW9uICggc2NlbmUsIGNhbWVyYSwgb3ZlcnJpZGVNYXRlcmlhbCwgY2xlYXJDb2xvciwgY2xlYXJBbHBoYSApIHtcclxuXHJcblx0dGhpcy5zY2VuZSA9IHNjZW5lO1xyXG5cdHRoaXMuY2FtZXJhID0gY2FtZXJhO1xyXG5cclxuXHR0aGlzLm92ZXJyaWRlTWF0ZXJpYWwgPSBvdmVycmlkZU1hdGVyaWFsO1xyXG5cclxuXHR0aGlzLmNsZWFyQ29sb3IgPSBjbGVhckNvbG9yO1xyXG5cdHRoaXMuY2xlYXJBbHBoYSA9ICggY2xlYXJBbHBoYSAhPT0gdW5kZWZpbmVkICkgPyBjbGVhckFscGhhIDogMTtcclxuXHJcblx0dGhpcy5vbGRDbGVhckNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKCk7XHJcblx0dGhpcy5vbGRDbGVhckFscGhhID0gMTtcclxuXHJcblx0dGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuXHR0aGlzLmNsZWFyID0gdHJ1ZTtcclxuXHR0aGlzLm5lZWRzU3dhcCA9IGZhbHNlO1xyXG5cclxufTtcclxuXHJcblRIUkVFLlJlbmRlclBhc3MucHJvdG90eXBlID0ge1xyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uICggcmVuZGVyZXIsIHdyaXRlQnVmZmVyLCByZWFkQnVmZmVyLCBkZWx0YSApIHtcclxuXHJcblx0XHR0aGlzLnNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgPSB0aGlzLm92ZXJyaWRlTWF0ZXJpYWw7XHJcblxyXG5cdFx0aWYgKCB0aGlzLmNsZWFyQ29sb3IgKSB7XHJcblxyXG5cdFx0XHR0aGlzLm9sZENsZWFyQ29sb3IuY29weSggcmVuZGVyZXIuZ2V0Q2xlYXJDb2xvcigpICk7XHJcblx0XHRcdHRoaXMub2xkQ2xlYXJBbHBoYSA9IHJlbmRlcmVyLmdldENsZWFyQWxwaGEoKTtcclxuXHJcblx0XHRcdHJlbmRlcmVyLnNldENsZWFyQ29sb3IoIHRoaXMuY2xlYXJDb2xvciwgdGhpcy5jbGVhckFscGhhICk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJlbmRlcmVyLnJlbmRlciggdGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHJlYWRCdWZmZXIsIHRoaXMuY2xlYXIgKTtcclxuXHJcblx0XHRpZiAoIHRoaXMuY2xlYXJDb2xvciApIHtcclxuXHJcblx0XHRcdHJlbmRlcmVyLnNldENsZWFyQ29sb3IoIHRoaXMub2xkQ2xlYXJDb2xvciwgdGhpcy5vbGRDbGVhckFscGhhICk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2NlbmUub3ZlcnJpZGVNYXRlcmlhbCA9IG51bGw7XHJcblxyXG5cdH1cclxuXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBAYXV0aG9yIGFsdGVyZWRxIC8gaHR0cDovL2FsdGVyZWRxdWFsaWEuY29tL1xyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVEhSRUUuU2hhZGVyUGFzcyA9IGZ1bmN0aW9uICggc2hhZGVyLCB0ZXh0dXJlSUQgKSB7XHJcblxyXG5cdHRoaXMudGV4dHVyZUlEID0gKCB0ZXh0dXJlSUQgIT09IHVuZGVmaW5lZCApID8gdGV4dHVyZUlEIDogXCJ0RGlmZnVzZVwiO1xyXG5cclxuXHR0aGlzLnVuaWZvcm1zID0gVEhSRUUuVW5pZm9ybXNVdGlscy5jbG9uZSggc2hhZGVyLnVuaWZvcm1zICk7XHJcblxyXG5cdHRoaXMubWF0ZXJpYWwgPSBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoIHtcclxuXHJcblx0XHRkZWZpbmVzOiBzaGFkZXIuZGVmaW5lcyB8fCB7fSxcclxuXHRcdHVuaWZvcm1zOiB0aGlzLnVuaWZvcm1zLFxyXG5cdFx0dmVydGV4U2hhZGVyOiBzaGFkZXIudmVydGV4U2hhZGVyLFxyXG5cdFx0ZnJhZ21lbnRTaGFkZXI6IHNoYWRlci5mcmFnbWVudFNoYWRlclxyXG5cclxuXHR9ICk7XHJcblxyXG5cdHRoaXMucmVuZGVyVG9TY3JlZW4gPSBmYWxzZTtcclxuXHJcblx0dGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuXHR0aGlzLm5lZWRzU3dhcCA9IHRydWU7XHJcblx0dGhpcy5jbGVhciA9IGZhbHNlO1xyXG5cclxuXHJcblx0dGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuT3J0aG9ncmFwaGljQ2FtZXJhKCAtIDEsIDEsIDEsIC0gMSwgMCwgMSApO1xyXG5cdHRoaXMuc2NlbmUgID0gbmV3IFRIUkVFLlNjZW5lKCk7XHJcblxyXG5cdHRoaXMucXVhZCA9IG5ldyBUSFJFRS5NZXNoKCBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSggMiwgMiApLCBudWxsICk7XHJcblx0dGhpcy5zY2VuZS5hZGQoIHRoaXMucXVhZCApO1xyXG5cclxufTtcclxuXHJcblRIUkVFLlNoYWRlclBhc3MucHJvdG90eXBlID0ge1xyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uICggcmVuZGVyZXIsIHdyaXRlQnVmZmVyLCByZWFkQnVmZmVyLCBkZWx0YSApIHtcclxuXHJcblx0XHRpZiAoIHRoaXMudW5pZm9ybXNbIHRoaXMudGV4dHVyZUlEIF0gKSB7XHJcblxyXG5cdFx0XHR0aGlzLnVuaWZvcm1zWyB0aGlzLnRleHR1cmVJRCBdLnZhbHVlID0gcmVhZEJ1ZmZlcjtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5xdWFkLm1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbDtcclxuXHJcblx0XHRpZiAoIHRoaXMucmVuZGVyVG9TY3JlZW4gKSB7XHJcblxyXG5cdFx0XHRyZW5kZXJlci5yZW5kZXIoIHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhICk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdHJlbmRlcmVyLnJlbmRlciggdGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEsIHdyaXRlQnVmZmVyLCB0aGlzLmNsZWFyICk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59O1xyXG4iLCJ2YXIgaW50ID0gcmVxdWlyZSgnLi9saWIvaW50Jyk7XHJcblxyXG52YXIgRWZmZWN0Q29tcG9zZXIgPSByZXF1aXJlKCcuL3Byb2Nlc3NpbmcvZWZmZWN0Y29tcG9zZXInKTtcclxudmFyIE1hc2tQYXNzID0gcmVxdWlyZSgnLi9wcm9jZXNzaW5nL21hc2twYXNzJyk7XHJcbnZhciBSZW5kZXJQYXNzID0gcmVxdWlyZSgnLi9wcm9jZXNzaW5nL3JlbmRlcnBhc3MnKTtcclxudmFyIFNoYWRlclBhc3MgPSByZXF1aXJlKCcuL3Byb2Nlc3Npbmcvc2hhZGVycGFzcycpO1xyXG52YXIgQ29weVNoYWRlciA9IHJlcXVpcmUoJy4vc2hhZGVycy9jb3B5c2hhZGVyJyk7XHJcbnZhciBSR0JTaGlmdFNoYWRlciA9IHJlcXVpcmUoJy4vc2hhZGVycy9yZ2JzaGlmdCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTY2VuZTtcclxuXHJcbmZ1bmN0aW9uIFNjZW5lKG11c2ljKSB7XHJcbiAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FudmFzJyk7XHJcbiAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAwLjEsIDEwMDApO1xyXG4gIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSAyNzU7XHJcbiAgdGhpcy5jYW1lcmEubG9va0F0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcclxuXHJcbiAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xyXG5cclxuICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe1xyXG4gICAgYWxwaGE6IHRydWUsXHJcbiAgICBjYW52YXM6IHRoaXMuY2FudmFzXHJcbiAgfSk7XHJcbiAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG5cclxuICB0aGlzLmNpcmNsZSA9IFtdO1xyXG4gIHRoaXMuZ2VvbWV0cnkgPSBbXTtcclxuICB0aGlzLmdlb21ldHJ5U2xlZXZlID0gW107XHJcbiAgdGhpcy5nZW9tZXRyeUxpc3QgPSBbXHJcbiAgICBuZXcgVEhSRUUuVGV0cmFoZWRyb25HZW9tZXRyeSg1MCwgMCksXHJcbiAgICBuZXcgVEhSRUUuSWNvc2FoZWRyb25HZW9tZXRyeSg0MCwgMCksXHJcbiAgICBuZXcgVEhSRUUuT2N0YWhlZHJvbkdlb21ldHJ5KDQwLCAwKVxyXG4gIF07XHJcblxyXG4gIHRoaXMuY29tcG9zZXIgPSBuZXcgRWZmZWN0Q29tcG9zZXIodGhpcy5yZW5kZXJlcik7XHJcblxyXG4gIHRoaXMubW91c2UgPSB7XHJcbiAgICB4OiAwLFxyXG4gICAgeTogMFxyXG4gIH07XHJcblxyXG4gIHRoaXMubXVzaWMgPSBtdXNpYztcclxuXHJcbiAgdGhpcy5jbGlja2VkID0gZmFsc2U7XHJcbn1cclxuXHJcblNjZW5lLkdFT01FVFJZX0xFTkdUSCA9IDEwMDtcclxuXHJcblNjZW5lLnByb3RvdHlwZS5jcmVhdGVHZW9tZXRyeSA9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciBudW1iZXIgPSBpbnQoMCwgdGhpcy5nZW9tZXRyeUxpc3QubGVuZ3RoIC0gMSk7XHJcblxyXG4gIHRoaXMuY2lyY2xlID0gbmV3IFRIUkVFLk9iamVjdDNEKCk7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgU2NlbmUuR0VPTUVUUllfTEVOR1RIOyBpKyspIHtcclxuICAgIHRoaXMuZ2VvbWV0cnlbaV0gPSBuZXcgVEhSRUUuTWVzaChcclxuICAgICAgdGhpcy5nZW9tZXRyeUxpc3RbbnVtYmVyXSxcclxuICAgICAgbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHtcclxuICAgICAgICBjb2xvcjogMHhGRkZGRkYsXHJcbiAgICAgICAgd2lyZWZyYW1lOiB0cnVlXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuZ2VvbWV0cnlbaV0ucG9zaXRpb24ueSA9IDEwMDtcclxuXHJcbiAgICB0aGlzLmdlb21ldHJ5U2xlZXZlW2ldID0gbmV3IFRIUkVFLk9iamVjdDNEKCk7XHJcbiAgICB0aGlzLmdlb21ldHJ5U2xlZXZlW2ldLmFkZCh0aGlzLmdlb21ldHJ5W2ldKTtcclxuICAgIHRoaXMuZ2VvbWV0cnlTbGVldmVbaV0ucm90YXRpb24ueiA9IGkgKiAoMzYwIC8gU2NlbmUuR0VPTUVUUllfTEVOR1RIKSAqIE1hdGguUEkgLyAxODA7XHJcblxyXG4gICAgdGhpcy5jaXJjbGUuYWRkKHRoaXMuZ2VvbWV0cnlTbGVldmVbaV0pO1xyXG4gIH1cclxuXHJcbiAgdGhpcy5zY2VuZS5hZGQodGhpcy5jaXJjbGUpO1xyXG59O1xyXG5cclxuU2NlbmUucHJvdG90eXBlLmNyZWF0ZUxpZ2h0ID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIGxpZ2h0O1xyXG5cclxuICBsaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4RkZGRkZGLCAxKTtcclxuICBsaWdodC5wb3NpdGlvbi5zZXQoMSwgMSwgMSk7XHJcblxyXG4gIHRoaXMuc2NlbmUuYWRkKGxpZ2h0KTtcclxuXHJcbiAgbGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweEZGRkZGRiwgMSk7XHJcbiAgbGlnaHQucG9zaXRpb24uc2V0KC0xLCAtMSwgMSk7XHJcblxyXG4gIHRoaXMuc2NlbmUuYWRkKGxpZ2h0KTtcclxufTtcclxuXHJcblNjZW5lLnByb3RvdHlwZS5jcmVhdGVTaGFkZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIGVmZmVjdDtcclxuXHJcbiAgdGhpcy5jb21wb3Nlci5hZGRQYXNzKG5ldyBSZW5kZXJQYXNzKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKSk7XHJcblxyXG4gIGVmZmVjdCA9IG5ldyBTaGFkZXJQYXNzKFJHQlNoaWZ0U2hhZGVyKTtcclxuICBlZmZlY3QudW5pZm9ybXNbJ2Ftb3VudCddLnZhbHVlID0gMC4wNTtcclxuICBlZmZlY3QucmVuZGVyVG9TY3JlZW4gPSB0cnVlO1xyXG5cclxuICB0aGlzLmNvbXBvc2VyLmFkZFBhc3MoZWZmZWN0KTtcclxuXHJcbiAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xyXG5cclxuICB0aGlzLmVmZmVjdCA9IGVmZmVjdDtcclxufTtcclxuXHJcblNjZW5lLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gIGlmICh0aGlzLmNsaWNrZWQpIHtcclxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLmVmZmVjdC51bmlmb3Jtc1snYW1vdW50J10sIDEsIHtcclxuICAgICAgdmFsdWU6IDAuMDA1XHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuZWZmZWN0LnVuaWZvcm1zWydhbW91bnQnXSwgMSwge1xyXG4gICAgICB2YWx1ZTogdGhpcy5tb3VzZS54IC8gd2luZG93LmlubmVyV2lkdGhcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBTY2VuZS5HRU9NRVRSWV9MRU5HVEg7IGkrKykge1xyXG4gICAgdmFyIHZhbHVlID0gMTtcclxuXHJcbiAgICBpZiAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KSB7XHJcbiAgICAgIHZhbHVlID0gKCh0aGlzLm11c2ljLmdldEZyZXF1ZW5jeSgpW2ldIC8gMjU2KSAqIDIuNSkgKyAwLjAxO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmNsaWNrZWQpIHtcclxuICAgICAgVHdlZW5MaXRlLnRvKHRoaXMuZ2VvbWV0cnlbaV0uc2NhbGUsIC4xLCB7XHJcbiAgICAgICAgeDogdmFsdWUsXHJcbiAgICAgICAgeTogdmFsdWUsXHJcbiAgICAgICAgejogdmFsdWVcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoaSAlIDIgPT0gMCkge1xyXG4gICAgICAgIFR3ZWVuTGl0ZS50byh0aGlzLmdlb21ldHJ5W2ldLnJvdGF0aW9uLCAuMSwge1xyXG4gICAgICAgICAgejogXCIrPSAwLjFcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIFR3ZWVuTGl0ZS50byh0aGlzLmdlb21ldHJ5W2ldLnJvdGF0aW9uLCAuMSwge1xyXG4gICAgICAgICAgejogXCItPSAwLjFcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBUd2VlbkxpdGUudG8odGhpcy5nZW9tZXRyeVtpXS5zY2FsZSwgLjEsIHtcclxuICAgICAgICB6OiB2YWx1ZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRoaXMuY2lyY2xlLnJvdGF0aW9uLnogKz0gMC4wMTtcclxuXHJcbiAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xyXG5cclxuICB0aGlzLmNvbXBvc2VyLnJlbmRlcigpO1xyXG59O1xyXG5cclxuU2NlbmUucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xyXG4gIHRoaXMuY2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcclxuXHJcbiAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG59O1xyXG5cclxuU2NlbmUucHJvdG90eXBlLm1vdXNlbW92ZSA9IGZ1bmN0aW9uKGUpIHtcclxuICB0aGlzLm1vdXNlLnggPSBlLmNsaWVudFggLSB3aW5kb3cuaW5uZXJXaWR0aCAvIDI7XHJcbiAgdGhpcy5tb3VzZS55ID0gZS5jbGllbnRZIC0gd2luZG93LmlubmVySGVpZ2h0IC8gMjtcclxufTtcclxuXHJcblNjZW5lLnByb3RvdHlwZS5jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGlmICh0aGlzLmNsaWNrZWQpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgU2NlbmUuR0VPTUVUUllfTEVOR1RIOyBpKyspIHtcclxuICAgICAgVHdlZW5MaXRlLnRvKHRoaXMuZ2VvbWV0cnlbaV0uc2NhbGUsIDEsIHtcclxuICAgICAgICB4OiAxLFxyXG4gICAgICAgIHk6IDEsXHJcbiAgICAgICAgejogMVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIFR3ZWVuTGl0ZS50byh0aGlzLmdlb21ldHJ5W2ldLnJvdGF0aW9uLCAxLCB7XHJcbiAgICAgICAgeDogMCxcclxuICAgICAgICB5OiAwLFxyXG4gICAgICAgIHo6IDBcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBUd2VlbkxpdGUudG8odGhpcy5nZW9tZXRyeVtpXS5wb3NpdGlvbiwgMSwge1xyXG4gICAgICAgIHg6IDAsXHJcbiAgICAgICAgeTogMTAwLFxyXG4gICAgICAgIHo6IDBcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jbGlja2VkID0gZmFsc2U7XHJcbiAgfSBlbHNlIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgU2NlbmUuR0VPTUVUUllfTEVOR1RIOyBpKyspIHtcclxuICAgICAgVHdlZW5MaXRlLnRvKHRoaXMuZ2VvbWV0cnlbaV0ucm90YXRpb24sIDEsIHtcclxuICAgICAgICB4OiBpbnQoMCwgTWF0aC5QSSksXHJcbiAgICAgICAgeTogaW50KDAsIE1hdGguUEkpLFxyXG4gICAgICAgIHo6IGludCgwLCBNYXRoLlBJKVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIFR3ZWVuTGl0ZS50byh0aGlzLmdlb21ldHJ5W2ldLnBvc2l0aW9uLCAxLCB7XHJcbiAgICAgICAgeDogXCIrPSBcIiArIGludCgtMTAwMCwgMTAwMCksXHJcbiAgICAgICAgeTogXCIrPSBcIiArIGludCgtMTAwMCwgMTAwMCksXHJcbiAgICAgICAgejogXCIrPSBcIiArIGludCgtNTAwLCAtMjUwKVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNsaWNrZWQgPSB0cnVlO1xyXG4gIH1cclxufTtcclxuIiwiLyoqXHJcbiAqIEBhdXRob3IgYWx0ZXJlZHEgLyBodHRwOi8vYWx0ZXJlZHF1YWxpYS5jb20vXHJcbiAqXHJcbiAqIEZ1bGwtc2NyZWVuIHRleHR1cmVkIHF1YWQgc2hhZGVyXHJcbiAqL1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUSFJFRS5Db3B5U2hhZGVyID0ge1xyXG4gIHVuaWZvcm1zOiB7XHJcbiAgICBcInREaWZmdXNlXCI6IHsgdHlwZTogXCJ0XCIsIHZhbHVlOiBudWxsIH0sXHJcbiAgICBcIm9wYWNpdHlcIjogIHsgdHlwZTogXCJmXCIsIHZhbHVlOiAxLjAgfVxyXG4gIH0sXHJcbiAgdmVydGV4U2hhZGVyOiBbXHJcbiAgICBcInZhcnlpbmcgdmVjMiB2VXY7XCIsXHJcbiAgICBcInZvaWQgbWFpbigpIHtcIixcclxuICAgIFwidlV2ID0gdXY7XCIsXHJcbiAgICBcImdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQoIHBvc2l0aW9uLCAxLjAgKTtcIixcclxuICAgIFwifVwiXHJcbiAgXS5qb2luKCBcIlxcblwiICksXHJcbiAgZnJhZ21lbnRTaGFkZXI6IFtcclxuICAgIFwidW5pZm9ybSBmbG9hdCBvcGFjaXR5O1wiLFxyXG4gICAgXCJ1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcIixcclxuICAgIFwidmFyeWluZyB2ZWMyIHZVdjtcIixcclxuICAgIFwidm9pZCBtYWluKCkge1wiLFxyXG4gICAgXCJ2ZWM0IHRleGVsID0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdlV2ICk7XCIsXHJcbiAgICBcImdsX0ZyYWdDb2xvciA9IG9wYWNpdHkgKiB0ZXhlbDtcIixcclxuICAgIFwifVwiXHJcbiAgXS5qb2luKCBcIlxcblwiIClcclxufTtcclxuIiwiLyoqXHJcbiogQGF1dGhvciBmZWxpeHR1cm5lciAvIGh0dHA6Ly9haXJ0aWdodC5jYy9cclxuKlxyXG4qIFJHQiBTaGlmdCBTaGFkZXJcclxuKiBTaGlmdHMgcmVkIGFuZCBibHVlIGNoYW5uZWxzIGZyb20gY2VudGVyIGluIG9wcG9zaXRlIGRpcmVjdGlvbnNcclxuKiBQb3J0ZWQgZnJvbSBodHRwOi8va3Jpc3MuY3gvdG9tLzIwMDkvMDUvcmdiLXNoaWZ0L1xyXG4qIGJ5IFRvbSBCdXR0ZXJ3b3J0aCAvIGh0dHA6Ly9rcmlzcy5jeC90b20vXHJcbipcclxuKiBhbW91bnQ6IHNoaWZ0IGRpc3RhbmNlICgxIGlzIHdpZHRoIG9mIGlucHV0KVxyXG4qIGFuZ2xlOiBzaGlmdCBhbmdsZSBpbiByYWRpYW5zXHJcbiovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRIUkVFLlJHQlNoaWZ0U2hhZGVyID0ge1xyXG4gIHVuaWZvcm1zOiB7XHJcbiAgICBcInREaWZmdXNlXCI6IHsgdHlwZTogXCJ0XCIsIHZhbHVlOiBudWxsIH0sXHJcbiAgICBcImFtb3VudFwiOiAgIHsgdHlwZTogXCJmXCIsIHZhbHVlOiAwLjAwNSB9LFxyXG4gICAgXCJhbmdsZVwiOiAgICB7IHR5cGU6IFwiZlwiLCB2YWx1ZTogMC4wIH1cclxuICB9LFxyXG4gIHZlcnRleFNoYWRlcjogW1xyXG4gICAgXCJ2YXJ5aW5nIHZlYzIgdlV2O1wiLFxyXG4gICAgXCJ2b2lkIG1haW4oKSB7XCIsXHJcbiAgICBcInZVdiA9IHV2O1wiLFxyXG4gICAgXCJnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KCBwb3NpdGlvbiwgMS4wICk7XCIsXHJcbiAgICBcIn1cIlxyXG4gIF0uam9pbihcIlxcblwiKSxcclxuICBmcmFnbWVudFNoYWRlcjogW1xyXG4gICAgXCJ1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcIixcclxuICAgIFwidW5pZm9ybSBmbG9hdCBhbW91bnQ7XCIsXHJcbiAgICBcInVuaWZvcm0gZmxvYXQgYW5nbGU7XCIsXHJcbiAgICBcInZhcnlpbmcgdmVjMiB2VXY7XCIsXHJcbiAgICBcInZvaWQgbWFpbigpIHtcIixcclxuICAgIFwidmVjMiBvZmZzZXQgPSBhbW91bnQgKiB2ZWMyKCBjb3MoYW5nbGUpLCBzaW4oYW5nbGUpKTtcIixcclxuICAgIFwidmVjNCBjciA9IHRleHR1cmUyRCh0RGlmZnVzZSwgdlV2ICsgb2Zmc2V0KTtcIixcclxuICAgIFwidmVjNCBjZ2EgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdik7XCIsXHJcbiAgICBcInZlYzQgY2IgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZVdiAtIG9mZnNldCk7XCIsXHJcbiAgICBcImdsX0ZyYWdDb2xvciA9IHZlYzQoY3IuciwgY2dhLmcsIGNiLmIsIGNnYS5hKTtcIixcclxuICAgIFwifVwiXHJcbiAgXS5qb2luKFwiXFxuXCIpXHJcbn07XHJcbiJdfQ==
