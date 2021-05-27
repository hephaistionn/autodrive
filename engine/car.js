

module.exports = class Car {

  constructor(config) {
    this.speed = 0.1;
    this.direction = Math.PI/30;
    this.x = config.x || 0;
    this.y = config.y | 0;
    this.collision = false;
    this.stepSensor = 0.8;
    this.sensors = [
      {
        direction: Math.PI / 8,
        speed: 0,
        norm: 0
      }
    ];
    this.matrix = [];
    const nbSensors = this.sensors.length;
    for (let i = 0; i < nbSensors; i++) {
      this.matrix.concat([0, 0]);
      //symetrical censors
      this.sensors.push({
        direction: -this.sensors[i].direction,
        speed: 0,
        norm: 0
      })
    }
  }

  update(dt) {
    if(this.collision) return;
    this.x = this.x + (this.speed * dt) * Math.cos(this.direction);
    this.y = this.y + (this.speed * dt) * Math.sin(this.direction);
  }

  updateSensors(imageMap, dt) {
    const data = imageMap.data;
    const xInMap = Math.round(this.x);
    const yInMap = Math.round(imageMap.height-this.y);
    const value = data[yInMap*imageMap.width*4+xInMap*4];
    if(value<10) {
      this.collision = true;
    }
    for(let i=0; i<this.sensors.length; i++) {
      const dirSensor = this.sensors[i].direction+this.direction;

      for(var k=0;k<800;k++) {
        const x = this.x + this.stepSensor * k * Math.cos(dirSensor);
        const y = this.y + this.stepSensor * k * Math.sin(dirSensor)
        const xInMap = Math.round(x);
        const yInMap = Math.round(imageMap.height-y);
        const value = data[yInMap*imageMap.width*4+xInMap*4];
        if(value<10) {
          const dx = (x-this.x);
          const dy = (y-this.y);
          const norm  = Math.sqrt( dx*dx+dy*dy);
          this.sensors[i].speed = (norm-this.sensors[i].norm)/dt;
          this.sensors[i].norm = norm;
          break;
        }
      }
    }
  }

  updateOrder(){
    if(this.collision) return;
    console.log( this.sensors[0].norm);
  }


};
