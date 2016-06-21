(function () {
  Myapp.utils.Canvas = Canvas;

  function Canvas() {
    this.el = document.createElement('canvas');
    this.width = this.el.width;
    this.height = this.el.height;
    this.ctx = this.el.getContext('2d');
  }

  Canvas.prototype.add = function () {
    this.el.width = this.width;
    this.el.height = this.height;
    this.el.style.border = '2px dotted grey';
    document.body.appendChild(this.el);
  };

  Canvas.prototype.setSize = function (width, height) {
    this.width = width;
    this.height = height;
  };
})();