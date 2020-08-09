//https://www.kirupa.com/html5/drag.htm

var view;

export function init(container, inputView, dragCallback, clickCallback) {
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

  container.addEventListener("contextmenu", e => {e.preventDefault(); console.log("CONTExt");}, false);

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

    if (e.type === "touchstart") {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }
  }

  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
  }

  function drag(e) {
    if (active) {
    
      e.preventDefault();
    
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
    }
  }

  function detectModifierKey(e) { return e.ctrlKey || e.altKey || e.metaKey || e.shiftKey }
}