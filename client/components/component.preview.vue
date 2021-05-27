<template>
  <div class="component_ground">
    <canvas  ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    engine: Object
  },
  data() {
    return {
      imageCanvas: null,
      contextCanvas: null,
    }
  },
  methods: {
    starDrawing() {
      const imageTarget = this.imageCanvas;
      const contextTarget = this.contextCanvas;
      const ImageBackground = this.engine.imageMap;
      const imageBackgroundData = ImageBackground.data;
      const imageTargetData = imageTarget.data;
      const length = imageTarget.width * imageTarget.height;
      const height = imageTarget.height;
      const engine = this.engine;
      const carColor = 'red';
      
      function draw() {
        //ground
        contextTarget.putImageData(ImageBackground, 0, 0);
        //cars
        for (let i = 0; i < engine.cars.length; i++) {
          contextTarget.save();
          const car = engine.cars[i];
          contextTarget.translate(car.x, (height-car.y));
          contextTarget.rotate(car.direction);
          contextTarget.fillStyle = carColor;
          contextTarget.fillRect(-5, -2.5, 10, 5);
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
    this.contextCanvas = cavans.getContext('2d');
    this.contextCanvas.canvas.width  = this.engine.imageMap.width;
    this.contextCanvas.canvas.height = this.engine.imageMap.height;
    this.imageCanvas = this.contextCanvas.getImageData(0, 0, this.engine.imageMap.width, this.engine.imageMap.height);
    this.starDrawing();
  }
};
</script> 
