var game = (function () {
  return {
    // player
    player: {
      pos: [0, 0],
      size: [60, 60],
      posField: [50, 50],
      speedField: 100
    },
    // array enemies
    enemies: [],
    // enemy params
    enemy: {
      pos: [0, 0],
      size: [60, 60],
      posField: [0, 0],
      speedField: 30
    },
    // array cookies
    cookies: [],
    // cookie params
    cookie: {
      pos: [0, 0],
      size: [20, 20],
      posField: [50, 50]
    },
    // how long game start
    gameTime: 0,
    isGameOver: false,
    // Field background
    imgFieldPattern: 'img/terrain.png',
    //reset button
    battonPlayAgain: null,
    // score
    score: 0
  };
})();