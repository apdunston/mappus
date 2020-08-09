import {canvasToImage} from './otherPeoplesCode/canvas-to-image.js';
import {Square} from "./models/square.js";
import {Drawing, toggleSquare} from "./models/drawing.js";
import {View, drawView, zoomOut, zoomIn, resetZoom} from "./models/view.js";
import {init as initDrag} from "./drag.js";
import {init as initKeyboard} from "./keyboard.js";

var global = {
  view: new View(50)
};

var canvas = document.getElementById("main");
var ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
drawView(canvas, global.view);

function dragCallback(x, y) {
  global.view.topLeftX = -x;
  global.view.topLeftY = -y;
  drawView(canvas, global.view);
}

function keyboardCallback(e) {
  if(e.key == "-") {
    global.view = zoomOut(global.view);
    drawView(canvas, global.view);
  }

  if (e.key == "=") {
    global.view = zoomIn(global.view);
    drawView(canvas, global.view);
  }

  if (e.key == "0") {
    view = resetZoom(global.view);
    drawView(canvas, global.view);
  }
}

initDrag(canvas, global.view, dragCallback);
initKeyboard(document, canvas, global.view, keyboardCallback);


// canvasToImage("main", document, {
//   name: 'myImage',
//   type: 'png',
//   quality: 1
// });
 