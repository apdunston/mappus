const zoomFactor = 0.8

export class View {
  constructor(canvas, pixelsPerSquare) {
    this.initialPixelsPerSquare = pixelsPerSquare;
    this.pixelsPerSquare = pixelsPerSquare;
    this.topLeftX = 10;
    this.topLeftY = 10;
    this.canvas = canvas;
  }
}

export function draw(view, drawing) {
  let canvas = view.canvas;
  var ctx = canvas.getContext("2d");

  // Canvas background
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Drawing background
  ctx.fillStyle = "white";
  ctx.fillRect(view.topLeftX, view.topLeftY, drawing.width * view.pixelsPerSquare, drawing.height * view.pixelsPerSquare);

  drawGrid(ctx, view, drawing);


  // Squares
  drawing.squares.forEach(square => {
    let x = square[0] * view.pixelsPerSquare + view.topLeftX;
    let y = square[1] * view.pixelsPerSquare + view.topLeftY;

    ctx.fillStyle = "black";
    ctx.fillRect(x, y, view.pixelsPerSquare, view.pixelsPerSquare);
  });
}

function newTopLeftXY(view, newPixelsPerSquare) {
  console.log(view.canvas.width, view.canvas.height, view.topLeftX, view.topLeftY, view.pixelsPerSquare);

  // Translate that to the location on the drawing in pixels
  let x1 = (view.canvas.width / 2) - view.topLeftX;
  let y1 = (view.canvas.height / 2) - view.topLeftY;
  console.log("translation", x1, y1);
  
  // Do the translation again
  let x2 = x1 / view.pixelsPerSquare * newPixelsPerSquare;
  let y2 = y1 / view.pixelsPerSquare * newPixelsPerSquare;
  console.log("translation", x2, y2);

  // Add the difference to topleft
  return [view.topLeftX + x1 - x2, view.topLeftY + y1 - y2];
}

export function zoomIn(view) {
  view = Object.assign({}, view);

  if (view.pixelsPerSquare < 100) {
    let newPPS = Math.ceil(view.pixelsPerSquare * (2 - zoomFactor));
    let xy = newTopLeftXY(view, newPPS);
    view.pixelsPerSquare = newPPS;
    view.topLeftX = xy[0];
    view.topLeftY = xy[1];
  }

  return view;
}

export function zoomOut(view) {
  view = Object.assign({}, view);
  
  if (view.pixelsPerSquare > 1) {
    let newPPS = Math.floor(view.pixelsPerSquare * zoomFactor);
    let xy = newTopLeftXY(view, newPPS);
    view.pixelsPerSquare = newPPS;
    view.topLeftX = xy[0];
    view.topLeftY = xy[1];
  }

  return view;
}

export function resetZoom(view) {
  view = Object.assign({}, view);
  
  let xy = newTopLeftXY(view, view.initialPixelsPerSquare);
  view.pixelsPerSquare = view.initialPixelsPerSquare;
  view.topLeftX = xy[0];
  view.topLeftY = xy[1];

  return view;
}

export function pixelToSquareXY(view, xy) {
  let x = Math.floor((xy[0] - view.topLeftX) / view.pixelsPerSquare);
  let y = Math.floor((xy[1] - view.topLeftY) / view.pixelsPerSquare);
  return [x, y]
}

function drawGrid(ctx, view, drawing) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 0.2;


  // Grid
  var steps = 1;
  
  if (view.pixelsPerSquare == 1) {
    steps = 25;
    ctx.setLineDash([2, 3]); // dashes, spaces
  } else if (view.pixelsPerSquare < 3) {
    steps = 15;
    ctx.setLineDash([4, 5]); // dashes, spaces
  } else if (view.pixelsPerSquare < 5) {    steps =  10;
    ctx.setLineDash([5, 3]); // dashes, spaces
  } else if (view.pixelsPerSquare < 9) {
    steps = 10;
    ctx.setLineDash([6, 3]); // dashes, spaces
  } else {    
    ctx.setLineDash([1, 0]); // dashes, spaces
  }
  
  if (steps > 1) {    
  } else {
    ctx.setLineDash([1, 0])
  }

  for(let y = 0; y < drawing.height + 1; y += steps) {
    let y1 = y * view.pixelsPerSquare + view.topLeftY;
    let x1 = 0 + view.topLeftX;
    let x2 = drawing.width * view.pixelsPerSquare + view.topLeftX;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y1);
    ctx.stroke(); 
  }

  for(let x = 0; x < drawing.width + 1; x += steps) {
    let x1 = x * view.pixelsPerSquare + view.topLeftX;
    let y1 = 0 + view.topLeftY;
    let y2 = drawing.height * view.pixelsPerSquare + view.topLeftY;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1, y2);
    ctx.stroke(); 
  }
}
