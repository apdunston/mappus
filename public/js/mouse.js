//https://www.kirupa.com/html5/drag.htm

var view;

export function init(container, inputView, dragStartCallback, dragCallback, dragEndCallback, clickCallback) {
  var container = document.querySelector("#main");
  view = inputView;
  var xOffset = view.topLeftX;
  var yOffset = view.topLeftY;

  var active = false;
  var modifierKey = false;

  var currentX;
  var currentY;
  var initialX;
  var initialY;

  // Mac command key is "meta"
  container.addEventListener("click", e => {
    // console.log(e.button, e.which, e.ctrlKey, e.altKey, e.metaKey, e.shiftKey, e.movementX, e.movementY);  

    clickCallback(e.offsetX, e.offsetY, detectModifierKey(e));
  }, false);


  container.addEventListener("touchstart", dragStart, false);
  container.addEventListener("touchend", dragEnd, false);
  container.addEventListener("touchmove", drag, false);

  container.addEventListener("mousedown", dragStart, false);
  container.addEventListener("mouseup", dragEnd, false);
  container.addEventListener("mouseleave", dragEnd, false);
  container.addEventListener("mousemove", drag, false);

  function dragStart(e) {
    modifierKey = detectModifierKey(e);
    active = true;

    if (modifierKey) {
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }
    } else {
      initialX = e.offsetX;
      initialY = e.offsetY;
    }

    dragStartCallback(initialX, initialY, modifierKey);
  }

  function dragEnd(e) {
    if (modifierKey) {
      initialX = currentX;
      initialY = currentY;
    }

    dragEndCallback(currentX, currentY, modifierKey);
    active = false;
  }

  function drag(e) {
    if (active) {      
      e.preventDefault();
    
      if (modifierKey) {
        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else {
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
        }

        if (modifierKey) {
          xOffset = currentX;
          yOffset = currentY;
        }

        dragCallback(currentX, currentY, modifierKey);
      } else {
        dragCallback(e.offsetX, e.offsetY, modifierKey);
      }
    }
  }

  function detectModifierKey(e) { return e.ctrlKey || e.altKey || e.metaKey || e.shiftKey }
}