import {Drawing} from "./drawing.js";

const zoomFactor = 0.8

export class View {
  constructor(pixelsPerSquare) {
    this.initialPixelsPerSquare = pixelsPerSquare;
    this.pixelsPerSquare = pixelsPerSquare;
    this.topLeftX = -10;
    this.topLeftY = -10;
    this.drawing = new Drawing(40, 20);
  }
}

export function drawView(canvas, view) {
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = null;

  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;

  for(let y = 0; y < view.drawing.height + 1; y++) {
    let y1 = y * view.pixelsPerSquare - view.topLeftY;
    let x1 = 0 - view.topLeftX;
    let x2 = view.drawing.width * view.pixelsPerSquare - view.topLeftX;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y1);
    ctx.stroke(); 
  }

  for(let x = 0; x < view.drawing.width + 1; x++) {
    let x1 = x * view.pixelsPerSquare - view.topLeftX;
    let y1 = 0 - view.topLeftY;
    let y2 = view.drawing.height * view.pixelsPerSquare - view.topLeftY;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1, y2);
    ctx.stroke(); 
  }
}

export function zoomOut(view) {
  view = Object.assign({}, view);
  
  if (view.pixelsPerSquare > 1) {
    view.pixelsPerSquare = Math.floor(view.pixelsPerSquare * zoomFactor);
  }
  
  return view;
}

export function zoomIn(view) {
  view = Object.assign({}, view);

  if (view.pixelsPerSquare < 100) {
    view.pixelsPerSquare = Math.ceil(view.pixelsPerSquare * (2 - zoomFactor));
  }

  return view;
}

export function resetZoom(view) {
  view = Object.assign({}, view);
  view.pixelsPerSquare = view.initialPixelsPerSquare;
  return view;
}