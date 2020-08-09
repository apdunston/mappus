import {canvasToImage} from './otherPeoplesCode/canvas-to-image.js';
import {toggleSquare} from "./models/drawing.js";
import {View, drawView, zoomOut, zoomIn, resetZoom, acceptClick} from "./models/view.js";
import {init as initMouse} from "./mouse.js";
import {init as initKeyboard} from "./keyboard.js";

var global = {
  view: new View(50)
};

global.view.drawing = toggleSquare(global.view.drawing, 2, 2);
global.view.drawing = toggleSquare(global.view.drawing, 4, 4);

var canvas = document.getElementById("main");
var ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
drawView(canvas, global.view);

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
    global.view = resetZoom(global.view);
    drawView(canvas, global.view);
  }
}

function dragCallback(x, y, modifierKey) {
  if (modifierKey) {
    global.view.topLeftX = x;
    global.view.topLeftY = y;
    drawView(canvas, global.view);
  }
}

function clickCallback(x, y, modifierKey)  {
  if (!modifierKey) {
    global.view = acceptClick(global.view, x, y);
    drawView(canvas, global.view);
  }
}

initMouse(canvas, global.view, dragCallback, clickCallback);
initKeyboard(document, canvas, global.view, keyboardCallback);


// canvasToImage("main", document, {
//   name: 'myImage',
//   type: 'png',
//   quality: 1
// });
 