const Car = require('./car');

const editable = require('../editable');

module.exports = class Car {

  constructor(config) {
    this.delay = Math.random() * 4000;
    this.bodyDirection = config.direction || 0;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.previousX = 0;
    this.previousY = 0;
    this.direction = 0;
    this.speed = config.speed || 0.4
    this.acceleration = 0;
    this.initX = this.x;
    this.initY = this.y;
    this.initSpeed = this.speed;
    this.collision = false;
    this.stepSensor = 0.8;
    this.sensorLimit = config.sensorLimit || 200;
    this.color = "#" + ((1<<24)*Math.random() | 0).toString(16);
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

    this.speed += this.acceleration * dt;
    this.speed = Math.max(0, this.speed);

    this.x += (this.speed * dt) * Math.cos(this.bodyDirection);
    this.y += (this.speed * dt) * Math.sin(this.bodyDirection);

    if(this.speed<0.4) {
      this.collision = true;
    }

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
    this.direction = Math.min(this.direction,Math.PI/8);
    this.direction = Math.max(this.direction, -Math.PI/8);
  }

  updateAcceleration() {
    this.acceleration = editable.updateAcceleration(this.matrix, this.sensors, this.direction, this.speed);
    this.acceleration = Math.min(this.acceleration, 0.00004);
    this.acceleration = Math.max(this.acceleration, -0.00004);
  }

  reset(bestMatrix, bestDistance) {
    this.x = this.initX;
    this.y = this.initY;
    this.speed = this.initSpeed;
    this.bodyDirection = Math.PI / 30;
    this.direction = 0;
    this.collision = false;
    this.matrix = editable.updateMatrix(bestMatrix.slice(), bestDistance, this.matrix.slice(), this.distance.value);
    this.distance.x = this.x;
    this.distance.y = this.y;
    this.distance.time = 0;
    this.distance.value = 0;
    this.acceleration = 0;
  }

};
