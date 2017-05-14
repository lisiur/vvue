<template>
  <div id="app">
      <Slider width="650px" height="400px" auto :source="sliderSource"></Slider>
      <Sync class="sync" ref="sync" :promise="promise">
          <div slot="loading">
              loading
          </div>
          <div slot="done">
              {{ response }}
          </div>
          <div slot="fail">
              {{ response }}
          </div>
      </Sync>
      <button @click="sync">sync</button>
  </div>
</template>

<script>
    import images from '@/assets'
    import R from 'ramda'
    export default {
      data: () => ({
        sliderSource: images.map(item => ({src: item})),
        response: null,
        promise: null,
      }),
      methods: {
        getData(url) {
          this.promise = new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(url)
            }, 200)
          })
          this.promise.then(res => this.response = res, res => this.response = res)
        },
        sync() {
          this.getData('next')
        },
      },
      created() {
        this.getData('first')
      }
    }
</script>

<style>
    .sync {
        width: 300px;
        min-height: 200px;
        background: red;
    }
</style>
