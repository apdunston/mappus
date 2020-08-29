// https://www.redblobgames.com/grids/line-drawing.html

export function squaresBetween(x1, y1, x2, y2) {
  // return firstTry(x1, y1, x2, y2);
  // return secondTry(x1, y1, x2, y2);
  return lerpAlgorithm(x1, y1, x2, y2);
}

function lerpAlgorithm(x1, y1, x2, y2) {
  var points = [];
  var N = diagonal_distance(x1, y1, x2, y2);

  for (var step = 0; step <= N; step++) {
      var t = N == 0 ? 0.0 : step / N;
      points.push(round_point(lerp_point(x1, y1, x2, y2, t)));
  }
  
  return points;
}

function diagonal_distance(x1, y1, x2, y2) {
  var dx = x2 - x1, 
    dy = y2 - y1;
  return Math.max(Math.abs(dx), Math.abs(dy));
}

function round_point(xy) {
  return [Math.round(xy[0]), Math.round(xy[1])];
}

function lerp_point(x1, y1, x2, y2, t) {
  return [lerp(x1, x2, t),
          lerp(y1, y2, t)];
}

function lerp(start, end, t) {
  return start + t * (end-start);
}



// The below code is unused. I'm keeping it for demonstration purposes.
// How not-to solve this problem. ;)

function secondTry(x1, y1, x2, y2) {
  let a = [x1, y1];
  let b = [x2, y2];
  let list = [a, b];
  let aNext = true;

  while (!samsies(a,b)) {
    let x = Math.abs(a[0] - b[0]);
    let y = Math.abs(a[1] - b[1]);

    if (aNext) {
      a = getC(a, b, x, y);
      list.push(a);
    } else {
      b = getC(b, a, x, y);
      list.push(b);
    }

    aNext = !aNext;
  }

  return list;
}

function getC(first, second, xDiff, yDiff) {
  let c = [first[0], first[1]];

  if (xDiff >= yDiff) {
    getCIndex(c, first, second, 0);
  } 
  
  if (xDiff <= yDiff) {
    getCIndex(c, first, second, 1);
  } 

  return c;
}

function getCIndex(c, first, second, index) {
  if (first[index] > second[index]) {
    c[index] = first[index] - 1;
  } else {
    c[index] = first[index] + 1;
  }
}

function firstTry(x1, y1, x2, y2) {
  let a = [x1, y1];
  let b = [x2, y2];
  let list = [a, b];
  let aNext = true;

  while (!samsies(a,b)) {
    if (aNext) {
      let c = [a[0], a[1]];

      if (a[0] > b[0]) {c[0] = a[0] - 1}
      if (a[0] < b[0]) {c[0] = a[0] + 1}
      if (a[1] > b[1]) {c[1] = a[1] - 1}
      if (a[1] < b[1]) {c[1] = a[1] + 1}
      list.push(c);
      a = c;
    } else {
      let c = [b[0], b[1]];

      if (b[0] > a[0]) {c[0] = b[0] - 1}
      if (b[0] < a[0]) {c[0] = b[0] + 1}
      if (b[1] > a[1]) {c[1] = b[1] - 1}
      if (b[1] < a[1]) {c[1] = b[1] + 1}
      list.push(c);
      b = c
    }

    aNext = !aNext;
  }

  console.log(list);
  return list;
}

function samsies(a, b) {return a[0] == b[0] && a[1] == b[1]}