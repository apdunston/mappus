import {pixelToSquareXY} from "./models/view.js";
import {squareExistsAt} from "./models/drawing.js";
import {toggle, addHistory} from "./mappusEngine.js";
import {draw} from "./models/view.js";
import {setSquare} from "./models/drawing.js";
import {squaresBetween} from "./geometry.js";
import {labelModal} from "./toolbar.js";


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

    global.dragActive = true;
    global.dragStartX = x;
    global.dragStartY = y;
    global.dragStartTopLeftX = global.view.topLeftX;
    global.dragStartTopLeftY = global.view.topLeftY;

    if (!modifierKey) {
      let xy = pixelToSquareXY(global.view, [x, y]);
      global.dragAdds = !squareExistsAt(global.drawing, xy[0], xy[1])

      if (global.mode == "draw") {
        addHistory();
        toggle(xy[0], xy[1]);
      } else if (global.mode == "label") {
        labelModal(xy[0], xy[1]);
      } else if (global.mode == "fill") {
        addHistory();
        fillFrom(xy[0], xy[1]);
      } else if (global.mode == "line") {
        if (global.lineStartX) {
          addHistory();

          // Set line
          squaresBetween(global.lineStartX, global.lineStartY, 
                global.lineEndX, global.lineEndY).forEach(xy => {
            setSquare(global.drawing, xy[0], xy[1], true);
          })

          global.lineStartX = null;
          global.lineStartY = null;
          global.lineEndX = null;
          global.lineEndY = null;
        } else {
          global.lineStartX = xy[0];
          global.lineStartY = xy[1];
        }
      }

      draw(global.view, global.drawing);
    }
  }

  function fillFrom(x, y, checked) {
    console.log("fill-checking");

    if (checked === undefined) {
      checked = [];
    }

    if (checked[x] === undefined) {
      checked[x] = [];
    }

    if (checked[x][y]) {
      return;
    }

    checked[x][y] = true;

    if (x < 0 || y < 0 || x >= global.drawing.width || y >= global.drawing.width ||
        global.dragAdds == squareExistsAt(global.drawing, x, y)) {
      return;      
    }

    setSquare(global.drawing, x, y, global.dragAdds);

    fillFrom(x - 1, y, checked);
    fillFrom(x, y - 1, checked);
    fillFrom(x + 1, y, checked);
    fillFrom(x, y + 1, checked);
  }

  function drag(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    let xy = pixelToSquareXY(global.view, [x, y]);
    global.mouseX = xy[0];
    global.mouseY = xy[1];

    if (global.mode == "line" && global.lineStartX != null) {
      global.lineEndX = xy[0];
      global.lineEndY = xy[1];
      draw(global.view, global.drawing);
    }

    if (global.dragActive) {

      let modifierKey = checkModifierKey(e);

      if (modifierKey) {
        global.view.topLeftX = global.dragStartTopLeftX - global.dragStartX + x;
        global.view.topLeftY = global.dragStartTopLeftY - global.dragStartY + y;
      } else if (global.mode == "draw") {
        x = xy[0];
        y = xy[1];
        setSquare(global.drawing, x, y, global.dragAdds);
      }
    }
    
    draw(global.view, global.drawing);
  }

  function dragEnd(_e) {
    global.dragActive = false;
  }
}

