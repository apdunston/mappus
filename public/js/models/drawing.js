export class Drawing {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.squares = [];
  }
}

export function toggleSquare(drawing, x, y) {
  // Stay in bounds
  if (x < 0 || y < 0 || x >= drawing.width || y >= drawing.height) {
    return drawing;
  }

  if (drawing.squares[x] == undefined) {
    drawing.squares[x] = [];
  }

  drawing.squares[x][y] = !drawing.squares[x][y];
}

export function setSquare(drawing, x, y, val) {
  if (drawing.squares[x] == undefined) {drawing.squares[x] = []}
  drawing.squares[x][y] = val;
}

export function squareExistsAt(drawing, x, y) {
  if (drawing.squares[x] == undefined) { drawing.squares[x] = []};
  return drawing.squares[x][y] == true;
}

export function cloneDrawing(drawing) {
  let newDrawing = new Drawing(drawing.width, drawing.height);
  newDrawing.squares = [];

  for (let x = 0; x < drawing.width; x++) {
    newDrawing.squares[x] = [];

    for (let y = 0; y < drawing.height; y++) {
      newDrawing.squares[x][y] = drawing.squares[x][y];
    }
  }

  return newDrawing;
}