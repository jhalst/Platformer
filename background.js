function createBackground(levelSize) {
  let imgData = [];
  for (let i = 6; i < 7; i++) {
    imgData.push(new Background(100 * 2**(-i), levelSize, [0, 0, 0, 255*(1.5**(-2-i))]));
  }
  combineBackgroundLayers(imgData, levelSize);
  return imgData;
}
// [255 * (1 - 1.5**(-1-i)), 255 * (1 - 1.5**(-1-i)), 255 * (1 - 1.5**(-1-i)), 255]
function combineBackgroundLayers(imgData, levelSize) {
  backgroundSum = document.getElementById('background').getContext('2d').createImageData(levelSize[2], levelSize[3]);
  for (let y = 0; y < levelSize[3]; y++) {
    for (let x = 0; x < levelSize[2]; x++) {
      backgroundSum.data[4*(y*levelSize[2] + x)] = 255;
      backgroundSum.data[4*(y*levelSize[2] + x) + 1] = 255;
      backgroundSum.data[4*(y*levelSize[2] + x) + 2] = 255;
      backgroundSum.data[4*(y*levelSize[2] + x) + 3] = 255;
    }
  }
  for (var i = 0; i < imgData.length; i++) {
    for (let y = 0; y < levelSize[3]; y++) {
      for (let x = 0; x < levelSize[2]; x++) {
        let opacity = 0.0039 * imgData[i].img.data[4*(y*levelSize[2] + x) + 3];
        backgroundSum.data[4*(y*levelSize[2] + x)] -= (255 - imgData[i].img.data[4*(y*levelSize[2] + x)]) * opacity;
        backgroundSum.data[4*(y*levelSize[2] + x) + 1] -= (255 - imgData[i].img.data[4*(y*levelSize[2] + x) + 1]) * opacity;
        backgroundSum.data[4*(y*levelSize[2] + x) + 2] -= (255 - imgData[i].img.data[4*(y*levelSize[2] + x) + 2]) * opacity;
      }
    }
  }
}

class Background {
  constructor(gridSize, levelSize, color) {
    this.gridSize = gridSize;
    this.vectors = this.createGrid(levelSize);
    this.img = this.drawNoise(levelSize, color);
  }
  createGrid(levelSize) {
    let vectors = [];
    for (let i = 0; i - this.gridSize <= levelSize[3]; i += this.gridSize) {
      let row = [];
      for (let j = 0; j - this.gridSize <= levelSize[2]; j += this.gridSize) {
        let angle = 6.283 * Math.random();
        row.push([Math.cos(angle), Math.sin(angle)]);
      }
      vectors.push(row);
    }
    return vectors;
  }

  drawNoise(levelSize, color) {
    let newData = document.getElementById('background').getContext('2d').createImageData(levelSize[2], levelSize[3]);
    for (let y = 0; y < levelSize[3]; y++) {
      for (let x = 0; x < levelSize[2]; x++) {
        newData.data[4 * (y * levelSize[2] + x)] = color[0];
        newData.data[4 * (y * levelSize[2] + x) + 1] = color[1];
        newData.data[4 * (y * levelSize[2] + x) + 2] = color[2];
        newData.data[4 * (y * levelSize[2] + x) + 3] = color[3]/255 * (.1*y) * (1 + this.perlinNoise(this.vectors, x / this.gridSize, y / this.gridSize));
      }
    }
    return newData;
  }

  perlinNoise(vectors, x, y) {
    // Calculate the dot product with the vectors at each corner of the square (x, y) is in
    let lowlow = (x % 1) * vectors[Math.floor(y)][Math.floor(x)][0] + (y % 1) * vectors[Math.floor(y)][Math.floor(x)][1];
    let highlow = (x % 1 - 1) * vectors[Math.floor(y)][Math.floor(x) + 1][0] + (y % 1) * vectors[Math.floor(y)][Math.floor(x) + 1][1];
    let lowhigh = (x % 1) * vectors[Math.floor(y) + 1][Math.floor(x)][0] + (y % 1 - 1) * vectors[Math.floor(y) + 1][Math.floor(x)][1];
    let highhigh = (x % 1 - 1) * vectors[Math.floor(y) + 1][Math.floor(x) + 1][0] + (y % 1 - 1) * vectors[Math.floor(y) + 1][Math.floor(x) + 1][1];
    // take a weighted average of the vectors based on where in the square the point is
    let low = (highlow - lowlow) * (3.0 - (x%1) * 2.0) * (x%1) * (x%1) + lowlow;
    let high = (highhigh - lowhigh) * (3.0 - (x%1) * 2.0) * (x%1) * (x%1) + lowhigh;
    return (high - low) * (3.0 - (y%1) * 2.0) * (y%1) * (y%1) + low;
  }
}