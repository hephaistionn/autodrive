<template>
  <div class="view_main">
    <componentPreview :engine="engine" />
  </div>
</template>

<script>

  export default { 
    name: 'view_main',
    props: {
      engine: Object
    },
    data() {
      return {
      
      };
    },
    methods: {

    },
    mounted() {
      this.engine
    }
  }

</script>
