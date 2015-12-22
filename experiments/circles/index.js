(function() {
  var COLORS = ['#A561FF', '#FD72AD', '#FCCE9E', '#CFE3FF'];

  var particles = [];

  var Particle = function(x, y) {
    this.alive = true;
    this.angle = random(0, 360);
    this.color = random(COLORS);
    this.radius = random(0, 100);
    this.vy = cos(this.angle);
    this.vx = sin(this.angle);
    this.x = x;
    this.y = y;
  }

  Particle.prototype.update = function() {
    this.alive = this.radius > 0.25;
    this.radius *= 0.9;
    this.x += this.vx * 1;
    this.y += this.vy * 1;
  };

  Particle.prototype.render = function() {
    sketch.globalAlpha = 1;
    sketch.beginPath();
    sketch.arc(this.x, this.y, this.radius, 0, TWO_PI);
    sketch.fillStyle = 'transparent';
    sketch.fill();
    sketch.strokeStyle = this.color;
    sketch.stroke();
  };

  sketch = Sketch.create();

  sketch.draw = function() {
    for (i = 0; i < particles.length; i++) {
      particles[i].render();
    }
  };

  sketch.mousemove = function() {
    for (var i = 0; i < 4; i++) {
      particles.push(new Particle(sketch.mouse.x, sketch.mouse.y));
    }

    for (var i = 0; i < particles.length; i++) {
      particles[i].render();
    }
  };

  sketch.update = function() {
    for (var i = 0; i < particles.length; i++) {
      if (particles[i]) {
        var particle = particles[i];

        if (particle.alive) {
          particle.update()
        }
        else {
          particles.splice(i, 1);
        }
      }
    }
  };

  sketch.clear = function() {
    sketch.globalAlpha = 0.5;
    sketch.fillStyle = '#000';
    sketch.fillRect(0, 0, sketch.width, sketch.height);
  };
})();
