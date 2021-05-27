

module.exports = class Car {

  constructor(config) {
    this.speed = 0.1;
    this.direction = 0;
    this.x = config.x || 0;
    this.y = config.y | 0;
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
    this.x = this.x + (this.speed * dt) * Math.cos(this.direction);
    this.y = this.y + (this.speed * dt) * Math.sin(this.direction);
  }


};
