
const { createCanvas, loadImage } = require('canvas');
const Car = require('./car');

module.exports = class Engine {
  constructor(config) {
    this.imageMap = null;
    this.timestamp = 0;
    this.cars = [];
    for(let i=0; i<config.cars; i++) {
      this.cars.push(new Car({x:600, y:912}));
    }
  }

  async init(pathMap) {
    this.imageMap = await this.loadMap(pathMap);
    this.timestamp = Date.now();
  }

  loadMap(path ) {
    return loadImage(path).then(image => {
      const canvas = createCanvas(image.width,  image.height);
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, image.width,  image.height);
      const pixelimage = context.getImageData(0, 0, image.width,  image.height);
      return pixelimage;
    })
  }

  update() {
    const now = Date.now();
    const dt = now - this.timestamp;
    this.timestamp = now;
    for(let i=0; i<this.cars.length; i++) {
      this.cars[i].update(dt);
      this.cars[i].updateSensors(this.imageMap, dt);
      this.cars[i].updateOrder();
    }
  }

};
