import { Square } from "./square.js";

export class Drawing {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.squares = new Array();
  }
}

export function toggleSquare(drawing, x, y) {
 drawing = Object.assign({}, drawing);
 let squareIndex = drawing.squares.findIndex(square => square.x == x && square.y == y); 

 if (squareIndex == -1) {
  drawing.squares.push(new Square(x, y));
 } else {
  drawing.squares.splice(squareIndex, 1);
 }

 return drawing;
}

export function squareExistsAt(drawing, x, y) {
  return drawing.squares.findIndex(square => square.x == x && square.y == y) != -1;
}