import {canvasToImage} from './otherPeoplesCode/canvas-to-image.js';
import {View, draw, zoomOut, zoomIn, resetZoom, pixelToSquareXY} from "./models/view.js";
import {toggleSquare, squareExistsAt} from "./models/drawing.js";
import {init as initMouse} from "./mouse.js";
import {init as initToolbar} from "./toolbar.js";
import {Drawing, cloneDrawing} from "./models/drawing.js";

var toolbarWidth = 100;

export var global = {
  view: new View(20),
  drawing: new Drawing(540, 540),
  history: new Array(),
  future: new Array(),
  mode: "draw"
};

export function toggle(x, y) {
  if (!global.canvas) {
    throw "You must initialize MappusEngine with a document that has a canvas before calling toggle.";
  }

  global.drawing = toggleSquare(global.drawing, x, y);
  draw(global.canvas, global.view, global.drawing);
}

export function init(document) {
  initToolbar(global, document);
  var canvas = document.getElementById("main");
  global.canvas = canvas;

  setCanvasSize()
  draw(global.canvas, global.view, global.drawing);

  var dragAdds = true;

  function keyboardCallback(e) {
    if(e.key == "-") {
      global.view = zoomOut(global.view);
    }

    if (e.key == "=") {
      global.view = zoomIn(global.view);
    }

    if (e.key == "0") {
      global.view = resetZoom(global.view);
    }

    if (e.key == "s" && e.metaKey) {
      e.preventDefault();

    }

    draw(global.canvas, global.view, global.drawing);
  }
  
  function dragStartCallback(x, y, modifierKey) {
    global.history.push(cloneDrawing(global.drawing));
    global.future = new Array();

    if (!modifierKey) {
      let xy = pixelToSquareXY(global.view, [x, y]);
      dragAdds = !squareExistsAt(global.drawing, xy[0], xy[1])
      toggle(xy[0], xy[1]);
    }
  }

  function dragCallback(x, y, modifierKey) {
    if (modifierKey) {
      global.view.topLeftX = x;
      global.view.topLeftY = y;
    } else {
      let xy = pixelToSquareXY(global.view, [x, y]);
      x = xy[0];
      y = xy[1];
      let exists = squareExistsAt(global.drawing, x, y);

      if (dragAdds != exists) {
        toggle(x, y);
      }
    }

    draw(global.canvas, global.view, global.drawing);
  }

  function dragEndCallback(_x, _y, _modifier) {
  }

  function clickCallback(_x, _y, _modifierKey)  {
  }

  function setCanvasSize() {
    var ctx = global.canvas.getContext("2d");
    ctx.canvas.width  = window.innerWidth - toolbarWidth;
    ctx.canvas.height = window.innerHeight;  
  }

  function fullSizeCanvas() {
    var ctx = global.canvas.getContext("2d");
    ctx.canvas.width  = global.drawing.width * global.view.pixelsPerSquare + 20;
    ctx.canvas.height = global.drawing.height * global.view.pixelsPerSquare + 20;
    global.view.topLeftX = 10;
    global.view.topLeftY = 10;
    draw(global.canvas, global.view, global.drawing);
  }

  initMouse(canvas, global.view, dragStartCallback, dragCallback, dragEndCallback, clickCallback);
  document.addEventListener("keypress", keyboardCallback);
}

