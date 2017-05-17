<template>
  <div id="app">
      <h2>shake</h2>
      <v-shake ref="shake" :customConfig="shakeConfig" :times="5" @on-done="shakeDone">
          <v-spin size="40"></v-spin>
      </v-shake>
      <button @click="shake">shake it</button>

      <h2>spin</h2>
      <v-spin size="40"></v-spin>

      <h2>slider</h2>
      <v-slider width="650px" height="400px" auto trigger="hover" :source="sliderSource"> </v-slider>

      <h2>sync</h2>
      <v-sync class="sync" ref="sync" :promise="promise">
          <div slot="loading">
              loading
          </div>
          <div slot="done">
              {{ response }}
          </div>
          <div slot="fail">
              {{ response }}
          </div>
      </v-sync>
      <button @click="sync">sync</button>

      <h2>pretty-scroll</h2>
      <v-pretty-scroll class="pretty-scroll" width="30px" height="100px">
          <ul>
              <li>test</li>
              <li>test</li>
              <li>test</li>
              <li>test</li>
              <li>test</li>
              <li>test</li>
              <li>test</li>
              <li>test</li>
              <li>test</li>
              <li>test</li>
          </ul>
      </v-pretty-scroll>
  </div>
</template>

<script>
    import images from '@/assets'
    export default {
      data: () => ({
        sliderSource: images,
        response: null,
        promise: null,
        shakeConfig: []
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
        shake() {
          this.$refs.shake.shake({times: 5})
        },
        shakeDone() {
          console.log('done')
        }
      },
      created() {
        this.getData('first')
        let shakeConfig = []
        let interval = 5
        for (let i = 1; i <= 20; ++i) {
          shakeConfig.push([i, Math.sqrt(100-(i-10)*(i-10)), interval])
        }
        for (let i= 19; i >= 0; --i) {
          shakeConfig.push([i, -Math.sqrt(100-(i-10)*(i-10)), interval])
        }
        this.shakeConfig = shakeConfig
      }
    }
</script>

<style>
    .sync {
        width: 300px;
        min-height: 200px;
        background: red;
    }
    .pretty-scroll {
        background: royalblue;
    }
</style>
