<template>
  <div id="app">
      <slider width="650px" height="400px" auto :source="sliderSource"></slider>
  </div>
</template>

<script>
    import images from '@/assets'
    export default {
      data: () => ({
        sliderSource: images.map(item => ({src: item})),
      })
    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
