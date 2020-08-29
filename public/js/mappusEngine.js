import {View, draw, zoomOut, zoomIn, resetZoom} from "./models/view.js";
import {cloneDrawing, toggleSquare, setSquare} from "./models/drawing.js";
import {init as initMouse} from "./mouse.js";
import {init as initToolbar} from "./toolbar.js";
import {Drawing} from "./models/drawing.js";

var toolbarWidth = 100;

export var global = {
  drawing: new Drawing(540, 540),
  history: new Array(),
  future: new Array(),
  mode: "draw",
  dragAdds: true,
  canvas: null,
  view: null,
  dragActive: null,
  dragStartX: null,
  dragStartY: null,
  dragStartTopLeftX: null,
  dragStartTopLeftY: null,
  lineStartX: null,
  lineStartY: null,
  lineEndX: null,
  lineEndY: null,
  mouseX: null,
  mouseY: null,
};

export function toggle(x, y) {
  if (!global.canvas) {
    throw "You must initialize MappusEngine with a document that has a canvas before calling toggle.";
  }

  toggleSquare(global.drawing, x, y);
  draw(global.view, global.drawing);
}

export function init(document) {
  initToolbar(global, document);
  var canvas = document.getElementById("main");
  global.canvas = canvas;
  global.view = new View(canvas, 20);

  setCanvasSize()
  draw(global.view, global.drawing);

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

    draw(global.view, global.drawing);
  }

  function clickCallback(_x, _y, _modifierKey)  {
  }

  function setCanvasSize() {
    var ctx = global.canvas.getContext("2d");
    ctx.canvas.width  = window.innerWidth - toolbarWidth;
    ctx.canvas.height = window.innerHeight;  
  }

  // initMouse(canvas, global, dragStartCallback, dragCallback, dragEndCallback, clickCallback);
  initMouse(global);
  document.addEventListener("keypress", keyboardCallback);
}


export function fullSizeCanvas() {
  var ctx = global.canvas.getContext("2d");
  ctx.canvas.width  = global.drawing.width * global.view.pixelsPerSquare + 20;
  ctx.canvas.height = global.drawing.height * global.view.pixelsPerSquare + 20;
  global.view.topLeftX = 10;
  global.view.topLeftY = 10;
  draw(global.view, global.drawing);
}

export function addHistory() {
  global.history.push(cloneDrawing(global.drawing));
  global.future = new Array();  
}