import {pixelToSquareXY} from "./models/view.js";
import {squareExistsAt} from "./models/drawing.js";
import {toggle} from "./mappusEngine.js";
import {draw} from "./models/view.js";
import {cloneDrawing} from "./models/drawing.js";


export function init(global) {
  let canvas = global.canvas;  
  canvas.addEventListener("touchstart", dragStart, false);
  canvas.addEventListener("touchend", dragEnd, false);
  canvas.addEventListener("touchmove", drag, false);

  canvas.addEventListener("mousedown", dragStart, false);
  canvas.addEventListener("mouseup", dragEnd, false);
  canvas.addEventListener("mouseleave", dragEnd, false);
  canvas.addEventListener("mousemove", drag, false);

  function deltaX(e) { return global.dragStartX + e.offsetX }
  function deltaY(e) { return global.dragStartY + e.offsetY }
  function checkModifierKey(e) { return e.ctrlKey || e.altKey || e.metaKey || e.shiftKey }

  function dragStart(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    let modifierKey = checkModifierKey(e);
    console.log("dragStart", x, y, modifierKey);

    global.dragActive = true;
    global.dragStartX = x;
    global.dragStartY = y;
    global.dragStartTopLeftX = global.view.topLeftX;
    global.dragStartTopLeftY = global.view.topLeftY;

    if (!modifierKey) {
      global.history.push(cloneDrawing(global.drawing));
      global.future = new Array();  

      if (global.mode == "draw") {
        let xy = pixelToSquareXY(global.view, [x, y]);
        global.dragAdds = !squareExistsAt(global.drawing, xy[0], xy[1])
        toggle(xy[0], xy[1]);
      } else if (global.mode == "fill") {
        let xy = pixelToSquareXY(global.view, [x, y]);
        fillFrom(xy[0], xy[1]);
      }

      draw(global.view, global.drawing);
    }
  }

  function fillFrom(x, y, checked, priorX, priorY) {
    if (fillFromPrework(x, y, checked)) {
      fillFrom(x - 1, y, checked);
      fillFrom(x, y - 1, checked);
      fillFrom(x + 1, y, checked);
      fillFrom(x, y + 1, checked);
    }
  }

  function fillFromPrework(x, y, checked, priorX, priorY) {
    if (x == priorX && y == priorY) { return false }
    console.log("checking");

    if (checked === undefined) {
      checked = [];
    }

    if (checked[x] === undefined) {
      checked[x] = [];
    }

    if (checked[x][y]) {
      return false;
    }

    checked[x][y] = true;

    if (x < 0 || y < 0 || x >= global.drawing.width || y >= global.drawing.width ||
        squareExistsAt(global.drawing, x, y)) {
      return false;      
    }

    global.drawing.squares.push([x, y]);
    return true;
  }

  function drag(e) {
    if (!global.dragActive) {return;}

    let x = e.offsetX;
    let y = e.offsetY;
    let modifierKey = checkModifierKey(e);

    if (modifierKey) {
      global.view.topLeftX = global.dragStartTopLeftX - global.dragStartX + x;
      global.view.topLeftY = global.dragStartTopLeftY - global.dragStartY + y;
    } else if (global.mode == "draw") {
      let xy = pixelToSquareXY(global.view, [x, y]);
      x = xy[0];
      y = xy[1];
      let exists = squareExistsAt(global.drawing, x, y);

      if (global.dragAdds != exists) {
        toggle(x, y);
      }
    }

    draw(global.view, global.drawing);
  }

  function dragEnd(_e) {
    global.dragActive = false;
  }
}

