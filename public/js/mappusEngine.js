// import {canvasToImage} from './otherPeoplesCode/canvas-to-image.js';
import {View, drawView, zoomOut, zoomIn, resetZoom, acceptClick} from "./models/view.js";
import {toggleSquare} from "./models/drawing.js";
import {init as initMouse} from "./mouse.js";
import {init as initKeyboard} from "./keyboard.js";

export var global = {
  view: new View(20)
};

export function toggle(x, y) {
  if (!global.canvas) {
    throw "You must initialize MappusEngine with a document that has a canvas before calling toggle.";
  }

  global.view.drawing = toggleSquare(global.view.drawing, x, y);
  drawView(global.canvas, global.view);
}

export function init(document) {
  var canvas = document.getElementById("main");
  global.canvas = canvas;

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
    } else {
      global.view = acceptClick(global.view, x, y);
    }

    drawView(canvas, global.view);
  }

  function clickCallback(x, y, modifierKey)  {
    // if (!modifierKey) {
    //   global.view = acceptClick(global.view, x, y);
    //   drawView(canvas, global.view);
    // }
  }

  initMouse(canvas, global.view, dragCallback, clickCallback);
  initKeyboard(document, canvas, global.view, keyboardCallback);


  // canvasToImage("main", document, {
  //   name: 'myImage',
  //   type: 'png',
  //   quality: 1
  // });
}