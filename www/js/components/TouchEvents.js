var TouchEvents = {
    click: "ontouchstart" in window ? "touchstart" : "click",
    move: "ontouchstart" in window ? "touchmove" : "mousemove",
    start: "ontouchstart" in window ? "touchstart" : "mousedown",
    end: "ontouchstart" in window ? "touchend" : "mouseup"
};

module.exports = TouchEvents;