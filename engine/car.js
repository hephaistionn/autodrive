

module.exports = class Car {

  constructor(config) {
    this.speed = 0.1;
    this.direction = 0;
    this.x = config.x || 0;
    this.y = config.y | 0;
    this.collision = false;
    this.censors = [
      {
        direction: Math.PI / 8,
        speed: 0,
        norm: 0
      }
    ];
    this.matrix = [];
    for (let i = 0; i < this.censors.length; i++) {
      this.matrix.concat([0, 0]);
    }
  }

  update(dt) {
    if(this.collision) return;
    this.x = this.x + (this.speed * dt) * Math.cos(this.direction);
    this.y = this.y + (this.speed * dt) * Math.sin(this.direction);
  }

  refreshCensors(imageMap) {
    const data = imageMap.data;
    const xInMap = Math.round(this.x);
    const yInMap = Math.round(imageMap.height-this.y);
    const value = data[yInMap*imageMap.width*4+xInMap*4];
    if(value<10) {
      this.collision = true;
    }
  }


};
