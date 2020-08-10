import {Modal} from "./otherPeoplesCode/modal.js";
import {draw} from "./models/view.js";

export function init(global, document) {
  var img = document.getElementById("img");
  img.addEventListener("click", function () {
    fullSizeCanvas();
    canvasToImage("main", document, {
      name: 'myImage',
      type: 'png',
      quality: 1
    });
  });
  
  const modal = new Modal(document.querySelector('.modal-overlay'));
  var modalBody = document.getElementById("modal-body");

  var save = document.getElementById("save");
  save.addEventListener("click", _e => {
    modalBody.innerHTML = `<textarea style="width: 300px; height: 200px">${JSON.stringify(global.drawing)}</textarea>`;
    modal.open();
  });

  document.getElementById("load").addEventListener("click", _e => {
    modalBody.innerHTML = `
      <textarea id="load-box" style="width: 300px; height: 200px"></textarea>
      <br>
      <button id="do-load">LOAD</button>
    `;    
    modal.open();
    var doLoad = document.getElementById("do-load");
    doLoad.addEventListener("click", _e => {
      let json = document.getElementById("load-box").value;
      global.drawing = JSON.parse(json);
      draw(global.canvas, global.view, global.drawing);
      modal.close();
    })
  });

  document.getElementById("undo").addEventListener("click", _e => {
    if(global.history.length > 0) {
      global.future.push(global.drawing);
      global.drawing = global.history.pop();
    }

    draw(global.canvas, global.view, global.drawing);
  });

  
  document.getElementById("redo").addEventListener("click", _e => {
    if(global.future.length > 0) {
      global.history.push(global.drawing);
      global.drawing = global.future.pop();
    }

    draw(global.canvas, global.view, global.drawing);
  });

  var drawButton = document.getElementById("draw");
  var rectangleButton = document.getElementById("rectangle");

  drawButton.addEventListener("click", _e => {
    console.log("draw button")
    rectangleButton.disabled = false;
    drawButton.disabled = true;
  });

  rectangleButton.addEventListener("click", _e => {
    console.log("rectangle button")
    drawButton.disabled = false;
    rectangleButton.disabled = true;
  });
}