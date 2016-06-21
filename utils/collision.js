(function () {
  Myapp.utils.collision = collision;

  function collision(position, size, secondPosition, secondSize) {
    return !((position[0] + size[0]) <= secondPosition[0] || position[0] > (secondPosition[0] + secondSize[0]) ||
    (position[1] + size[1]) <= secondPosition[1] || position[1] > (secondPosition[1] + secondSize[1]));
  }

})();
