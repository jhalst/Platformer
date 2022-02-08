let levels = [];
let spawnPoint = [90, 200];
let pos = [spawnPoint[0], spawnPoint[1]];
let dpos = [0, 0];
let wallData = [0, -1, 0, 0];
let cameraPos = [-window.innerWidth/2, 0];
let imgs = [];
let dImgOffset = [];
let imgOffset = [];
let cameraDPos = [0, 0];
let keysPressed = [false, false, false, false];
let frames = 0;
let respawnFrame = 0;
let deaths = 0;

const START_TIME = Date.now();
const GRAVITY = .8;
const CHAR_SIZE = 20;

function renderBackground() {
  for (let i = 0; i < 7; i++) {
    imgs.push(document.getElementById(i));
    imgOffset.push([0, 0]);
    dImgOffset.push([0, 0]);
  }
  resize();
  window.addEventListener("resize", resize);
  gameInterval = setInterval(homeScreen, 17);
  let button = document.createElement('button');
  button.innerHTML = '<b>START GAME</b>';
  button.addEventListener('click', startGame);
  document.getElementById('loadScreen').appendChild(button);
}

function recordImg(src) {
  newImg = document.getElementById(i);
  newImg.src = src;
  newImg.style.objectFit = "none";
  document.body.prepend(newImg);
  imgs.push(newImg);
  imgOffset.push([0, 0]);
  dImgOffset.push([0, 0]);
}

function homeScreen() {
  frames++;
  moveBackground();
}

function startGame() {
  document.getElementById("loadScreen").style = "display: none";
  clearInterval(gameInterval);
  gameInterval = setInterval(runGame, 17);
  frames = 0;
  window.addEventListener("resize", resize);
  resize();

/////////////////////////LEVEL ONE/////////////////////////
levels.push(new Level([
  function (x, higher) { if(higher){ if(x< 100 & spawnPoint[1]>500){ return 88+.0018*(x+150)**2 } return 200 } else { return 0 } }, -270, 700, function(frame) { return 0 }, function(frame) { return 0 },
  function (x, higher) { if(higher){ return 200 } else { return 0 } }, 1100, 1400, function(frame) { return 0 }, function(frame) { return 0 },
  function (x, higher) { if(higher){ return 200 } else { return 0 } }, 1600, 1800, function(frame) { return 0 }, function(frame) { return 0 },
  function (x, higher) { if(higher){ return 200 } else { return 0 } }, 2000, 2200, function(frame) { return 0 }, function(frame) { return 0 },
  function (x, higher) { if(higher){ return 335 } else { return 315 } }, 2200, 2240, function(frame) { return 0 }, function(frame) { return 0 },
  function (x, higher) { if(higher){ return 470 } else { return 450 } }, 2100, 2140, function(frame) { return 0 }, function(frame) { return 0 },
  function (x, higher) { if(higher){ return 605 } else { return 585 } }, 1970, 2040, function(frame) { return 0 }, function(frame) { return 0 },
  function (x, higher) { if(higher){ return 740 } else { return 720 } }, 2100, 2140, function(frame) { return 0 }, function(frame) { return 0 },
  function (x, higher) { if(higher){ return 875 } else { return 855 } }, 2000, 2040, function(frame) { return 0 }, function(frame) { return 0 },
  function (x, higher) { if(higher){ return 1000 } else { return 970 } }, 1815, 1940, function(frame) { return 0 }, function(frame) { return 0 },
  function (x, higher) { if(higher){ if(x>-170){ return 200 + 1.1**(-x-100)} return 1500 }else{ if(x<-248){ return 0 } return 154+.0018*(x+140)**2 } }, -2000, 20, function(frame) { return 0 }, function(frame) { return 0 },
  function (x, higher) { if(higher){ return 2000 }else{ return Math.max(450 + .0003*(x+100)**2 - 1.1**(-x-100),200) } }, -170, 1200, function(frame) { return 0 }, function(frame) { return 0 },
  function (x, higher) { if(higher){ return 2000 }else{ if(x<2000){ return 1245 - .00045*(x-2000)**2 } return 1245 - 1.07**(x-2400) } }, 1195, 3200, function(frame) { return 0 }, function(frame) { return 0 },
  function (x, higher) { if(higher){ return 2000 }else{ return 0 } }, 3100, 4000, function(frame) { return 0 }, function(frame) { return 0 }, 
  function (x, higher) { if(higher){ return 350 + 300/(x-1299) } else { return 330 + 300/(x-1299) } }, 1400, 1460, function(frame) { return 0 }, function(frame) { return 0 },
  function (x, higher) { if(higher){ return 350 + 300/(2001-x) } else { return 330 + 300/(2001-x) } }, 1800, 1840, function(frame) { return 0 }, function(frame) { return 0 }
  ], [
  function (x, higher) { if(higher){ return 680 + Math.sqrt(122500 - (x - 1650)**2) } else { if ((1400 < x & x < 1460) || (1800 < x & x < 1840)) { return 350 + 300/(x-1299) + 300/(2001-x) } return 330 + 300/(x-1299) + 300/(2001-x) } }, 1300, 2000, function(frame) { return 0 }, function(frame) { return 0 },
  function (x, higher) { if(higher){ return 150 }else{ return 0} }, 700, 1100, function(frame) { return 0 }, function(frame) { return 0 },
  function (x, higher) { if(higher){ return 150 }else{ return 0} }, 1400, 1600, function(frame) { return 0 }, function(frame) { return 0 },
  function (x, higher) { if(higher){ return 150 }else{ return 0} }, 1800, 2000, function(frame) { return 0 }, function(frame) { return 0 },
  function (x, higher) { if(higher){ return 150 }else{ return 0} }, 2200, 2504, function(frame) { return 0 }, function(frame) { return 0 },
], [], [
  200, 2000, 2200, 15,
  1000, 1815, 1940, 45
], [
  function (x, higher) { if(higher){ return 140 + 1.39*Math.sqrt(625 - (x+249)**2) }else{ return 140 - 1.39*Math.sqrt(625 - (x+249)**2) } }, -274, -224, function(frame) { return 0 }, function(frame) { return 0 },
  function (x, higher) { if(higher){ if ( Math.abs(x - 1000) < 10) { return 1000 } return 950 }else{ return 930 + Math.abs(x - 1000) } }, 980, 1020, function(frame) { return 0 }, function(frame) { return 0 }
]));

/////////////////////////LEVEL TWO/////////////////////////
  levels.push(new Level([
    function (x, higher) { if(higher){ return 200 } else { return 180 } }, 50, 200, function(frame) { return 0 }, function(frame) { return 0 },
    function (x, higher) { if(higher){ return 150 - 0.0005 * (x - 948)**2 } else { return 0 } }, 400, 1496, function(frame) { return 0 }, function(frame) { return 0 },
    function (x, higher) { if(higher){ return 265 }else{ return 245 } }, 800, 1500, function(frame) { return 0 }, function(frame) { return 0 },
    function (x, higher) { if(x < 600){ if(higher){return -.0014 * (x-600)**2 + 395}else{ return -.0014 * (x-600)**2 + 375 } }else{ if(higher){ return 395 } else { return 375 } } }, 395, 950, function(frame) { return 0 }, function(frame) { return 0 },
    function(x, higher) { if(higher){ return 400 + .3 * x } else { return 400 } }, 0, 300, function(frame) { return 0 }, function(frame) { return 0 },
    function(x, higher) { if(higher){ return 500 } else { return 480 } }, -50, 0, function(frame) { return 0 }, function(frame) { return 0 },
    function(x, higher) { if(higher){ return 600 } else { return 580 } }, -150, -100, function(frame) { return 0 }, function(frame) { return 0 },
    function(x, higher) { if(higher){ return 700 } else { return 680 } }, -250, -200, function(frame) { return 0 }, function(frame) { return 0 },
    function(x, higher) { if(higher){ return 800 } else { return 780 } }, -350, -300, function(frame) { return 0 }, function(frame) { return 0 },
    function(x, higher) { if(higher){ return 900 } else { return 880 } }, -450, -400, function(frame) { return 0 }, function(frame) { return 0 },
    function(x, higher) { if(x > 700){if(higher){ return 1000 }else{ return 980 } }else{ if(higher){ return 50 * Math.sin(.03 * x + 12) + 950 } else { return 50 * Math.sin(.03 * x + 12) + 930 } } }, -400, 1500, function(frame) { return 0 }, function(frame) { return 0 },
    function(x, higher) { if(higher){ return 600 + 400*Math.cos(.0035*(x-1500)) } else { return 580 + 400*Math.cos(.0035*(x-1500)) } }, 1500, 2600, function(frame) { return 0 }, function(frame) { return 0 },
    function(x, higher) { if(higher){ return 100 }else{ return 50 } }, 3700, 4000, function(frame) { return 0 }, function(frame) { return 0 },
    function(x, higher) { if(higher){ return 150 + Math.sqrt(625-(x-4225)**2) }else{ return 150 - Math.sqrt(625-(x-4225)**2) } }, 4200, 4250, function(frame) { return 0 }, function(frame) { return 0 },
    function(x, higher) { if(higher){ return 200 + Math.sqrt(625-(x-4450)**2) }else{ return 200 - Math.sqrt(625-(x-4450)**2) } }, 4425, 4475, function(frame) { return 0 }, function(frame) { return 0 },
    function(x, higher) { if(higher){ return 250 + Math.sqrt(625-(x-4675)**2) }else{ return 250 - Math.sqrt(625-(x-4675)**2) } }, 4650, 4700, function(frame) { return 0 }, function(frame) { return 0 },
    function(x, higher) { if(higher){ if(x>5300){ return .5*x-2330 } return 20 + 0.0048*(x-5050)**2 }else{ if(x>5050){ return 0.000477*(x-5050)**2 } return 0.0048*(x-5050)**2 } }, 4820, 6400, function(frame) { return 0 }, function(frame) { return 0 },
    function(x, higher) { if(higher){ return 30+.0003*(x-5600)**2 }else{ return 10 + .0003*(x-5600)**2 } }, 6300, 6800, function(frame) { return 0 }, function(frame) { return 0 },
    function(x, higher) { if(higher){ return 30+.0003*(x-5600)**2 }else{ return 10 + .0003*(x-5600)**2 } }, 5750, 6150, function(frame) { return 0 }, function(frame) { return 0 }
  ], [
    function(x, higher) { if(higher){ return 50 * Math.sin(.03 * x + 12) + 930 } else { return 550 } }, 280, 300, function(frame) { return 0 }, function(frame) { return 0 },
    function(x, higher) { if(higher){ return 950 } else { return 50 * Math.sin(.03 * x + 12) + 950 } }, -295, -190, function(frame) { return 0 }, function(frame) { return 0 },
    function(x, higher) { if(higher){ return 950 } else { return 50 * Math.sin(.03 * x + 12) + 950 } }, -86, 20, function(frame) { return 0 }, function(frame) { return 0 },
    function(x, higher) { if(higher){ return 950 } else { return 50 * Math.sin(.03 * x + 12) + 950 } }, 124, 230, function(frame) { return 0 }, function(frame) { return 0 },
    function(x, higher) { if(higher){ return 950 } else { return 50 * Math.sin(.03 * x + 12) + 950 } }, 333, 440, function(frame) { return 0 }, function(frame) { return 0 },
    function(x, higher) { if(higher){ return 950 } else { return 50 * Math.sin(.03 * x + 12) + 950 } }, 542, 650, function(frame) { return 0 }, function(frame) { return 0 }
  ], [55, 80, 85, 90], [
    900, -450, -400, 45,
    100, 3700, 4000, 60,
  ], [function(x, higher) { if(higher){ return 1 + 0.000477*(x-5050)**2 }else{ return 0 } }, 5050, 5590, function(frame) { return 0 }, function(frame) { return 0 }]));
/////////////////////////LEVEL THREE/////////////////////////
  levels.push(new Level([
    function (x, higher) { if(higher){ return 200 } else { return 180 } }, 50, 200, function(frame) { return 300-300*Math.cos(.01*frame) }, function(frame) { return 0 },
    function (x, higher) { if(higher){ return 50 } else { return 0 } }, 815, 825, function(frame) { return 0 }, function(frame) { return 0 },
    function (x, higher) { if(higher){ return 50 } else { return 0 } }, 875, 885, function(frame) { return 0 }, function(frame) { return 0 },
    function (x, higher) { if(higher){ return .2*x + 170 } else { return .2*x + 150 } }, 800, 900, function(frame) { return 0 }, function(frame) { return 0 },
    function (x, higher) { if(higher){ return 460 } else { return 440 } }, -200, 0, function(frame) { return .004 * frame**2 }, function(frame) { return 0 },
// make horizontal sections so this pair is actually rectangular
    function (x, higher) { if(higher){ return 1.333*x - 1180 } else { return 1.333*x - 1194 } }, 885, 917, function(frame) { return 0 }, function(frame) { return 0 },
    function (x, higher) { if(higher){ return 1.333*x - 1283 } else { return 1.333*x - 1298 } }, 960, 983, function(frame) { return 0 }, function(frame) { return 0 },
    function (x, higher) { if(higher){ return 500 } else { return 482 } }, 1200, 1300, function(frame) { return 0 }, function(frame) { return 0 },
  ], [
    function (x, higher) { if(higher){ return 1.5 * (120 + (10+5*Math.cos(.5*frames)) * (x - 530) - (.5 + .1*Math.cos(.2*frames) )*( x - 570)**2 + .01 * (x - 550)**3 - (.0006+.0003*Math.cos(.1*frames))*(x - 550)**4 - (.0000003+.0000001*Math.sin(.3*frames))*(x - 610)**5 + (1.31 + .08*Math.sin(.3*frames))**(x - 570)) * (.01 * x - 5) * (6 - .01*x) } else { return 0 } }, 500, 600, function(frame) { return 0 }, function(frame) { return 0 },
    function (x, higher) { if(higher){ return (1.5 - .5*Math.cos(.06*frames))*Math.sqrt(625 - (850 - x)**2) } else { return -(1.5 - .5*Math.cos(.06*frames))*Math.sqrt(625 - (850 - x)**2) } }, 825, 875, function(frame) { return 0 }, function(frame) { return 400*Math.cos(.06*frame) },
    function (x, higher) { if(higher){ return Math.sqrt(625 - (930 - x)**2) } else { return -Math.sqrt(625 - (930 - x)**2) } }, 905, 955, function(frame) { return 28 * (frame % 89.76 ) }, function(frame) { return 500*Math.sin(.07*frame) },

    function (x, higher) { if(higher){ return Math.sqrt(625 - (1500 - x)**2) } else { return -Math.sqrt(625 - (1500 - x)**2) } }, 1475, 1525, function(frame) { return 0 }, function(frame) { if(frame>577){ return 700 - .3*(Math.max(0, frames-627))**2 }else{ return -25 } },
    function (x, higher) { if(higher){ return Math.sqrt(625 - (1570 - x)**2) } else { return -Math.sqrt(625 - (1570 - x)**2) } }, 1545, 1595, function(frame) { return 0 }, function(frame) { if(frame>582){ return 700 - .3*(Math.max(0, frames-632))**2 }else{ return -25 } },
    function (x, higher) { if(higher){ return Math.sqrt(625 - (1640 - x)**2) } else { return -Math.sqrt(625 - (1640 - x)**2) } }, 1615, 1665, function(frame) { return 0 }, function(frame) { if(frame>587){ return 700 - .3*(Math.max(0, frames-637))**2 }else{ return -25 } },
    function (x, higher) { if(higher){ return Math.sqrt(625 - (1710 - x)**2) } else { return -Math.sqrt(625 - (1710 - x)**2) } }, 1685, 1735, function(frame) { return 0 }, function(frame) { if(frame>592){ return 700 - .3*(Math.max(0, frames-642))**2 }else{ return -25 } },
    function (x, higher) { if(higher){ return Math.sqrt(625 - (1780 - x)**2) } else { return -Math.sqrt(625 - (1780 - x)**2) } }, 1755, 1805, function(frame) { return 0 }, function(frame) { if(frame>597){ return 700 - .3*(Math.max(0, frames-647))**2 }else{ return -25 } },
    function (x, higher) { if(higher){ return Math.sqrt(625 - (1850 - x)**2) } else { return -Math.sqrt(625 - (1850 - x)**2) } }, 1825, 1875, function(frame) { return 0 }, function(frame) { if(frame>602){ return 700 - .3*(Math.max(0, frames-652))**2 }else{ return -25 } },
  ], [], [
    500, 1200, 1300, 35
  ], [
    function (x, higher) { if(higher){ return 1600 }else{ return 0 } }, 6990, 7190, function(frame) { return 0 }, function(frame) { return 0 }
  ]));
  // levels.shift();
  // levels.shift();
}