const zoomFactor = 0.8

export class View {
  constructor(pixelsPerSquare) {
    this.initialPixelsPerSquare = pixelsPerSquare;
    this.pixelsPerSquare = pixelsPerSquare;
    this.topLeftX = 10;
    this.topLeftY = 10;
  }
}

export function draw(canvas, view, drawing) {
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.fillRect(view.topLeftX, view.topLeftY, drawing.width * view.pixelsPerSquare, drawing.height * view.pixelsPerSquare);

  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;

  for(let y = 0; y < drawing.height + 1; y++) {
    let y1 = y * view.pixelsPerSquare + view.topLeftY;
    let x1 = 0 + view.topLeftX;
    let x2 = drawing.width * view.pixelsPerSquare + view.topLeftX;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y1);
    ctx.stroke(); 
  }

  for(let x = 0; x < drawing.width + 1; x++) {
    let x1 = x * view.pixelsPerSquare + view.topLeftX;
    let y1 = 0 + view.topLeftY;
    let y2 = drawing.height * view.pixelsPerSquare + view.topLeftY;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1, y2);
    ctx.stroke(); 
  }

  drawing.squares.forEach(square => {
    let x = square.x * view.pixelsPerSquare + view.topLeftX;
    let y = square.y * view.pixelsPerSquare + view.topLeftY;

    ctx.fillStyle = "black";
    ctx.fillRect(x, y, view.pixelsPerSquare, view.pixelsPerSquare);
  });
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

export function pixelToSquareXY(view, xy) {
  let x = Math.floor((xy[0] - view.topLeftX) / view.pixelsPerSquare);
  let y = Math.floor((xy[1] - view.topLeftY) / view.pixelsPerSquare);
  return [x, y]
}