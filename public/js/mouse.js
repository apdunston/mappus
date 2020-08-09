//https://www.kirupa.com/html5/drag.htm

var view;

export function init(container, inputView, dragCallback, clickCallback) {
  var container = document.querySelector("#main");
  view = inputView;
  var xOffset = view.topLeftX;
  var yOffset = view.topLeftY;

  var active = false;
  var currentX;
  var currentY;
  var initialX;
  var initialY;

  container.addEventListener("click", e => {
    clickCallback(e.clientX - xOffset, e.clientY - yOffset);
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
    if (e.type === "touchstart") {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }

    active = true;
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

      xOffset = currentX;
      yOffset = currentY;

      dragCallback(currentX, currentY);
    }
  }
}