
const { createCanvas, loadImage } = require('canvas');

export default class Engine {

  constructor() {
    this.imageMap = null;
    this.timestamp = 0;
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
    const delta = now - this.timestamp;
    this.timestamp = now;
    
    //TODO

  }

};
