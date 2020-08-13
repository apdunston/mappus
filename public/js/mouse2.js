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
      let xy = pixelToSquareXY(global.view, [x, y]);
      global.dragAdds = !squareExistsAt(global.drawing, xy[0], xy[1])
      toggle(xy[0], xy[1]);
    }
  }

  function drag(e) {
    if (!global.dragActive) {return;}

    let x = e.offsetX;
    let y = e.offsetY;
    let modifierKey = checkModifierKey(e);

    console.log("x", x, y, modifierKey);
    if (modifierKey) {
      global.view.topLeftX = global.dragStartTopLeftX - global.dragStartX + x;
      global.view.topLeftY = global.dragStartTopLeftY - global.dragStartY + y;
    } else {
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

