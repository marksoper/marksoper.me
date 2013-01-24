
var mainBike = function() {

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var margin = 30;

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  var zeroPadToSix = function(s) {
    while (s.length < 6) s = "0" + s;
    return s;
  };

  var wheelColor = genColorKeywords["chocolate"];
  var bodyColor = genColorKeywords["chocolate"];
  var groundColor = genColorKeywords["darkslategrey"];

  var parts = {
    "frontWheel": {
      shape: new GEN.Arc(600, 400, 120, 0, Math.PI * 2),
      color: wheelColor,
      lineWidth: 64
    },
    "rearWheel": {
      shape: new GEN.Arc(200, 400, 120, 0, Math.PI * 2),
      color: wheelColor,
      lineWidth: 64
    },
    "torso": {
      shape: new GEN.Stroke(260, 200, 500, 150, -Math.PI/6),
      color: bodyColor,
      lineWidth: 640
    },
    "upperLeg": {
      shape: new GEN.Stroke(460, 300, 260, 200, Math.PI/12),
      color: bodyColor,
      lineWidth: 480
    },
    "lowerLeg": {
      shape: new GEN.Stroke(340, 400, 460, 300, Math.PI/12),
      color: bodyColor,
      lineWidth: 230
    },
    "foot": {
      shape: new GEN.Stroke(340, 400, 460, 400, -Math.PI/12),
      color: bodyColor,
      lineWidth: 128
    },
    "upperArm": {
      shape: new GEN.Stroke(500, 150, 440, 230, -Math.PI/6),
      color: bodyColor,
      lineWidth: 320
    },
    "lowerArm": {
      shape: new GEN.Stroke(440, 230, 540, 220, -Math.PI/12),
      color: bodyColor,
      lineWidth: 210
    },
    "head_0": {
      shape: new GEN.Stroke(560, 90, 420, 70, Math.PI/3),
      color: bodyColor,
      lineWidth: 210
    },
    "head_1": {
      shape: new GEN.Stroke(580, 70, 420, 70, -Math.PI/3),
      color: bodyColor,
      lineWidth: 210
    },
    "head_2": {
      shape: new GEN.Stroke(590, 60, 420, 70, -Math.PI/3),
      color: bodyColor,
      lineWidth: 210
    },
    "ground": {
      shape: new GEN.Stroke(0, 680, canvas.width, 710, -Math.PI/9),
      color: groundColor,
      lineWidth:  480
    }
  };

  var part;
  for (var partName in parts) {
    part = parts[partName];
    hexColorStr = zeroPadToSix(part.color.toString(16));
    context.strokeStyle = "#" + hexColorStr;
    context.lineWidth = part.lineWidth;
    console.log("drawing: " + partName);
    part.shape.draw(context);
  }

  // for debugging
  window.context = context;

};

window.onload = mainBike;