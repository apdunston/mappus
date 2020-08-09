export class Drawing {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.squares = new Array();
  }
}

export function toggleSquare(drawing, x, y) {
 var square = drawing.squares.find(square => square.x == x && square.y == y); 
 square.value = !square.value;
}