(function () {
    Myapp.models.Cookie = Cookie;

  // Cookie constructor
  function Cookie(opt) {
    // x and y coordinates of a sprite image map
    this.pos = opt.pos;
    // frame Dimensions
    this.size = opt.size;
    // path to image
    this.url = 'img/cookie.png';
    // position on the field
    this.posField = opt.posField;
  }

  Myapp.utils.extend(Cookie, Myapp.models.GameObject);

})();
