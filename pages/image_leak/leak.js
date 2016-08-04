var $ = function(id) {
  return document.getElementById(id);
};

var LOG = function(msg) {
  var logDiv = $('log');
  logDiv.innerText += '\n' + msg;
};

var loadImage = function(src, callback) {
  var img = new Image();
  img.onerror = function() {
    console.error('Could not load icon \'' + src + '\'.');
  };
  img.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    var canvas_context = canvas.getContext('2d');
    canvas_context.clearRect(0, 0, canvas.width, canvas.height);
    canvas_context.drawImage(img, 0, 0, canvas.width, canvas.height);
    var imageData = canvas_context.getImageData(0, 0, canvas.width,
                                                canvas.height);
    callback.call(null, imageData);
  };
  img.src = src;
};

var callbackCount = 0;
var TOTAL;
var loadImageDoneCallback = function(imageData) {
  ++callbackCount;
  if (callbackCount >= TOTAL) {
    LOG('Done');
  }
};

var imageIdx = 0;
var loadImageFunc = function() {
  console.log('loadImageFunc');
  var src = imageIdx == 0 ? 'a.png' : 'b.png';
  loadImage(src, loadImageDoneCallback);
  imageIdx = 1 - imageIdx;
};

var count = 0;
var repeater = function(fun, intervalSize) {
  if (++count > TOTAL) return;
  fun();
  setTimeout(function() {
    repeater(fun, intervalSize);
  }, intervalSize);
};

var testButton = $('test');
testButton.onclick = function() {
  count = 0;
  callbackCount = 0;
  TOTAL = 300;
  repeater(loadImageFunc, 10);
};
