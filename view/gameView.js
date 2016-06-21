(function () {
  Myapp.views.GameView = GameView;

  function GameView(ctx) {
    this.ctx = ctx;
    this.gameOverEl = document.getElementById('game-over');
    this.scoreEl = document.getElementById('score');
    this.scoreOver = document.getElementById('score-over');
  }

  /**
   * Transform canvas for placing an object on the screen
   * @param entity
   */
  GameView.prototype.renderEntity = function (entity) {
    this.ctx.save();
    this.ctx.translate(entity.posField[0], entity.posField[1]);
    entity.render(this.ctx);
    this.ctx.restore();
  };

  /**
   * Render entities
   * @param list
   */
  GameView.prototype.renderEntities = function (list) {
    for (i = 0; i < list.length; i++) {
      this.renderEntity(list[i]);
    }
  };

  /**
   * Show background
   * @param fieldPattern
   * @param canvas
   */
  GameView.prototype.renderBackground = function (fieldPattern, canvas) {
    this.ctx.fillStyle = fieldPattern;
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  /**
   * Reset game
   */
  GameView.prototype.reset = function () {
    this.gameOverEl.style.display = 'none';
    this.scoreEl.style.display = 'block';
  };

  /**
   * End Game
   * @param score
   */
  GameView.prototype.endGame = function (score) {
    this.scoreEl.style.display = 'none';
    this.gameOverEl.style.display = 'block';
    this.scoreOver.innerHTML = score;
  };

  GameView.prototype.showScore = function(score) {
    this.scoreEl.innerHTML = score;
  }

})();