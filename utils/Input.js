(function () {
  Myapp.utils.Input = Input;

  function Input(){
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
  }

  Input.prototype.setKey = function(keyCode, status){
    switch (keyCode){
      case 37:
        this.left = status;
        break;
      case 38:
        this.up = status;
        break;
      case 39:
        this.right = status;
        break;
      case 40:
        this.down = status;
        break;
    }
  };

})();