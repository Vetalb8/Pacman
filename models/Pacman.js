(function () {
    Myapp.models.Pacman = Pacman;

  // Pacman constructor
  function Pacman(opt) {
    // x and y coordinates of a sprite image map
    this.pos = opt.pos;
    // frame Dimensions
    this.size = opt.size;
    // path to image
    this.url = 'img/pacman.png';
    // position on the field
    this.posField = opt.posField;
    // speed in the field
    this.speedField = opt.speedField;
  }

  Myapp.utils.extend(Pacman, Myapp.models.GameObject);

  // Pacman move
  Pacman.prototype.move = function(dt, playerObject) {
      this.posField[0] = playerObject.posField[0];
      this.posField[1] = playerObject.posField[1];
  };

  //Pacman check Field
  Pacman.prototype.checkField = function(canvas){
    if (this.posField[0] < 0) {
      this.posField[0] = 0;
    } else if (this.posField[0] > canvas.width - this.size[0]) {
      this.posField[0] = canvas.width - this.size[0];
    }

    if (this.posField[1] < 0) {
      this.posField[1] = 0;
    } else if (this.posField[1] > canvas.height - this.size[1]) {
      this.posField[1] = canvas.height - this.size[1];
    }
  };

})();
