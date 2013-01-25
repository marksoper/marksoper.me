
var mainBike = function() {

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var margin = 20;
  var dim;

  var resize = function() {
    dim = Math.min(window.innerHeight, window.innerWidth) - 2*margin;
    canvas.width  = dim;
    canvas.height = dim;
    canvas.style.top = margin + "px";
    canvas.style.left = Math.max(margin, (window.innerWidth/2 - margin - canvas.width/2)) + "px";
  };
  resize();

  var zeroPadToSix = function(s) {
    while (s.length < 6) s = "0" + s;
    return s;
  };

  var wheelColor = genColorKeywords["chocolate"];
  var bodyColor = genColorKeywords["chocolate"];
  var groundColor = genColorKeywords["darkslategrey"];

  var parts = function() {
    return {
      "ground": {
        shape: new GEN.Stroke(0, dim, dim, 0.93*dim, -Math.PI/12),
        color: groundColor,
        lineWidth: 0.2*dim
      },
      "frontWheel": {
        shape: new GEN.Arc(0.78*dim, 0.66*dim, 0.17*dim, 0, Math.PI * 2),
        color: wheelColor,
        lineWidth: 0.07*dim
      },
      "rearWheel": {
        shape: new GEN.Arc(0.22*dim, 0.69*dim, 0.17*dim, 0, Math.PI * 2),
        color: wheelColor,
        lineWidth: 0.07*dim
      },
      "torso": {
        shape: new GEN.Stroke(0.30*dim, 0.42*dim, 0.65*dim, 0.32*dim, -Math.PI/6),
        color: bodyColor,
        lineWidth: 0.8*dim
      },
      "upperLeg": {
        shape: new GEN.Stroke(0.30*dim, 0.42*dim, 0.6*dim, 0.55*dim, -Math.PI/12),
        color: bodyColor,
        lineWidth: 0.6*dim
      },
      "lowerLeg": {
        shape: new GEN.Stroke(0.6*dim, 0.55*dim, 0.43*dim, 0.66*dim, -Math.PI/100),
        color: bodyColor,
        lineWidth: 0.4*dim
      },
      "foot": {
        shape: new GEN.Stroke(0.43*dim, 0.66*dim, 0.57*dim, 0.66*dim, -Math.PI/12),
        color: bodyColor,
        lineWidth: 0.2*dim
      },
      "upperArm": {
        shape: new GEN.Stroke(0.65*dim, 0.32*dim, 0.6*dim, 0.47*dim, -Math.PI/6),
        color: bodyColor,
        lineWidth: 0.4*dim
      },
      "lowerArm": {
        shape: new GEN.Stroke(0.6*dim, 0.47*dim, 0.75*dim, 0.42*dim, -Math.PI/12),
        color: bodyColor,
        lineWidth: 0.25*dim
      },
      "head": {
        shape: new GEN.Stroke(0.74*dim, 0.20*dim, 0.5*dim, 0.22*dim, -Math.PI/12),
        color: bodyColor,
        lineWidth: 0.40*dim
      }
    };
  };

  var draw = function() {
    var part;
    var partsNow = parts();
    for (var partName in partsNow) {
      part = partsNow[partName];
      hexColorStr = zeroPadToSix(part.color.toString(16));
      context.strokeStyle = "#" + hexColorStr;
      context.lineWidth = part.lineWidth;
      console.log("drawing: " + partName);
      part.shape.draw(context);
    }
  };
  draw();

  var canvasResizing;
  window.addEventListener("resize", function() {
    if (canvasResizing) {
      console.log("window resize event ignored");
      return;
    }
    console.log("window resize event NOT ignored");
    canvasResizing = true;
    resize();
    draw();
    canvasResizing = false;
  });

  // for debugging
  window.context = context;

};

window.onload = mainBike;