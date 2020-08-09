// import {canvasToImage} from './otherPeoplesCode/canvas-to-image.js';
import {View, draw, zoomOut, zoomIn, resetZoom, pixelToSquareXY} from "./models/view.js";
import {toggleSquare, squareExistsAt} from "./models/drawing.js";
import {init as initMouse} from "./mouse.js";
import {Drawing} from "./models/drawing.js";

export var global = {
  view: new View(20),
  drawing: new Drawing(540, 540)
};

export function toggle(x, y) {
  if (!global.canvas) {
    throw "You must initialize MappusEngine with a document that has a canvas before calling toggle.";
  }

  global.drawing = toggleSquare(global.drawing, x, y);
  draw(global.canvas, global.view, global.drawing);
}

export function init(document) {
  var canvas = document.getElementById("main");
  global.canvas = canvas;

  var ctx = canvas.getContext("2d");
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  draw(canvas, global.view, global.drawing);

  var dragAdds = true;

  function keyboardCallback(e) {
    if(e.key == "-") {
      global.view = zoomOut(global.view);
      console.log(global.view.pixelsPerSquare);
    }

    if (e.key == "=") {
      global.view = zoomIn(global.view);
    }

    if (e.key == "0") {
      global.view = resetZoom(global.view);
    }

    draw(canvas, global.view, global.drawing);
  }
  
  function dragStartCallback(x, y, modifierKey) {
    if (!modifierKey) {
      let xy = pixelToSquareXY(global.view, [x, y]);
      dragAdds = !squareExistsAt(global.drawing, xy[0], xy[1])
      toggle(xy[0], xy[1]);
    }
  }

  function dragCallback(x, y, modifierKey) {
    if (modifierKey) {
      global.view.topLeftX = x;
      global.view.topLeftY = y;
    } else {
      let xy = pixelToSquareXY(global.view, [x, y]);
      x = xy[0];
      y = xy[1];
      let exists = squareExistsAt(global.drawing, x, y);

      if (dragAdds != exists) {
        toggle(x, y);
      }
    }

    draw(canvas, global.view, global.drawing);
  }

  function clickCallback(x, y, modifierKey)  {
    // if (!modifierKey) {
    //   global.view = acceptClick(global.view, x, y);
    //   draw(canvas, global.view, global.drawing);
    // }
  }

  initMouse(canvas, global.view, dragStartCallback, dragCallback, clickCallback);
  document.addEventListener("keypress", keyboardCallback);

  // canvasToImage("main", document, {
  //   name: 'myImage',
  //   type: 'png',
  //   quality: 1
  // });
}