<template>
  <div class="component_ground">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
const editable = require('../../editable');
export default {
  props: {
    engine: Object,
  },
  data() {
    return {
      imageCanvas: null,
      contextCanvas: null,
    };
  },
  methods: {
    starDrawing() {
      const imageTarget = this.imageCanvas;
      const contextTarget = this.contextCanvas;
      const ImageBackground = this.engine.imageMap;
      const height = imageTarget.height;
      const engine = this.engine;
      const carColor = "red";
      const sensorColor = "green";
      const font = "10px sans-serif yellow";
      const nbSensor = engine.cars[0].sensors.length;

      function draw() {
        //ground
        contextTarget.putImageData(ImageBackground, 0, 0);
        //cars
        for (let i = 0; i < engine.cars.length; i++) {
          contextTarget.save();
          const car = engine.cars[i];
          contextTarget.translate(car.x, height - car.y);
          contextTarget.rotate(-car.bodyDirection);
          contextTarget.fillStyle = carColor;
          contextTarget.fillRect(-15, -7.5, 30, 15);
          //sensor
          if(editable.showSensor)
          for (let k = 0; k < nbSensor; k++) {
            const sen = car.sensors[k];
            contextTarget.beginPath();
            contextTarget.moveTo(0, 0);
            contextTarget.lineTo(
              sen.norm * Math.cos(-sen.direction),
              sen.norm * Math.sin(-sen.direction)
            );
            contextTarget.strokeStyle = sensorColor;
            contextTarget.stroke();
          }
          contextTarget.restore();
        }
        requestAnimationFrame(draw);
        engine.update();
      }
      draw();
    },
  },
  async mounted() {
    const cavans = this.$refs.canvas;
    this.contextCanvas = cavans.getContext("2d");
    this.contextCanvas.canvas.width = this.engine.imageMap.width;
    this.contextCanvas.canvas.height = this.engine.imageMap.height;
    this.imageCanvas = this.contextCanvas.getImageData(
      0,
      0,
      this.engine.imageMap.width,
      this.engine.imageMap.height
    );
    this.starDrawing();
  },
};
</script> 
