(function gameController() {
  var canvas = new Myapp.utils.Canvas(),
    ctx = canvas.ctx,
    lastTime,
    view = new Myapp.views.GameView(ctx),
    input = new Myapp.utils.Input(),
    playerObject = new Myapp.models.GameObject(),
    pacman = new Myapp.models.Pacman(game.player),
    enemy = new Myapp.models.Enemy(game.enemy),
    cookie = new Myapp.models.Cookie(game.cookie),
    j,
    i;

    canvas.setSize(700, 500);
    canvas.add();

  /**
   * Random number
   * @param a
   * @param b
   * @returns {number}
   */
  function rand(a, b) {
    return Math.floor(Math.random() * b + a);
  }

  /**
   * Reset Game
   */
  function resetGame() {
    // Hide elem
    view.reset();

    game.isGameOver = false;
    game.gameTime = 0;
    game.score = 0;
    game.enemies = [];
    game.cookies = [];
    // set the position of cookie
    cookie.posField = [rand(0, canvas.width - cookie.size[0]), rand(0, canvas.height - cookie.size[1])];
    game.cookies.push(cookie);
    // set the position of enemy
    enemy.posField = [rand(0, canvas.width - cookie.size[0]), 0];
    game.enemies.push(enemy);
    // set the position of pacman
    playerObject.posField = [canvas.width / 2, canvas.height / 2];
    playerObject.speedField = game.player.speedField;
    pacman.posField = playerObject.posField;
    // set the event press on keyboard
    document.addEventListener('keydown', function(event) {
      input.setKey(event.keyCode, true);
    });
    document.addEventListener('keyup', function(event) {
      input.setKey(event.keyCode, false);
    });
  }

  /**
   * End game
   */
  function gameOver() {
    game.isGameOver = true;
    view.endGame(game.score);
  }

  /**
   * Check Collision
   */
  function checkCollisions() {
    for (i = 0; i < game.enemies.length; i++) {
      for (j = 0; j < game.cookies.length; j++) {
        //Check  player and cookies collision
        if (Myapp.utils.collision(game.cookies[j].posField, game.cookies[j].size, pacman.posField, pacman.size)) {
          // Remove the enemy
          game.cookies.splice(j, 1);
          j--;
          // Add score
          game.score += 10;
        }
      }

      if (Myapp.utils.collision(game.enemies[i].posField, game.enemies[i].size, pacman.posField, pacman.size)) {
        // Caught ghosts
        gameOver();
      }
    }
  }

  /**
   * Update position of entities and collisions
   * @param dt
   */
  function updateGame(dt) {
    game.gameTime += dt;
    //
    playerObject.move(dt, input);
    // Move pacman after pick on keyboard
    pacman.move(dt, playerObject);
    // Update enemies
    for (i = 0; i < game.enemies.length; i++) {
      game.enemies[i].move(dt, playerObject);
    }
    // All cookies are eaten end game
    if (game.cookies.length === 0) {
      gameOver();
    }
    // Appearance cookies
    if (Math.floor(Math.random() * 50 + 1) === 50) {
      //  Add cookie in array cookies
      game.cookie.posField = [rand(0, canvas.width - game.cookie.size[0]), rand(0, canvas.height - game.cookie.size[1])];
      game.cookies.push(new Myapp.models.Cookie(game.cookie));
    }
    // Appearance enemies
    if (Math.floor(Math.random() * 800 + 1) === 800) {
      // Add enemy in array enemies
      game.enemy.posField = [rand(0, canvas.width - game.enemy.size[0]), 0];
      game.enemies.push(new Myapp.models.Enemy(game.enemy));
    }
    // Check collision
    pacman.checkField(canvas);
    checkCollisions();
    // Show score
    view.showScore(game.score);
  }

  /**
   * Render Game
   */
  function renderGame() {
    //Background rendering
    view.renderBackground(fieldPattern, canvas);

    // Render pacman, all cookies and all enemies
    if (!game.isGameOver) {
      view.renderEntity(pacman);
      // cookies
      view.renderEntities(game.cookies);
      // enemies
      view.renderEntities(game.enemies);
    }
  }

  /**
   * Game Loop
   */
  function loopGame() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
    updateGame(dt);
    renderGame();

    lastTime = now;
    requestAnimFrame(loopGame);
  }

  /**
   * Init Game
   */
  function initGame() {
    fieldPattern = ctx.createPattern(resources.get(game.imgFieldPattern), 'repeat');
    // Add event on a button
    game.battonPlayAgain.addEventListener('click', resetGame);
    resetGame();
    lastTime = Date.now();
    loopGame();
  }

  game.battonPlayAgain = document.getElementById('play-again');

  // After loading call Init game
  resources.onReady(initGame);
  // Load files
  resources.load([
    'img/pacman.png',
    'img/cookie.png',
    'img/orange-ghost.png',
    'img/terrain.png'
  ]);
})();
