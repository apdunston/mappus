export class Drawing {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.squares = new Array();
  }
}

export function toggleSquare(drawing, x, y) {
  drawing = Object.assign({}, drawing);

  // Stay in bounds
  if (x < 0 || y < 0 || x >= drawing.width || y >= drawing.height) {
    return drawing;
  }

 let squareIndex = drawing.squares.findIndex(xy => xy[0] == x && xy[1] == y); 

 if (squareIndex == -1) {
  drawing.squares.push([x, y]);
 } else {
  drawing.squares.splice(squareIndex, 1);
 }

 return drawing;
}

export function squareExistsAt(drawing, x, y) {
  return drawing.squares.findIndex(xy => xy[0] == x && xy[1] == y) != -1;
}

export function cloneDrawing(drawing) {
  let newDrawing = new Drawing(drawing.width, drawing.height);
  drawing.squares.forEach(xy => newDrawing.squares.push(xy));
  return newDrawing;
}