function runGame() {
  // bookkeeping
  frames++;
  levels[0].updateWallData();
  // moving around
  dpos[1] -= GRAVITY;
  detectInputs();
  pushedByPlatform();
  friction();
  move();
  hitPlatform();
  levels[0].updateWallData();
  // drawing stuff
  draw();
  // checking for stuff
  if (inCheckpoint(3)) {
    if (levels[0].inWall(spawnPoint, 'walls',  wallData[1]) === "") {
      respawnFrame = frames;
    }
    spawnPoint = [pos[0], pos[1]];
  }
  if (checkDeath()) {
    death();
  }
  if (levels[0].inAWall(pos, 'goal') !== "" || levels[0].inAWall([pos[0], pos[1] + CHAR_SIZE], 'goal') !== "") {
    passLevel();
  }
}

function detectInputs() {
  if (wallData[1] >= 0) {
    if (keysPressed[1]) {
      dpos[1] = 16 / Math.sqrt(1 + wallData[0] ** 2);
      dpos[0] -= 16 * wallData[0] / Math.sqrt(1 + wallData[0] ** 2);
    }
  }
  if (keysPressed[0]) {
    dpos[0] -= .3 / Math.sqrt(1 + wallData[0] ** 2);
    dpos[1] -= .3 * wallData[0] / Math.sqrt(1 + wallData[0] ** 2);
  }
  if (keysPressed[2]) {
    dpos[0] += .3 / Math.sqrt(1 + wallData[0] ** 2);
    dpos[1] += .3 * wallData[0] / Math.sqrt(1 + wallData[0] ** 2);
  }
}

function pushedByPlatform() {
  var relativeDpos = [dpos[0] - wallData[2], dpos[1] - wallData[3]];
  if (wallData[1] === -1) {
    if ((levels[0].inAWall(pos, 'walls') === "" & levels[0].inAWall([pos[0] + .02 * relativeDpos[0], pos[1] + 1], 'walls') !== "") || (levels[0].inAWall([pos[0], pos[1] + CHAR_SIZE], 'walls') === "" & levels[0].inAWall([pos[0] + .02 * relativeDpos[0], pos[1] + CHAR_SIZE - 1], 'walls') !== "")) {
      relativeDpos[0] *= -.5;
    }
    while (levels[0].inAWall([pos[0] + relativeDpos[0], pos[1] + CHAR_SIZE + relativeDpos[1]], 'walls') !== "" & levels[0].inAWall([pos[0] + relativeDpos[0], pos[1] + relativeDpos[1]], 'walls') === "") {
      relativeDpos[1] -= .05;
    }
  } else {
    while (levels[0].inAWall([pos[0] + 1 * relativeDpos[0], pos[1] + 1 + 1 * relativeDpos[1]], 'walls') !== "" || levels[0].inAWall([pos[0] + relativeDpos[0], pos[1] + 1 + relativeDpos[1]], 'walls') !== "") {
      relativeDpos[0] -= .05 * wallData[0];
      relativeDpos[1] += .05;
    }
  }
  dpos = [relativeDpos[0] + wallData[2], relativeDpos[1] + wallData[3]];
}

function inCheckpoint(num) {
  if (num > levels[0].checkPoints.length) {
    return false;
  }
  return wallData[1] === levels[0].checkPoints[num] || inCheckpoint(num + 4);
}

function friction() {
  if (wallData[1] >= 0) {
    var friction = .97
    if (levels[0].ice.indexOf(wallData[1]) >= 0) {
      friction = 1;
    }
  } else {
    var friction = .99;
  }
  var relativeDpos = [dpos[0] - wallData[2], dpos[1] - wallData[3]];
  relativeDpos[0] *= friction;
  relativeDpos[1] *= friction;
  dpos = [relativeDpos[0] + wallData[2], relativeDpos[1] + wallData[3]];
}

function move() {
  for (var j = 0; j < 5; j++) {
    pos[0] += .2 * dpos[0];
    pos[1] += .2 * dpos[1];
    
  }
}

function hitPlatform() {
  var relativeDpos = [dpos[0] - wallData[2], dpos[1] - wallData[3]];
  while (levels[0].inAWall([pos[0], pos[1] + 1], 'walls') !== "" || levels[0].inAWall([pos[0], pos[1] + CHAR_SIZE], 'walls') !== "") {
    pos[0] -= .01 * relativeDpos[0];
    pos[1] -= .01 * relativeDpos[1];
  }
}

function checkDeath() {
  return levels[0].inAWall(pos, 'danger') !== "" || levels[0].inAWall([pos[0], pos[1] + CHAR_SIZE], 'danger') !== "" || pos[1] < 0;
}

function death() {
  pos = [spawnPoint[0], spawnPoint[1]];
  dpos = [0, 0];
  frames = respawnFrame;
  deaths++;
}

function moveCamera(direction) {
  if (direction === 0) {
    var pageSize = document.getElementById("game").width;
    var speed = document.getElementById('game').width / 30;
  } else {
    var pageSize = document.getElementById("game").height;
    var speed = document.getElementById('game').height / 45;;
  }
  if (Math.abs(pos[direction] - cameraPos[direction] - .5 * pageSize) > .2 * pageSize) {
    cameraDPos[direction] = Math.sign(pos[direction] - cameraPos[direction] - .5 * pageSize) * Math.min(speed, .05 * Math.abs(pos[direction] - cameraPos[direction] - .5 * pageSize));
  } else {
    cameraDPos[direction] *= .95;
  }
  cameraPos[direction] += cameraDPos[direction];
  if (cameraPos[1] < 0) {
    cameraPos[1] = 0;
  }
}

function draw() {
  var c = document.getElementById("game");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height); 

  moveCamera(0);
  moveCamera(1);
  moveBackground();
  levels[0].drawCheckPoints();
  levels[0].drawMap('#000000', 'walls');
  levels[0].drawMap('#aa000099', 'danger');
  levels[0].drawMap('#00711e', 'goal');
  levels[0].drawIce();
  moveBackground();
  ctx.beginPath();
  ctx.fillStyle = '#22222299';
  ctx.strokeStyle = '#000000';
  ctx.fillRect(pos[0] - cameraPos[0], c.height + cameraPos[1] - pos[1] - CHAR_SIZE, CHAR_SIZE, CHAR_SIZE);
  ctx.rect(pos[0] - cameraPos[0], c.height + cameraPos[1] - pos[1] - CHAR_SIZE, CHAR_SIZE, CHAR_SIZE);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#777777';
  ctx.font = "20px Georgia";
  ctx.fillText('Deaths: ' + deaths, 0, 20);
  ctx.fillText('Time: ' + Math.floor(.000016667 * (Date.now() - START_TIME)) + ':' + (Math.floor(.001 * (Date.now() - START_TIME)) % 60), 15, 50);
  ctx.stroke();
}

function moveBackground() {
  for (let i = 0; i < imgs.length; i++) {
    if ( i !== -1) {
      if (frames % 2 === 0) {
        dImgOffset[i][0] += Math.sqrt(Math.random()) - .667;
        dImgOffset[i][1] += Math.sqrt(Math.random()) - .667;
        // dImgOffset[i][0] *= .9;
        // dImgOffset[i][1] *= .9;
      }
      imgOffset[i][0] = Math.max(imgOffset[i][0] + .5*dImgOffset[i][0], 0);
      imgOffset[i][1] = Math.max(imgOffset[i][1] + .5*dImgOffset[i][1], 0);
      imgOffset[i][0] *= .9;
      imgOffset[i][1] *= .9;
    }
    imgs[i].style.objectPosition = (-1000 - .9**i * (cameraPos[0] + imgOffset[i][0])) + "px " + (.9**i * (cameraPos[1] + imgOffset[i][1]) + imgs[i].height - 1600) + "px";
  }
}

function passLevel() {
  levels.shift();
  clearInterval(gameInterval);
  if (0 === levels.length) {
    c = document.getElementById("game");
    ctx = c.getContext('2d');
    ctx.fillStyle = '#550088';
    ctx.textAlign = 'center';
    ctx.font = "40px Georgia";
    ctx.fillText('#1 VICTORY ROYAL', c.width / 2, c.height / 2 + 15);
  } else {
    respawnFrame = 0;
    frames = 0;
    spawnPoint = [90, 200];
    pos = [spawnPoint[0], spawnPoint[1]];
    dpos = [0, 0];
    cameraPos = [-window.innerWidth / 2, 0];
    passAnimation(16);
  }
}

function passAnimation(time) {
  if (time > 100) {
    gameInterval = setInterval(runGame, 17);
    return;
  }
  c = document.getElementById('game');
  ctx = c.getContext('2d');
  ctx.fillStyle = '#000000' + time.toString(16);
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.font = "40px Georgia";
  ctx.fillText('LEVEL COMPLETE', c.width / 2, c.height / 2 + 15);
  setTimeout(passAnimation, 20, time + 1);
}

window.onkeydown = function() {
  if (event.keyCode === 37 || event.keyCode === 65) {
    keysPressed[0] = true;
  } else if (event.keyCode === 38 || event.keyCode === 87) {
    keysPressed[1] = true;
  } else if (event.keyCode === 39 || event.keyCode === 68) {
    keysPressed[2] = true;
  } else if (event.keyCode === 40 || event.keyCode === 83) {
    keysPressed[3] = true;
  }
}

window.onkeyup = function() {
  if (event.keyCode === 37 || event.keyCode === 65) {
    keysPressed[0] = false;
  } else if (event.keyCode === 38 || event.keyCode === 87) {
    keysPressed[1] = false;
  } else if (event.keyCode === 39 || event.keyCode === 68) {
    keysPressed[2] = false;
  } else if (event.keyCode === 40 || event.keyCode === 83) {
    keysPressed[3] = false;
  }
}

function resize() {
  document.getElementById('game').width = window.innerWidth;
  document.getElementById('game').height = window.innerHeight;
  // document.getElementById('background').width = window.innerWidth;
  // document.getElementById('background').height = window.innerHeight;
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].width = window.innerWidth;
    imgs[i].height = window.innerHeight;
    imgs[0].style.objectPosition = (-cameraPos[0]) + "px " + (-cameraPos[1]) + "px";
  }
}