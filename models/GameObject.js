(function () {
    Myapp.models.GameObject = GameObject;


  function GameObject(url, pos, size, speed, frames, dir, once) {
    // x and y coordinates of a sprite image map
    this.pos = pos;
    // frame Dimensions
    this.size = size;
    //speed animation in frame
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this._index = 0;
    // path to image
    this.url = url;
    //in what direction to move the sprite on the map: 'horizontal (default) or 'vertical'
    this.dir = dir || 'horizontal';
    //one animation cycle, false — default
    this.once = once;
    // position on the field
    this.posField = [];
    // speed in the field
    this.speedField = 0;
  }

  GameObject.prototype = {
    //to update the animation, and the argument he is a delta time
    update: function (dt) {
      this._index += this.speed * dt;
    },
    //для отрисовки себя
    render: function (ctx) {
      var frame;

      if (this.speed > 0) {
        var max = this.frames.length;
        var idx = Math.floor(this._index);
        frame = this.frames[idx % max];

        if (this.once && idx >= max) {
          this.done = true;
          return;
        }
      }
      else {
        frame = 0;
      }


      var x = this.pos[0];
      var y = this.pos[1];

      if (this.dir == 'vertical') {
        y += frame * this.size[1];
      }
      else {
        x += frame * this.size[0];
      }

      ctx.drawImage(resources.get(this.url),
        x, y,
        this.size[0], this.size[1],
        0, 0,
        this.size[0], this.size[1]);
    },
    // move
    move: function(dt, input) {
      if (input.down) {
        this.posField[1] += this.speedField * dt;
      }

      if (input.up) {
        this.posField[1] -= this.speedField * dt;
      }

      if (input.left) {
        this.posField[0] -= this.speedField * dt;
      }

      if (input.right) {
        this.posField[0] += this.speedField * dt;
      }
    }
  };
})();