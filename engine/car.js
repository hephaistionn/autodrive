const Car = require('./car');

const editable = require('../editable');

module.exports = class Car {

  constructor(config) {
    this.delay = Math.random() * 4000;
    this.bodyDirection = config.direction || 0;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = 0;
    this.speed = config.speed || 0.4
    this.initX = this.x;
    this.initY = this.y;
    this.collision = false;
    this.stepSensor = 0.8;
    this.sensorLimit = config.sensorLimit || 200;
    this.distance = {
      insterval: 10,
      time: 0,
      value: 0,
      x: this.initX,
      y: this.initY,
    };
    this.sensors = config.sensors.map(dir => { return {
      direction: dir,
      speed: 0,
      norm: 0,
      norm2: 0,
    }});

    this.matrix = editable.updateMatrix(config.initMatrix, null);
  }

  update(dt, imageMap) {
    if (this.delay > 0) {
      this.delay -= dt;
      return;
    }

    if (this.collision) return;
    this.bodyDirection += this.direction;
    this.x = this.x + (this.speed * dt) * Math.cos(this.bodyDirection);
    this.y = this.y + (this.speed * dt) * Math.sin(this.bodyDirection);
    this.updateDistance(dt);
    this.updateSensors(dt, imageMap);
  }

  updateDistance(dt) {
    this.distance.time += dt;
    if (this.distance.time >= this.distance.insterval) {
      this.distance.time = 0;
      this.distance.value += Math.norm(this.x, this.distance.x, this.y, this.distance.y);
      this.distance.x = this.x;
      this.distance.y = this.y;
    }
  }

  updateSensors(dt, imageMap) {
    const data = imageMap.data;
    const xInMap = Math.round(this.x);
    const yInMap = Math.round(imageMap.height - this.y);
    const value = data[yInMap * imageMap.width * 4 + xInMap * 4];
    if (value < 10) {
      this.collision = true;
    }
    for (let i = 0; i < this.sensors.length; i++) {
      const dirSensor = this.sensors[i].direction + this.bodyDirection;

      for (var k = 0; k < 800; k++) {
        const x = this.x + this.stepSensor * k * Math.cos(dirSensor);
        const y = this.y + this.stepSensor * k * Math.sin(dirSensor)
        const xInMap = Math.round(x);
        const yInMap = Math.round(imageMap.height - y);
        const value = data[yInMap * imageMap.width * 4 + xInMap * 4];
        if (value < 10) {
          const dx = (x - this.x);
          const dy = (y - this.y);
          const norm = Math.sqrt(dx * dx + dy * dy);
          this.sensors[i].speed = (norm - this.sensors[i].norm) / dt;
          this.sensors[i].norm = norm;
          this.sensors[i].norm2 = 1 - Math.min(norm, this.sensorLimit) / this.sensorLimit; //0 si pas d'obstacle et 1 si au plus pret d'un obstacle
          break;
        }
      }
    }
  }

  updateDirection() {
    if (this.collision) {
      return;
    };
    this.direction = editable.updateDirection(this.matrix, this.sensors);
  }

  updateAcceleration() {
    editable.updateAcceleration(this.matrix, this.sensors);
  }

  reset(bestMatrix, bestDistance) {
    this.x = this.initX;
    this.y = this.initY;
    this.bodyDirection = Math.PI / 30;
    this.direction = 0;
    this.collision = false;
    this.matrix = editable.updateMatrix(bestMatrix.slice(), bestDistance, this.matrix, this.distance.value);
    this.distance.x = this.x;
    this.distance.y = this.y;
    this.distance.time = 0;
    this.distance.value = 0;
  }

};
