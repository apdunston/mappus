import {zoomIn, zoomOut, drawView} from "./models/view.js";

var canvas;
var view;

export function init(document, inputCanvas, inputView, keyboardCallback) {
  canvas = inputCanvas;
  view = inputView;
  document.addEventListener("keypress", keyboardCallback);
}

