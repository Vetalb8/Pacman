(function () {
    // cash images
  var resourceCache = {};
  var loading = [];
  var readyCallbacks = [];

  // Load an image url or an array of image urls
  function load(urlOrArr) {
    if (urlOrArr instanceof Array) {
      urlOrArr.forEach(function (url) {
        _load(url);
      });
    }
    else {
      _load(urlOrArr);
    }
  }

  function _load(url) {
    if (resourceCache[url]) {
      return resourceCache[url];
    }
    else {
        // create new Image
        var img = new Image();
        // After load push image in cash
      img.onload = function () {
          resourceCache[url] = img;

        if (isReady()) {
          readyCallbacks.forEach(function (func) {
            func();
          });
        }
      };
      resourceCache[url] = false;
      img.src = url;
    }
  }

  function get(url) {
    return resourceCache[url];
  }

  function isReady() {
    var ready = true;
    for (var k in resourceCache) {
      if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
        ready = false;
      }
    }
    return ready;
  }
  // create callback after load image
  function onReady(func) {
    readyCallbacks.push(func);
  }
  // return method load and get in global area
  window.resources = {
    load: load,
    get: get,
    onReady: onReady,
    isReady: isReady
  };
})();