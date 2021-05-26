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
      const engine = this.engine;
      
      function draw() {
        for (let i = 0; i < length; i++) {
          const index = i * 4;
          if(imageBackgroundData[index]>10) {
            imageTargetData[index+0] =  255; 
            imageTargetData[index+1] =  255; 
            imageTargetData[index+2] =  255; 
          }else{
            imageTargetData[index+0] =  0; 
            imageTargetData[index+1] =  0; 
            imageTargetData[index+2] =  0; 
          }
          imageTargetData[index+3] =  255; 
        }
        contextTarget.putImageData(imageTarget, 0, 0);
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
