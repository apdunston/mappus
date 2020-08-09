import {zoomIn, zoomOut, drawView} from "./models/view.js";

var canvas;
var view;

export function init(document, inputCanvas, inputView) {
  canvas = inputCanvas;
  view = inputView;
  document.addEventListener("keypress", keyboardCallback);
}

function keyboardCallback(e) {
  if(e.key == "-") {
    view = zoomOut(view);
    drawView(canvas, view);
  }

  if (e.key == "=") {
    view = zoomIn(view);
    drawView(canvas, view);
  }

  if (e.key == "0") {
    view = resetZoom(view);
    drawView(canvas, view);
  }
}