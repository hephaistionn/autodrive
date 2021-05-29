
const { createCanvas, loadImage } = require('canvas');
const Car = require('./car');
const editable = require('../editable');

Math.clamp = function (value, min, max) {
  return Math.max(min, Math.min(max, value));
}

Math.norm = function (x1, x2, y1, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

module.exports = class Engine {
  constructor(config) {
    this.imageMap = null;
    this.timestamp = 0;
    this.cars = [];
    this.bestMatrix;
    this.bestDistance = 0;

  }

  async init(pathMap) {
    this.imageMap = await this.loadMap(pathMap);
    this.timestamp = Date.now();
    let configCar = Object.assign({}, editable.initStates);
    configCar = Object.assign(configCar, editable.config);
    configCar.y = this.imageMap.height - configCar.y;
    for (let i = 0; i < configCar.cars; i++) {
      this.cars.push(new Car(configCar));
    }
  }

  loadMap(path) {
    return loadImage(path).then(image => {
      const canvas = createCanvas(image.width, image.height);
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, image.width, image.height);
      const pixelimage = context.getImageData(0, 0, image.width, image.height);
      return pixelimage;
    })
  }

  update() {
    const now = Date.now();
    let dt = now - this.timestamp;
    this.timestamp = now;
    for (let i = 0; i < this.cars.length; i++) {
      this.cars[i].updateDirection();
      this.cars[i].updateAcceleration();
      this.cars[i].update(dt, this.imageMap);

    }

    for (let i = 0; i < this.cars.length; i++) {
      if (this.cars[i].distance.value > this.bestDistance) {
        this.bestDistance = this.cars[i].distance.value;
        this.bestMatrix = this.cars[i].matrix.slice();
      }
    }

    if (this.bestMatrix) {
      for (let i = 0; i < this.cars.length; i++) {
        if (this.cars[i].collision) {
          this.cars[i].reset(this.bestMatrix, this.bestDistance);
        }
      }
    }

  }

};
