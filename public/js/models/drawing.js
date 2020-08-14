export class Drawing {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.squares = [];
    this.labels = [];
  }

  export() {
    let exportSquares = [];

    for (let x = 0; x < this.squares.length; x++) {
      console.log("row")
      let row = this.squares[x] || [];

      for (let y = 0; y < row.length; y++) {
        if (row[y]) {exportSquares.push([x, y])}
      }
    }

    return {
      width: this.width,
      height: this.height,
      labels: this.labels,
      squares: exportSquares
    }
  }

  import(input) {
    this.width = input.width;
    this.height = input.height;
    this.labels = input.labels || [];

    input.squares.forEach(xy => setSquare(this, xy[0], xy[1], true));
  }

  // Adds or removes a label
  addLabel(x, y, value) {
    if (value == "") {
      let labelIndex = this.labels.findIndex(l => l.x == x && l.y == y);
      if (labelIndex != -1) {
        this.labels.splice(labelIndex, 1);
      }
    } else {
      this.labels.push({x: x, y: y, value: value});
    }

    this.labels.sort((a, b) => (a.y - b.y) * this.height + (a.x - b.x));
  }

  labelAt(x, y) {
    let label = this.labels.find(l => l.x == x && l.y == y);
    if (label) {
      return label;
    } else {
      return null;
    }
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
  newDrawing.labels = [];

  for (let x = 0; x < drawing.width; x++) {
    newDrawing.squares[x] = [];

    for (let y = 0; y < drawing.height; y++) {
      newDrawing.squares[x][y] = drawing.squares[x][y];
    }
  }

  drawing.labels.forEach(l => {
    newDrawing.addLabel(l.x, l.y, l.value);
  })

  return newDrawing;
}