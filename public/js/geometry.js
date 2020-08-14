// https://www.redblobgames.com/grids/line-drawing.html

export function squaresBetween(x1, y1, x2, y2) {
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

