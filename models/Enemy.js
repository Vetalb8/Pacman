(function () {
    Myapp.models.Enemy = Enemy;

  // Pacman constructor
  function Enemy(opt) {
    // x and y coordinates of a sprite image map
    this.pos = opt.pos;
    // frame Dimensions
    this.size = opt.size;
    // path to image
    this.url = 'img/orange-ghost.png';
    // position on the field
    this.posField = opt.posField;
    // speed in the field
    this.speedField = opt.speedField;
    //
    this.dx = 0;
    this.dy = 0;
  }

  Myapp.utils.extend(Enemy, Myapp.models.GameObject);

  Enemy.prototype.move = function(dt, playerObject){
    this.dx = this.posField[0] - playerObject.posField[0];
    this.dy = this.posField[1] - playerObject.posField[1];
    if (this.dx > 0) {
      this.posField[0] -= dt * this.speedField;
    } else {
      this.posField[0] += dt * this.speedField;
    }
    if (this.dy > 0) {
      this.posField[1] -= dt * this.speedField;
    } else {
      this.posField[1] += dt * this.speedField;
    }
  }
})();
