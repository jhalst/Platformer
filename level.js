class Level {
  constructor(walls, danger, ice, checkPoints, goal) {
    this.walls = walls;
    this.danger = danger;
    this.ice = ice;
    this.checkPoints = checkPoints;
    this.goal = goal;
  }

  inAWall(cords, areaClass) {
    var inside = "";
    for (var i = 0; i < this[areaClass].length; i += 5) {
      inside = this.inWall(cords, areaClass, i);
      if (inside !== "") {
        return inside;
      }
    }
    return "";
  }

  inWall(cords, areaClass, i) {
    if (cords[0] + CHAR_SIZE > this[areaClass][i + 1] + this[areaClass][i + 3](frames) & cords[0] < this[areaClass][i + 2] + this[areaClass][i + 3](frames)) {
      if (this.cornerTouch(cords, areaClass, i) !== "") {
        return this.cornerTouch(cords, areaClass, i);
      }
      if (this.cornerTouch([cords[0] + CHAR_SIZE, cords[1]], areaClass, i) !== "") {
        return this.cornerTouch([cords[0] + CHAR_SIZE, cords[1]], areaClass, i);
      }
      for (var j = cords[0] + 1; j < cords[0] + CHAR_SIZE; j++) {
        if (this[areaClass][i + 1] + this[areaClass][i + 3](frames) <= j & this[areaClass][i + 2] + this[areaClass][i + 3](frames) >= j & cords[1] <= this[areaClass][i](j - this[areaClass][i + 3](frames), true) + this[areaClass][i + 4](frames) & cords[1] >= this[areaClass][i](j - this[areaClass][i + 3](frames), false) + this[areaClass][i + 4](frames)) {
          return 0;
        }
      }
    }
    return "";
  }

  cornerTouch(cords, areaClass, wallNumber) {
    if (this[areaClass][wallNumber + 2] + this[areaClass][wallNumber + 3](frames) > cords[0] + 1 & this[areaClass][wallNumber + 1] + this[areaClass][wallNumber + 3](frames) < cords[0] - 1 & cords[1] <= this[areaClass][wallNumber](cords[0] - this[areaClass][wallNumber + 3](frames), true) + this[areaClass][wallNumber + 4](frames) & cords[1] >= this[areaClass][wallNumber](cords[0] - this[areaClass][wallNumber + 3](frames), false) + this[areaClass][wallNumber + 4](frames)) {
      return this[areaClass][wallNumber](cords[0] + this[areaClass][wallNumber + 3](frames) + 1, true) - this[areaClass][wallNumber](cords[0] + this[areaClass][wallNumber + 3](frames), true);
    }
    return "";
  }

  updateWallData() {
    for (var i = 0; i < this.walls.length; i += 5) {
      if (this.inWall(pos, 'walls', i) !== ""){
        var slope = this.inWall(pos, 'walls', i);
        break;
      }
    }
    if (i >= this.walls.length) {
      wallData = [0, -1, 0, 0];
      return;
    }
    wallData = [slope, i, this.walls[i + 3](frames + 1) - this.walls[i + 3](frames), this.walls[i + 4](frames + 1) - this.walls[i + 4](frames)];
  }

  drawMap(color, areaClass) {
    var c = document.getElementById("game");
    var ctx = c.getContext("2d");
    for (var i = 0; i < this[areaClass].length; i += 5) {
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.moveTo(this[areaClass][i + 1] + this[areaClass][i + 3](frames) - cameraPos[0], c.height + cameraPos[1] - this[areaClass][i](this[areaClass][i + 1], true) - this[areaClass][i + 4](frames));
      for (var j = this[areaClass][i + 1] + this[areaClass][i + 3](frames) + 2; j < this[areaClass][i + 2] + this[areaClass][i + 3](frames); j += 2) {
        ctx.lineTo(j - cameraPos[0], c.height + cameraPos[1] - this[areaClass][i](j - this[areaClass][i + 3](frames), true) - this[areaClass][i + 4](frames));
      }
      j = this[areaClass][i + 2] + this[areaClass][i + 3](frames);
      ctx.lineTo(j - cameraPos[0], c.height + cameraPos[1] - this[areaClass][i](j - this[areaClass][i + 3](frames), true) - this[areaClass][i + 4](frames));
      while (j >= this[areaClass][i + 1] + this[areaClass][i + 3](frames)) {
        ctx.lineTo(j - cameraPos[0], c.height + cameraPos[1] - this[areaClass][i](j - this[areaClass][i + 3](frames), false) - this[areaClass][i + 4](frames));
        j -= 2;
      }
      ctx.fill();
    }
  }

  drawIce() {
    var c = document.getElementById('game');
    var ctx = c.getContext('2d');
    ctx.strokeStyle = '#9090ff'
    ctx.lineWidth = 3;
    for (var i = 0; i < this.ice.length; i++) {
      ctx.beginPath();
      ctx.moveTo(this.walls[this.ice[i] + 1] + this.walls[this.ice[i] + 3](frames) - cameraPos[0], c.height + cameraPos[1] - this.walls[this.ice[i]](this.walls[this.ice[i] + 1], true) - this.walls[this.ice[i] + 4](frames));
      for (var j = this.walls[this.ice[i] + 1] + 10; j < this.walls[this.ice[i] + 2]; j += 10) {
        ctx.lineTo(j + this.walls[this.ice[i] + 3](frames) - cameraPos[0], c.height + cameraPos[1] - this.walls[this.ice[i]](j, true) - this.walls[this.ice[i] + 4](frames));
      }
      ctx.lineTo(this.walls[this.ice[i] + 2] + this.walls[this.ice[i] + 3](frames) - cameraPos[0], c.height + cameraPos[1] - this.walls[this.ice[i]](this.walls[this.ice[i] + 2], true) - this.walls[this.ice[i] + 4](frames));
      ctx.stroke();
    }
    ctx.lineWidth = 1;
  }

  drawCheckPoints() {
    var c = document.getElementById("game");
    var ctx = c.getContext("2d");
    for (var n = 0; n < this.checkPoints.length; n += 4) {
      var grd = ctx.createLinearGradient(0, c.height + cameraPos[1] - this.checkPoints[n] - this.walls[this.checkPoints[n + 3] + 4](frames), 0, c.height + cameraPos[1] - this.checkPoints[n] - this.walls[this.checkPoints[n + 3] + 4](frames) - 30);
      grd.addColorStop(0, '#0050C0ff');
      grd.addColorStop(1, '#0050C000');
      ctx.fillStyle = grd;
      ctx.fillRect(this.checkPoints[n + 1] + this.walls[this.checkPoints[n + 3] + 3](frames) - cameraPos[0], c.height + cameraPos[1] - this.checkPoints[n] - this.walls[this.checkPoints[n + 3] + 4](frames), this.checkPoints[n + 2] - this.checkPoints[n + 1], -30);
    }
  }
}